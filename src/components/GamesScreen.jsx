// src/components/GamesScreen.jsx
import { useState } from 'react';
import DateStrip from './DateStrip';
import GameDetail from './GameDetail';
import TeamEmblem from './TeamEmblem';
import { GAMES_DB, DAYS } from '../data/mockData';

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatLabel(d) {
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${DAYS[d.getDay()]}요일`;
}

export default function GamesScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 10));
  const [selectedGame, setSelectedGame] = useState(null);

  const key = dateKey(selectedDate);
  const games = GAMES_DB[key] || [];

  const sorted = [...games].sort((a, b) => {
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
        <div className="scroll-content">
          {sorted.length === 0 ? (
            <div className="no-game">이 날은 경기가 없어요</div>
          ) : (
            sorted.map((g, i) => {
              const isK = g.home === '키움' || g.away === '키움';
              const hasScore = g.status === 'live' || g.status === 'done';
              return (
                <div
                  key={i}
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
                    <div className="team-side">
                      <TeamEmblem teamKey={g.home} size={36} />
                      <div>
                        <div className="team-info__name">{g.home}</div>
                        <div className="team-info__pitcher">선발 {g.homeP}</div>
                      </div>
                    </div>
                    {hasScore ? (
                      <div className="score-block">
                        <span className="score-block__num">{g.homeScore}</span>
                        <span className="score-block__sep">:</span>
                        <span className="score-block__num">{g.awayScore}</span>
                      </div>
                    ) : (
                      <div className="score-block__vs">vs</div>
                    )}
                    <div className="team-side team-side--right">
                      <TeamEmblem teamKey={g.away} size={36} />
                      <div style={{ textAlign: 'right' }}>
                        <div className="team-info__name">{g.away}</div>
                        <div className="team-info__pitcher">선발 {g.awayP}</div>
                      </div>
                    </div>
                  </div>
                  <div className="game-card__footer">
                    <span className="game-card__stadium">{g.stadium}</span>
                    <span className="game-card__link">선발/라인업 →</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
