// src/components/TeamScreen.jsx
import { useState } from 'react';
import TeamEmblem from './TeamEmblem';
import { usePlayerNav } from '../context/PlayerNavContext';
import { TEAM_LIST, TEAM_INFO, STANDINGS, ROSTERS, getDefaultRoster, PLAYERS_DB } from '../data/mockData';

const POS_TABS = ['투수', '포수', '내야수', '외야수', '등번호', '등록/말소'];

function TeamDetail({ teamKey, onBack }) {
  const [tab, setTab] = useState('투수');
  const { setSelectedPlayer } = usePlayerNav();
  const info = TEAM_INFO[teamKey] || { full: teamKey, stadium: '-' };
  const standing = STANDINGS.find(s => s.t === teamKey);
  const rank = standing
    ? `${[...STANDINGS].sort((a,b) => (b.w/(b.w+b.l)) - (a.w/(a.w+a.l))).findIndex(s => s.t === teamKey) + 1}위`
    : '-';
  const roster = ROSTERS[teamKey] || getDefaultRoster();

  const allPlayers = [
    ...(roster.투수 || []),
    ...(roster.포수 || []),
    ...(roster.내야수 || []),
    ...(roster.외야수 || []),
  ];

  const activePlayers = allPlayers.filter(p => p.active);
  const inactivePlayers = allPlayers.filter(p => !p.active);

  function handlePlayerClick(p) {
    const detail = PLAYERS_DB[p.name];
    if (detail) setSelectedPlayer(detail);
  }

  function renderList(players, showInactiveBadge = false) {
    return (
      <div className="player-list">
        {players.map((p, i) => (
          <div
            key={i}
            className={`player-row${!p.active ? ' player-row--inactive' : ''}`}
            onClick={() => handlePlayerClick(p)}
            style={{ cursor: PLAYERS_DB[p.name] ? 'pointer' : 'default' }}
          >
            <div className={`player-num${!p.active ? ' player-num--gray' : ''}`}>{p.num}</div>
            <div className="player-row__name">{p.name}</div>
            {showInactiveBadge && !p.active && (
              <span className="inactive-badge">{p.reason || '말소'}</span>
            )}
            <div className="player-row__stat">{p.stat}</div>
            {PLAYERS_DB[p.name] && (
              <span style={{ fontSize: 13, color: '#ccc', marginLeft: 4 }}>›</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="detail-topbar">
        <div className="back-btn" onClick={onBack}>
          <svg width="10" height="14" viewBox="0 0 10 16" fill="none" stroke="#666" strokeWidth="1.8">
            <path d="M8 2L2 8L8 14"/>
          </svg>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#000' }}>{info.full}</div>
      </div>

      <div className="team-header">
        <TeamEmblem teamKey={teamKey} size={52} />
        <div>
          <div className="team-header__name">{info.full}</div>
          <div className="team-header__meta">
            {rank} · {standing ? `${standing.w}승 ${standing.l}패` : '-'} · {info.stadium}
          </div>
        </div>
      </div>

      <div className="seg-row">
        {POS_TABS.map(t => (
          <button
            key={t}
            className={`seg${tab === t ? ' seg--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="screen">
        {tab === '등록/말소' ? (
          <>
            <div className="section-title">1군 등록 ({activePlayers.length}명)</div>
            {renderList(activePlayers)}
            <div className="section-title" style={{ marginTop: 4, color: '#c0392b' }}>
              말소 / 부상 ({inactivePlayers.length}명)
            </div>
            {inactivePlayers.length === 0 ? (
              <div style={{ padding: '8px 16px', fontSize: 13, color: '#bbb' }}>말소 선수 없음</div>
            ) : (
              renderList(inactivePlayers, true)
            )}
          </>
        ) : tab === '등번호' ? (
          <>
            <div className="section-title">등번호순</div>
            {renderList([...allPlayers].sort((a, b) => a.num - b.num), true)}
          </>
        ) : (
          <>
            <div className="section-title">{tab}</div>
            {renderList(roster[tab] || [], true)}
          </>
        )}
        <div style={{ height: 16 }} />
      </div>
    </>
  );
}

export default function TeamScreen() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const sortedTeams = [...TEAM_LIST].sort((a, b) => (a.t === '키움' ? -1 : b.t === '키움' ? 1 : 0));
  const standingMap = Object.fromEntries(
    [...STANDINGS]
      .sort((a, b) => (b.w / (b.w + b.l)) - (a.w / (a.w + a.l)))
      .map((s, i) => [s.t, i + 1])
  );

  if (selectedTeam) {
    return (
      <div style={{ display: 'contents' }}>
        <TeamDetail teamKey={selectedTeam} onBack={() => setSelectedTeam(null)} />
      </div>
    );
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar__title">팀</div>
      </div>
      <div className="screen">
        <div className="team-grid">
          {sortedTeams.map(({ t, n }) => {
            const isK = t === '키움';
            const rank = standingMap[t] || '-';
            return (
              <div
                key={t}
                className={`team-card${isK ? ' team-card--kiwoom' : ''}`}
                onClick={() => setSelectedTeam(t)}
              >
                <TeamEmblem teamKey={t} size={42} />
                <div>
                  <div className="team-card__name">{t}</div>
                  <div className="team-card__meta">{n} · {rank}위</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
