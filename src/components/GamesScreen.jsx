import { useState, useEffect } from 'react'; 
import DateStrip from './DateStrip';
import GameDetail from './GameDetail';
import TeamEmblem from './TeamEmblem';
import { DAYS } from '../data/mockData';

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatLabel(d) {
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일`;
}

export default function GamesScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGame, setSelectedGame] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const formattedDate = dateKey(selectedDate);
        
        const response = await fetch(`http://localhost:5000/api/matches/today?date=${formattedDate}`);
        const data = await response.json();
        
        const mappedData = data.map(g => ({
          ...g,
          winP: g.winP || '', 
          loseP: g.loseP || '',
          homeP: g.home.pitcher,
          awayP: g.away.pitcher,
          homeScore: g.home.score,
          awayScore: g.away.score,
          home: g.home.name,
          away: g.away.name
        }));

        setMatches(mappedData); 
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedDate]);

  // 키움 경기 우선 정렬 로직 유지
  const sorted = [...matches].sort((a, b) => {
    const aK = (a.home === '키움' || a.away === '키움') ? 0 : 1;
    const bK = (b.home === '키움' || b.away === '키움') ? 0 : 1;
    return aK - bK;
  });

  if (selectedGame) {
    return <GameDetail game={selectedGame} onBack={() => setSelectedGame(null)} />;
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar__title">오늘의 경기</div>
        <div className="topbar__sub">{formatLabel(selectedDate)}</div>
      </div>
      <DateStrip selectedDate={selectedDate} onChange={setSelectedDate} />
      
      <div className="screen">
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>
            서버에서 데이터를 불러오는 중...
          </div>
        ) : (
          <div className="scroll-content">
            {sorted.length === 0 ? (
              <div className="no-game">이 날은 경기가 없어요</div>
            ) : (
              sorted.map((g, i) => {
                const isK = g.home === '키움' || g.away === '키움';
                const isDone = g.status === 'done';
                const hasScore = g.status === 'live' || g.status === 'done';
                
                return (
                  <div
                    key={g.matchId || i}
                    className={`game-card${isK ? ' game-card--kiwoom' : ''}`}
                    onClick={() => setSelectedGame(g)}
                  >
                    <div className="game-card__top">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {g.status === 'live' && <span className="pill pill--live">LIVE</span>}
                        {g.status === 'done' && <span className="pill pill--done">종료</span>}
                        {g.status === 'sched' && <span className="pill pill--sched">{g.time} 예정</span>}
                        {g.status === 'live' && <span className="pill__inning">{g.inning}</span>}
                      </div>
                    </div>
                    
                    <div className="teams-row">
                      {/* ✈️ [좌측] AWAY (원정팀) */}
                      <div className="team-side">
                        <TeamEmblem teamKey={g.away} size={36} />
                        <div>
                          <div className="team-info__name">{g.away}</div>
                          <div className="team-info__pitcher">
                            {isDone ? (
                              g.awayScore > g.homeScore ? 
                                <span style={{color: '#2883f3', fontWeight: 'bold'}}>승 {g.winP}</span> : 
                                <span style={{color: '#e74c3c', fontWeight: 'bold'}}>패 {g.loseP}</span>
                            ) : `선발 ${g.awayP}`}
                          </div>
                        </div>
                      </div>
                      
                      {/* 점수판 (원정 : 홈) */}
                      {hasScore ? (
                        <div className="score-block">
                          <span className="score-block__num">{g.awayScore}</span>
                          <span className="score-block__sep">:</span>
                          <span className="score-block__num">{g.homeScore}</span>
                        </div>
                      ) : (
                        <div className="score-block__vs">vs</div>
                      )}
                      
                      {/* 🏠 [우측] HOME (홈팀) */}
                      <div className="team-side team-side--right">
                        <div style={{ textAlign: 'right' }}>
                          <div className="team-info__name">{g.home}</div>
                          <div className="team-info__pitcher">
                            {isDone ? (
                              g.homeScore > g.awayScore ? 
                                <span style={{color: '#2883f3', fontWeight: 'bold'}}>승 {g.winP}</span> : 
                                <span style={{color: '#e74c3c', fontWeight: 'bold'}}>패 {g.loseP}</span>
                            ) : `선발 ${g.homeP}`}
                          </div>
                        </div>
                        <TeamEmblem teamKey={g.home} size={36} />
                      </div>
                    </div>
                    
                    <div className="game-card__footer">
                      <span className="game-card__stadium">{g.stadium}</span>
                      {!isDone && <span className="game-card__link">선발/라인업 →</span>}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
}