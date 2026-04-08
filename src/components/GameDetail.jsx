// src/components/GameDetail.jsx
import { useState } from 'react';
import TeamEmblem from './TeamEmblem';
import { usePlayerNav } from '../context/PlayerNavContext';
import { LINEUPS, PLAYERS_DB } from '../data/mockData';

function FieldView({ teamKey, color, onPlayerClick }) {
  const lineup = LINEUPS[teamKey];
  if (!lineup) return <div style={{ padding: 16, color: '#aaa', fontSize: 13 }}>라인업 정보 없음</div>;

  const f = lineup.field;
  const pillCls = `tag-pill tag-pill--${color}`;

  // 선수 태그 헬퍼: 데이터 있으면 커서 pointer
  function Tag({ name, className = 'player-tag', style }) {
    const hasData = !!PLAYERS_DB[name];
    return (
      <div
        className={className}
        style={{ ...style, cursor: hasData ? 'pointer' : 'default' }}
        onClick={() => hasData && onPlayerClick(name)}
      >
        <div className={pillCls}>{name}</div>
      </div>
    );
  }

  return (
    <div className="field-wrap">
      <svg className="field-svg" viewBox="0 0 375 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="375" height="300" fill="#2d5a1b"/>
        {[0,50,100,150,200,250].map(y => (
          <rect key={y} x="0" y={y} width="375" height="25" fill="#336620" opacity="0.4"/>
        ))}
        <line x1="187" y1="278" x2="375" y2="145" stroke="#e8e0c8" strokeWidth="1.5" opacity="0.8"/>
        <line x1="187" y1="278" x2="0"   y2="146" stroke="#e8e0c8" strokeWidth="1.5" opacity="0.8"/>
        <polygon points="187,278 306,194 187,110 68,194" fill="#b8864e" opacity="0.95"/>
        <polygon points="187,258 286,194 187,130 88,194" fill="#3a6b22"/>
        <line x1="187" y1="278" x2="306" y2="194" stroke="#e8e0c8" strokeWidth="0.8" opacity="0.5"/>
        <line x1="306" y1="194" x2="187" y2="110" stroke="#e8e0c8" strokeWidth="0.8" opacity="0.5"/>
        <line x1="187" y1="110" x2="68"  y2="194" stroke="#e8e0c8" strokeWidth="0.8" opacity="0.5"/>
        <line x1="68"  y1="194" x2="187" y2="278" stroke="#e8e0c8" strokeWidth="0.8" opacity="0.5"/>
        <rect x="180" y="103" width="14" height="14" rx="2" fill="white"/>
        <rect x="299" y="187" width="14" height="14" rx="2" fill="white"/>
        <rect x="61"  y="187" width="14" height="14" rx="2" fill="white"/>
        <polygon points="187,285 179,278 179,271 195,271 195,278" fill="white"/>
        <circle cx="187" cy="194" r="10" fill="#c49a5a"/>
        <circle cx="187" cy="194" r="2.5" fill="white"/>
      </svg>
      {/* 외야 */}
      <Tag name={f.cf} style={{ left:'50%', top:'14%' }} />
      <Tag name={f.lf} style={{ left:'19%', top:'23%' }} />
      <Tag name={f.rf} style={{ left:'81%', top:'23%' }} />
      {/* 내야 중간 */}
      <Tag name={f.ss} style={{ left:'36%', top:'49%' }} />
      <Tag name={f.b2} style={{ left:'64%', top:'49%' }} />
      {/* 투수 */}
      <Tag name={f.p}  style={{ left:'50%', top:'63%' }} />
      {/* 3루수: 베이스 왼쪽 옆 */}
      <Tag name={f.b3} className="player-tag player-tag--left"  style={{ left:'18.1%', top:'64.7%' }} />
      {/* 1루수: 베이스 오른쪽 옆 */}
      <Tag name={f.b1} className="player-tag player-tag--right" style={{ left:'81.9%', top:'64.7%' }} />
      {/* 포수: 홈 아래 */}
      <Tag name={f.c}  className="player-tag player-tag--below" style={{ left:'50%', top:'92.7%' }} />
    </div>
  );
}

export default function GameDetail({ game, onBack }) {
  const [seg, setSeg] = useState('home');
  const { setSelectedPlayer } = usePlayerNav();

  const homeTeamKey = game.home === 'LG' ? 'LG' : game.home === 'KT' ? 'KT' : null;
  const awayTeamKey = game.away === 'LG' ? 'LG' : game.away === 'KT' ? 'KT' : null;
  const homeLineup = homeTeamKey ? LINEUPS[homeTeamKey] : null;
  const awayLineup = awayTeamKey ? LINEUPS[awayTeamKey] : null;

  function handlePlayerClick(name) {
    const detail = PLAYERS_DB[name];
    if (detail) setSelectedPlayer(detail);
  }

  return (
    <>
      <div className="detail-topbar">
        <div className="back-btn" onClick={onBack}>
          <svg width="10" height="14" viewBox="0 0 10 16" fill="none" stroke="#666" strokeWidth="1.8">
            <path d="M8 2L2 8L8 14"/>
          </svg>
        </div>
        {/* 홈 엠블럼 + 팀명 + 스코어 + 원정 */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <TeamEmblem teamKey={game.home} size={30} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#000' }}>
              {game.home} vs {game.away}
              {game.status === 'live' && (
                <span style={{ fontSize: 11, color: '#0F6E56', fontWeight: 400, marginLeft: 6 }}>
                  LIVE {game.inning}
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: '#888' }}>{game.stadium}</div>
          </div>
          <TeamEmblem teamKey={game.away} size={30} />
        </div>
      </div>

      <div className="seg-row">
        <button className={`seg${seg === 'pitcher' ? ' seg--active' : ''}`} onClick={() => setSeg('pitcher')}>선발 투수</button>
        <button className={`seg${seg === 'home' ? ' seg--active' : ''}`} onClick={() => setSeg('home')}>{game.home} 라인업</button>
        <button className={`seg${seg === 'away' ? ' seg--active' : ''}`} onClick={() => setSeg('away')}>{game.away} 라인업</button>
      </div>

      <div className="screen">
        {seg === 'pitcher' && (
          <div style={{ padding: 16 }}>
            <div style={{ background:'#fff', border:'0.5px solid rgba(0,0,0,0.1)', borderRadius:14, padding:16 }}>
              <div style={{ fontSize:11, fontWeight:600, color:'#888', marginBottom:14 }}>오늘의 선발 투수</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-around' }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:15, fontWeight:600 }}>{game.homeP}</div>
                  <div style={{ fontSize:11, color:'#888', marginTop:4 }}>ERA 3.21 · 6승 2패</div>
                  <div style={{ display:'inline-block', marginTop:6, background:'#E1F5EE', fontSize:10, color:'#0F6E56', padding:'2px 10px', borderRadius:8, fontWeight:600 }}>{game.home}</div>
                </div>
                <div style={{ fontSize:13, color:'#ccc' }}>vs</div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:15, fontWeight:600 }}>{game.awayP}</div>
                  <div style={{ fontSize:11, color:'#888', marginTop:4 }}>ERA 4.05 · 4승 3패</div>
                  <div style={{ display:'inline-block', marginTop:6, background:'#fde8e8', fontSize:10, color:'#8B0000', padding:'2px 10px', borderRadius:8, fontWeight:600 }}>{game.away}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {seg === 'home' && (
          <>
            <FieldView teamKey={homeTeamKey} color="green" onPlayerClick={handlePlayerClick} />
            {homeLineup && (
              <div className="lineup-card">
                <div className="lineup-card__head">{game.home} 타순</div>
                {homeLineup.home.map((p, i) => (
                  <div
                    key={i} className="lineup-row"
                    onClick={() => handlePlayerClick(p.name)}
                    style={{ cursor: PLAYERS_DB[p.name] ? 'pointer' : 'default' }}
                  >
                    <span className="lineup-row__num">{i + 1}</span>
                    <span className="pos-badge">{p.pos}</span>
                    <span className="lineup-row__name">{p.name}</span>
                    <span className="lineup-row__avg">{p.avg}</span>
                    <span className="lineup-row__arrow">›</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ height: 16 }} />
          </>
        )}

        {seg === 'away' && (
          <>
            <FieldView teamKey={awayTeamKey} color="red" onPlayerClick={handlePlayerClick} />
            {awayLineup && (
              <div className="lineup-card">
                <div className="lineup-card__head">{game.away} 타순</div>
                {awayLineup.away.map((p, i) => (
                  <div
                    key={i} className="lineup-row"
                    onClick={() => handlePlayerClick(p.name)}
                    style={{ cursor: PLAYERS_DB[p.name] ? 'pointer' : 'default' }}
                  >
                    <span className="lineup-row__num">{i + 1}</span>
                    <span className="pos-badge pos-badge--red">{p.pos}</span>
                    <span className="lineup-row__name">{p.name}</span>
                    <span className="lineup-row__avg">{p.avg}</span>
                    <span className="lineup-row__arrow">›</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ height: 16 }} />
          </>
        )}
      </div>
    </>
  );
}
