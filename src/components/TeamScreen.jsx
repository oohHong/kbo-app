import { useState, useEffect } from 'react';
import TeamEmblem from './TeamEmblem';
import { usePlayerNav } from '../context/PlayerNavContext';
import { TEAM_LIST, TEAM_INFO, STANDINGS } from '../data/mockData';

const TEAM_COLORS = {
  'LG 트윈스': '#C30452', '한화 이글스': '#FF6600', '삼성 라이온즈': '#074CA1',
  'SSG 랜더스': '#CE0E2D', 'NC 다이노스': '#315288', 'kt wiz': '#000000',
  '롯데 자이언츠': '#041E42', 'KIA 타이거즈': '#EA0029', '두산 베어스': '#131230',
  '키움 히어로즈': '#820024',
};

/**
 * 1. 팀 상세(선수단) 화면 컴포넌트 (기존 로직 100% 보존)
 */
export function TeamDetail({ teamKey, onBack }) {
  const [players, setPlayers] = useState([]);
  const [standings, setStandings] = useState([]); 
  const [tab, setTab] = useState('투수');
  const [loading, setLoading] = useState(true);
  const { setSelectedPlayer } = usePlayerNav();

  const teamStat = standings.find(s => s.teamName === teamKey);
  const info = TEAM_INFO[teamKey] || { full: teamKey, stadium: '-' };
  const teamColor = TEAM_COLORS[info.full] || '#333';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pRes = await fetch(`http://localhost:5000/api/teams/${teamKey}/players`);
        const pData = await pRes.json();
        setPlayers(pData);

        const sRes = await fetch(`http://localhost:5000/api/standings`);
        const sData = await sRes.json();
        setStandings(sData);

        if (pData.length > 0) {
          const types = [...new Set(pData.map(p => p.posType))];
          if (types.includes('투수')) setTab('투수');
          else setTab(types[0]);
        }
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [teamKey]);

  const dynamicTabs = [...new Set(players.map(p => p.posType))];

  function renderList(filteredPlayers) {
    if (filteredPlayers.length === 0) {
      return <div style={{ padding: '40px', textAlign: 'center', color: '#bbb', fontSize: '13px' }}>선수 정보가 없습니다.</div>;
    }

    return (
      <div className="player-list">
        {filteredPlayers.map((p, i) => (
          <div
            key={i}
            className="player-row"
            onClick={() => setSelectedPlayer(p)}
            style={{ cursor: 'pointer' }}
          >
            <div className="player-num" style={{ backgroundColor: `${teamColor}15`, color: teamColor }}>
              {p.backNum || '-'}
            </div>
            <div className="player-row__name">
              <div style={{ fontWeight: '600' }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                {p.position} | {p.birth}
              </div>
            </div>
            <div className="player-row__stat" style={{ fontSize: '12px' }}>{p.physical}</div>
            <span style={{ fontSize: 13, color: '#ccc', marginLeft: 4 }}>›</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="detail-topbar" style={{ backgroundColor: teamColor }}>
        <div className="back-btn" onClick={onBack} style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: 'none' }}>
          <svg width="10" height="14" viewBox="0 0 10 16" fill="none" stroke="#fff" strokeWidth="1.8">
            <path d="M8 2L2 8L8 14"/>
          </svg>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{info.full}</div>
      </div>

      <div className="team-header">
        <TeamEmblem teamKey={teamKey} size={52} />
        <div>
          <div className="team-header__name" style={{ color: teamColor }}>{info.full}</div>
          <div className="team-header__meta">
            {teamStat ? (
              <>
                {teamStat.rank}위 · {teamStat.win}승 {teamStat.lose}패 {teamStat.draw > 0 ? `${teamStat.draw}무` : ''} · {info.stadium}
              </>
            ) : (
              <>데이터 불러오는 중... · {info.stadium}</>
            )}
          </div>
        </div>
      </div>

      <div className="seg-row">
        {dynamicTabs.map(t => (
          <button
            key={t}
            className={`seg${tab === t ? ' seg--active' : ''}`}
            onClick={() => setTab(t)}
            style={tab === t ? { backgroundColor: teamColor, color: '#fff', border: 'none' } : {}}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="screen">
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#94a3b8' }}>선수단 로딩 중...</div>
        ) : (
          renderList(players.filter(p => p.posType === tab))
        )}
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}

/**
 * 2. 전체 팀 목록(Grid) 화면 컴포넌트 (순위 정렬 반영)
 */
export default function TeamScreen() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [standings, setStandings] = useState([]); 

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/standings');
        const data = await res.json();
        if (Array.isArray(data)) setStandings(data);
      } catch (e) {
        console.error('목록용 순위 로드 실패:', e);
      }
    };
    fetchStandings();
  }, []);

  // 💡 [수정됨] 키움 고정 대신 실시간 순위(standings) 데이터 기준으로 팀 리스트 정렬
  const sortedTeams = [...TEAM_LIST].sort((a, b) => {
    const rankA = standings.find(s => s.teamName === a.t)?.rank || 99;
    const rankB = standings.find(s => s.teamName === b.t)?.rank || 99;
    return rankA - rankB; 
  });
  
  const standingMap = Object.fromEntries(
    standings.map((s) => [s.teamName, s.rank])
  );

  if (selectedTeam) {
    return <TeamDetail teamKey={selectedTeam} onBack={() => setSelectedTeam(null)} />;
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar__title">팀</div>
      </div>
      <div className="screen">
        <div className="team-grid">
          {sortedTeams.map(({ t, n }) => {
            const rank = standingMap[t] || '-';
            // 💡 1위 팀이면 왕관👑 표시를 위해 체크
            const isFirst = rank === 1 || rank === '1';

            return (
              <div
                key={t}
                className="team-card"
                onClick={() => setSelectedTeam(t)}
                // 💡 1위 팀이면 살짝 강조 효과 (취향대로 조절해!)
                style={isFirst ? { border: '1.5px solid #FFD700', boxShadow: '0 4px 10px rgba(255, 215, 0, 0.15)' } : {}}
              >
                <TeamEmblem teamKey={t} size={42} />
                <div>
                  <div className="team-card__name">
                    {t} {isFirst && <span style={{ fontSize: '11px', verticalAlign: 'middle' }}>👑</span>}
                  </div>
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