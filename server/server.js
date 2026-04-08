const express = require('express');
const cors = require('cors');
const scrapeTodayMatches = require('./scrape/today_matches');
const scrapeLineup = require('./scrape/lineup');
const scrapeRecord = require('./scrape/record');
const scrapeNaverPlayers = require('./scrape/players');       // 💡 네이버: 팀 상세/포지션 분류용
const scrapeKboOfficialPlayers = require('./scrape/allPlayers'); // 💡 KBO: 선수 마스터/상세 기록용
const scrapeTeamStandings = require('./scrape/standings');
const db = require('./db/database');

const app = express();
const PORT = 5000;

app.use(cors());

// 날짜 포맷 함수 (YYYY-MM-DD)
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * [Batch 1] 네이버 기반 선수단 업데이트 (Table: players)
 * 용도: 팀 상세 화면에서 투수, 포수, 내야수 등 탭 분류용
 */
async function updateNaverPlayers() {
  console.log("-----------------------------------------");
  console.log("📢 [Batch] 네이버 선수단(포지션 분류용) 업데이트 시작...");
  try {
    const data = await scrapeNaverPlayers(); 
    if (data && Object.keys(data).length > 0) {
      const insertStmt = db.prepare(`
        INSERT OR REPLACE INTO players (teamName, posType, backNum, name, position, birth, physical)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      db.transaction((allData) => {
        for (const team in allData) {
          allData[team].forEach(p => {
            insertStmt.run(team, p.posType, p.backNum, p.name, p.position, p.birth, p.physical);
          });
        }
      })(data);
      console.log("✅ [Batch] 네이버 선수단 DB(players) 업데이트 완료!");
    }
  } catch (e) {
    console.error("❌ [Batch Error] 네이버 업데이트 실패:", e.message);
  }
}

/**
 * [Batch 2] KBO 공식 홈페이지 기반 선수단 업데이트 (Table: all_players)
 * 용도: 선수 개별 상세 기록 조회를 위한 playerId 마스터 데이터 관리
 */
async function updateKboOfficialPlayers() {
  console.log("-----------------------------------------");
  console.log("📢 [Batch] KBO 공식 playerId 및 상세 정보 수집 시작...");
  try {
    const players = await scrapeKboOfficialPlayers(); 
    if (players && players.length > 0) {
      const insertStmt = db.prepare(`
        INSERT OR REPLACE INTO all_players (playerId, teamName, backNum, name, position, birth, physical)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      db.transaction((data) => {
        for (const p of data) {
          insertStmt.run(p.playerId, p.teamName, p.backNum, p.name, p.position, p.birth, p.physical || '');
        }
      })(players);
      console.log(`✅ [Batch] KBO 공식 마스터 DB(all_players) 저장 완료! (${players.length}명)`);
    }
  } catch (e) {
    console.error("❌ [Batch Error] KBO 공식 업데이트 실패:", e.message);
  }
}

/**
 * 1. 오늘의 경기 목록 API
 */
app.get('/api/matches/today', async (req, res) => {
  const targetDate = req.query.date || formatDate(new Date());
  try {
    const stmt = db.prepare('SELECT * FROM matches WHERE match_date = ?');
    const rows = stmt.all(targetDate);

    if (rows.length > 0) {
      const formatted = rows.map(row => ({
        matchId: row.matchId, status: row.status, time: row.time, inning: row.inning, stadium: row.stadium,
        winP: row.winPitcher || '', loseP: row.losePitcher || '',
        home: { name: row.home_name, pitcher: row.home_pitcher, score: row.home_score },
        away: { name: row.away_name, pitcher: row.away_pitcher, score: row.away_score }
      }));
      return res.json(formatted);
    }

    const newData = await scrapeTodayMatches(targetDate);
    if (newData && newData.length > 0) {
      const insertStmt = db.prepare(`
        INSERT OR IGNORE INTO matches 
        (matchId, match_date, status, time, inning, stadium, home_name, home_pitcher, home_score, away_name, away_pitcher, away_score, winPitcher, losePitcher)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      db.transaction((matches) => {
        for (const m of matches) {
          insertStmt.run(m.matchId, targetDate, m.status, m.time, m.inning, m.stadium, m.home.name, m.home.pitcher, m.home.score, m.away.name, m.away.pitcher, m.away.score, m.winPitcher || '', m.losePitcher || '');
        }
      })(newData);
      return res.json(newData.map(m => ({ ...m, winP: m.winPitcher, loseP: m.losePitcher })));
    }
    res.json([]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/**
 * 2. 상세 라인업 API
 */
app.get('/api/matches/:gameId/lineup', async (req, res) => {
  const { gameId } = req.params;
  try {
    const row = db.prepare('SELECT lineup_data FROM lineups WHERE matchId = ?').get(gameId);
    const now = new Date();
    const currentHour = now.getHours(); // 현재 시간 (0-23)

    if (row) {
      const parsedData = JSON.parse(row.lineup_data);
      
      // 타자 명단이 비어있는지 확인
      const isIncomplete = 
        !parsedData.home.batters || parsedData.home.batters.length === 0 ||
        !parsedData.away.batters || parsedData.away.batters.length === 0;

      // 💡 조건: 데이터가 완성됐거나, 아직 오후 5시 전이면 기존 데이터 그냥 반환
      // (5시 전에는 네이버에 어차피 안 올라오니까 자원 낭비 방지!)
      if (!isIncomplete || currentHour < 17) {
        return res.json(parsedData);
      }
      
      console.log(`📢 오후 ${currentHour}시! 라인업 업데이트를 위해 재크롤링을 시도합니다...`);
    }

    // 데이터가 없거나, 5시 이후인데 데이터가 미완성인 경우에만 크롤링 실행
    const newData = await scrapeLineup(gameId);
    
    if (newData) {
      db.prepare('INSERT OR REPLACE INTO lineups (matchId, lineup_data) VALUES (?, ?)').run(gameId, JSON.stringify(newData));
      return res.json(newData);
    }
    
    res.status(404).json({ message: "데이터 없음" });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/**
 * 3. 경기 상세 기록 API
 */
app.get('/api/matches/:gameId/record', async (req, res) => {
  const { gameId } = req.params;
  try {
    const row = db.prepare('SELECT record_data FROM records WHERE matchId = ?').get(gameId);
    if (row) return res.json(JSON.parse(row.record_data));
    const data = await scrapeRecord(gameId);
    if (data) {
      db.prepare('INSERT OR REPLACE INTO records (matchId, record_data) VALUES (?, ?)').run(gameId, JSON.stringify(data));
      return res.json(data);
    }
    res.status(404).json({ message: "기록 없음" });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/**
 * 4. 팀별 선수단 조회 API (팀 상세 화면용 - 네이버 데이터 + KBO playerId 조인)
 */
app.get('/api/teams/:teamName/players', (req, res) => {
  const { teamName } = req.params;
  try {
    const query = `
      SELECT 
        p.*, 
        ap.playerId 
      FROM players p
      LEFT JOIN all_players ap ON p.name = ap.name AND p.teamName = ap.teamName
      WHERE p.teamName = ?
      ORDER BY CAST(p.backNum AS INTEGER) ASC
    `;
    const players = db.prepare(query).all(teamName);
    res.json(players);
  } catch (e) { 
    console.error("선수 조회 에러:", e.message);
    res.status(500).json({ error: e.message }); 
  }
});

/**
 * 5. 실시간 팀 순위 API
 */
app.get('/api/standings', async (req, res) => {
  const today = formatDate(new Date());
  try {
    const rows = db.prepare('SELECT * FROM team_standings WHERE rank_date = ? ORDER BY rank ASC').all(today);
    if (rows.length > 0) return res.json(rows);
    const newData = await scrapeTeamStandings();
    if (newData && newData.length > 0) {
      const insertStmt = db.prepare(`INSERT OR REPLACE INTO team_standings (rank_date, rank, teamName, matches, win, lose, draw, winRate, gameDiff, streak, lastTen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      db.transaction((data) => {
        for (const t of data) insertStmt.run(today, t.rank, t.teamName, t.matches, t.win, t.lose, t.draw, t.winRate, t.gameDiff, t.streak, t.lastTen);
      })(newData);
      return res.json(newData);
    }
    res.json([]);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

/**
 * 6. 선수 통합 검색 API (all_players 마스터 테이블 기준)
 * 용도: 검색 화면에서 이름으로 선수 찾기
 */
app.get('/api/players/search', (req, res) => {
  const { name } = req.query;
  if (!name) return res.json([]);

  try {
    // 이름에 검색어가 포함된 선수를 검색
    const query = `
      SELECT * FROM all_players 
      WHERE name LIKE ? 
      ORDER BY teamName ASC, name ASC
      LIMIT 30
    `;
    const players = db.prepare(query).all(`%${name}%`);
    res.json(players);
  } catch (e) {
    console.error("검색 API 에러:", e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
  
  (async () => {
    // 필요 시 아래 주석을 풀어서 배치를 실행하세요
    // await updateNaverPlayers();       
    // await updateKboOfficialPlayers(); 
  })();
});