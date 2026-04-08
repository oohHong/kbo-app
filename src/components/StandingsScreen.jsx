import { useState, useEffect } from 'react';
import TeamEmblem from './TeamEmblem';
// 💡 TeamScreen 파일에서 'TeamDetail' 컴포넌트만 정확하게 중괄호로 가져오기!
import { TeamDetail } from './TeamScreen'; 

export default function StandingsScreen() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/standings');
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setStandings(data);
        } else {
          setStandings([]);
        }
      } catch (error) {
        console.error('순위 데이터 로드 실패:', error);
        setStandings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  // 💡 팀이 선택되었을 때, 하단 탭바까지 가려지도록 fixed 오버레이 적용
  if (selectedTeam) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: '#fff', 
        zIndex: 1000, 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <TeamDetail teamKey={selectedTeam} onBack={() => setSelectedTeam(null)} />
      </div>
    );
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar__title">순위</div>
        <div className="topbar__sub">2026 정규시즌</div>
      </div>

      <div className="screen">
        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#94a3b8' }}>
            순위 데이터를 불러오는 중...
          </div>
        ) : (
          <div className="standings-table">
            <div className="standings-header" style={{ display: 'flex', alignItems: 'center' }}>
              <span className="col-rank" style={{ width: '40px', textAlign: 'center', color: '#aaa', fontSize: 11 }}>순위</span>
              <span style={{ flex: 1, fontSize: 11, color: '#aaa', fontWeight: 600, textAlign: 'center' }}>팀</span>
              <span className="col-w" style={{ width: '40px', textAlign: 'center', fontSize: 11, color: '#aaa', fontWeight: 600 }}>승</span>
              <span className="col-l" style={{ width: '40px', textAlign: 'center', fontSize: 11, color: '#aaa', fontWeight: 600 }}>패</span>
              <span className="col-l" style={{ width: '40px', textAlign: 'center', fontSize: 11, color: '#aaa', fontWeight: 600 }}>무</span>
              <span className="col-pct" style={{ width: '60px', textAlign: 'center', fontSize: 11, color: '#aaa', fontWeight: 600 }}>승률</span>
            </div>

            {standings.map((s, i) => {
              const isK = s.teamName === '키움';
              return (
                <div 
                  key={s.teamName} 
                  className={`standings-row${isK ? ' standings-row--kiwoom' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setSelectedTeam(s.teamName)}
                >
                  <span className={`col-rank${s.rank <= 5 ? ' col-rank--top' : ''}`} style={{ width: '40px', textAlign: 'center' }}>
                    {s.rank}
                  </span>
                  <span className={`col-team${isK ? ' col-team--kiwoom' : ''}`} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TeamEmblem teamKey={s.teamName} size={24} />
                    <span style={{ fontWeight: '500' }}>{s.teamName}</span>
                    <span style={{ fontSize: '10px', color: s.streak?.includes('승') ? '#e11d48' : '#2563eb', marginLeft: '2px' }}>
                      {s.streak}
                    </span>
                  </span>
                  <span style={{ width: '40px', textAlign: 'center' }}>{s.win}</span>
                  <span style={{ width: '40px', textAlign: 'center' }}>{s.lose}</span>
                  <span style={{ width: '40px', textAlign: 'center', color: '#999' }}>{s.draw}</span>
                  <span style={{ width: '60px', textAlign: 'center' }}>{s.winRate}</span>
                </div>
              );
            })}
          </div>
        )}
        <div style={{ padding: '20px', fontSize: '11px', color: '#999', textAlign: 'center' }}>
          데이터 제공: NAVER SPORTS
        </div>
        <div style={{ height: 16 }} />
      </div>
    </>
  );
}