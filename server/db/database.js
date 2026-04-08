// server/db/database.js
const Database = require('better-sqlite3');
const path = require('path');

// 1. DB 파일 생성 위치 지정 (server 폴더 바로 아래에 kbo.db 파일이 생김)
const dbPath = path.join(__dirname, '../kbo.db');

// 2. DB 연결 (파일이 없으면 알아서 새로 만들어줌!)
// 개발 중이니까 어떤 SQL 쿼리가 실행되는지 터미널에 찍어보려고 verbose 옵션을 켰어.
const db = new Database(dbPath, { verbose: console.log }); 

// 3. 경기 데이터를 담을 테이블(matches) 생성 쿼리 실행
// (이미 테이블이 있으면 무시하는 IF NOT EXISTS 추가!)
db.exec(`
  CREATE TABLE IF NOT EXISTS matches (
    matchId TEXT PRIMARY KEY,
    match_date TEXT NOT NULL,
    status TEXT,
    time TEXT,
    inning TEXT,
    stadium TEXT,
    home_name TEXT,
    home_pitcher TEXT,
    home_score INTEGER,
    away_name TEXT,
    away_pitcher TEXT,
    away_score INTEGER,
    winPitcher TEXT,
    losePitcher TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS lineups (
    matchId TEXT PRIMARY KEY,
    lineup_data TEXT,  -- JSON 문자열로 저장
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    matchId TEXT PRIMARY KEY,
    record_data TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// 선수 정보를 저장할 테이블
// database.js 수정
db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    teamName TEXT,
    posType TEXT,    -- 👈 감독, 코치, 투수, 포수, 내야수, 외야수 구분용
    backNum TEXT,
    name TEXT,
    position TEXT,
    birth TEXT,
    physical TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (teamName, name, birth)
  )
`);

// database.js 하단에 추가
db.exec(`
  CREATE TABLE IF NOT EXISTS team_standings (
    rank_date TEXT,      -- YYYY-MM-DD (오늘 날짜 체크용)
    rank INTEGER,        -- 순위
    teamName TEXT,       -- 팀명
    matches INTEGER,     -- 경기수
    win INTEGER,         -- 승
    lose INTEGER,        -- 패
    draw INTEGER,        -- 무
    winRate TEXT,        -- 승률
    gameDiff TEXT,       -- 게임차
    streak TEXT,         -- 최근 결과(연승/연패)
    lastTen TEXT,        -- 최근 10경기
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (rank_date, teamName) -- 하루에 팀당 데이터 하나만
  )
`);

db.exec(`
  -- 1. 네이버 전용 (화면 포지션 분류용)
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teamName TEXT,
    posType TEXT,
    backNum TEXT,
    name TEXT,
    position TEXT,
    birth TEXT,
    physical TEXT
  );

  -- 2. KBO 전용 (마스터/상세 기록용)
  CREATE TABLE IF NOT EXISTS all_players (
    playerId TEXT PRIMARY KEY, -- KBO 고유 ID
    teamName TEXT,
    backNum TEXT,
    name TEXT,
    position TEXT,
    birth TEXT,
    physical TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("✅ SQLite DB 세팅 및 테이블 생성 완벽하게 끝!");

// 다른 파일(server.js 등)에서 이 DB를 쓸 수 있게 내보내기
module.exports = db;