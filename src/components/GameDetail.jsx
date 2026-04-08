import React, { useState, useEffect } from 'react';
import TeamEmblem from './TeamEmblem';
import { usePlayerNav } from '../context/PlayerNavContext';

const TEAM_THEMES = {
  'LG': { primary: '#C30452', bg: '#FFF0F5' },
  'kt': { primary: '#000000', bg: '#f1f1f1' },
  'SSG': { primary: '#CE0E2D', bg: '#FFF5F5' },
  'NC': { primary: '#315288', bg: '#F0F4F8' },
  '두산': { primary: '#131230', bg: '#F0F0F5' },
  'KIA': { primary: '#EA0029', bg: '#FFF5F5' },
  '롯데': { primary: '#041E42', bg: '#F0F0F5' },
  '삼성': { primary: '#074CA1', bg: '#F0F8FF' },
  '한화': { primary: '#FF6600', bg: '#FFF8F0' },
  '키움': { primary: '#820024', bg: '#F5F0F2' },
};

export default function GameDetail({ game, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setSelectedPlayer } = usePlayerNav();

  if (!game) return null;

  const isDone = game.status === 'done';
  const getTheme = (teamName) => {
    if (!teamName) return { primary: '#475569', bg: '#f8fafb' };
    for (const key in TEAM_THEMES) {
      if (teamName.includes(key)) return TEAM_THEMES[key];
    }
    return { primary: '#475569', bg: '#f8fafb' };
  };

  const awayTheme = getTheme(game.away);
  const homeTheme = getTheme(game.home);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const endpoint = isDone ? 'record' : 'lineup';
        const response = await fetch(`http://localhost:5000/api/matches/${game.matchId}/${endpoint}`);
        const result = await response.json();
        if (response.ok) setData(result);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchData();
  }, [game.matchId, isDone]);

  const handlePlayerClick = (playerName, teamName) => {
    if (!playerName || playerName === '-') return;
    setSelectedPlayer({ name: playerName, teamName: teamName });
  };

  // 투수 결과 색상
  const getWlsColor = (wls) => {
    switch (wls) {
      case '승': return '#007bff';
      case '패': return '#dc3545';
      case '홀': return '#28a745';
      case '세': return '#ffc107';
      default: return '#94a3b8';
    }
  };

  // 기록 테이블 렌더러
  const renderBoxscore = (title, headers, rows, type, teamName) => (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #eee' }}>
      <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px', borderLeft: '4px solid #333', paddingLeft: '8px' }}>{title}</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee', color: '#888' }}>
              {headers.map(h => <th key={h} style={{ padding: '8px 4px', textAlign: 'center' }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                <td onClick={() => handlePlayerClick(row.name, teamName)} style={{ padding: '10px 4px', fontWeight: 700, cursor: 'pointer', color: '#1a202c', width: '60px' }}>{row.name}</td>
                {type === 'pitcher' ? (
                  <>
                    <td style={{ textAlign: 'center', color: getWlsColor(row.wls), fontWeight: 800 }}>{row.wls || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{row.inn}</td>
                    <td style={{ textAlign: 'center' }}>{row.pa}</td>
                    <td style={{ textAlign: 'center' }}>{row.bf}</td>
                    <td style={{ textAlign: 'center' }}>{row.hit}</td>
                    <td style={{ textAlign: 'center' }}>{row.kk}</td>
                    <td style={{ textAlign: 'center' }}>{row.r}</td>
                  </>
                ) : (
                  <>
                    <td style={{ textAlign: 'center' }}>{row.batOrder}</td>
                    <td style={{ textAlign: 'center' }}>{row.ab}</td>
                    <td style={{ textAlign: 'center' }}>{row.hit}</td>
                    <td style={{ textAlign: 'center' }}>{row.rbi}</td>
                    <td style={{ textAlign: 'center' }}>{row.run}</td>
                    <td style={{ textAlign: 'center' }}>{row.hra}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 5000,
      display: 'flex', justifyContent: 'center'
    }}>
      <div style={{
        width: '100%', maxWidth: '450px', height: '100%', backgroundColor: '#f8fafb',
        display: 'flex', flexDirection: 'column', boxShadow: '0 0 30px rgba(0,0,0,0.3)',
        position: 'relative', overflow: 'hidden'
      }}>
        
        {/* 탑바 */}
        <div style={{
          display: 'flex', alignItems: 'center', padding: '0 16px', height: '54px',
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, color: '#fff'
        }}>
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', width: '32px', height: '32px',
            borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>←</button>
          <div style={{ fontSize: '15px', fontWeight: 700, marginLeft: '12px', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            {isDone ? '경기 결과 리포트' : '라인업 분석'}
          </div>
        </div>

        {/* 🏟️ 스코어보드 */}
        <div style={{
          background: `linear-gradient(135deg, ${awayTheme.primary} 0%, ${homeTheme.primary} 100%)`,
          padding: '75px 20px 35px', textAlign: 'center', color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#fff', borderRadius: '50%', padding: '4px', display: 'flex' }}><TeamEmblem teamKey={game.away} size={48} /></div>
              <div style={{ fontSize: '17px', fontWeight: 900, marginTop: '10px' }}>{game.away}</div>
            </div>
            <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '5px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '44px', fontWeight: 900 }}>{game.awayScore}</span>
                <span style={{ fontSize: '24px', opacity: 0.5 }}>:</span>
                <span style={{ fontSize: '44px', fontWeight: 900 }}>{game.homeScore}</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '4px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, marginTop: '12px' }}>
                {game.stadium} • {game.time}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#fff', borderRadius: '50%', padding: '4px', display: 'flex' }}><TeamEmblem teamKey={game.home} size={48} /></div>
              <div style={{ fontSize: '17px', fontWeight: 900, marginTop: '10px' }}>{game.home}</div>
            </div>
          </div>
        </div>

        {/* 본문 스크롤 영역 */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#94a3b8' }}>데이터를 불러오는 중...</div>
          ) : isDone && data ? (
            /* 💡 [수정] 지난 경기 결과 화면 (데이터 구조 대응) */
            <div className="record-container">
              {renderBoxscore(`${game.away} 투수`, ["성명","결과","이닝","타자","투구","안타","삼진","실점"], data.pitchers?.away, 'pitcher', game.away)}
              {renderBoxscore(`${game.home} 투수`, ["성명","결과","이닝","타자","투구","안타","삼진","실점"], data.pitchers?.home, 'pitcher', game.home)}
              {renderBoxscore(`${game.away} 타자`, ["성명","타순","타수","안타","타점","득점","타율"], data.batters?.away, 'batter', game.away)}
              {renderBoxscore(`${game.home} 타자`, ["성명","타순","타수","안타","타점","득점","타율"], data.batters?.home, 'batter', game.home)}
            </div>
          ) : data ? (
            /* 📋 경기 전 라인업 화면 */
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ background: awayTheme.bg, borderRadius: '16px', padding: '16px', border: `1px solid ${awayTheme.primary}22` }}>
                <div style={{ color: awayTheme.primary, fontWeight: 900, fontSize: '13px', marginBottom: '12px' }}>AWAY</div>
                <div onClick={() => handlePlayerClick(data.away.pitcher, data.away.teamName)} style={{ background: '#fff', padding: '10px', borderRadius: '10px', marginBottom: '12px', cursor: 'pointer', border: `1px solid ${awayTheme.primary}44` }}>
                  <div style={{ fontSize: '9px', color: awayTheme.primary }}>STARTING PITCHER</div>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>{data.away.pitcher} ›</div>
                </div>
                {data.away.batters?.map((b, i) => (
                  <div key={i} onClick={() => handlePlayerClick(b.name, data.away.teamName)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                    <span style={{ fontSize: '11px', color: awayTheme.primary, fontWeight: 700, width: '15px' }}>{b.order}</span>
                    <span style={{ fontSize: '10px', background: '#fff', border: '1px solid #eee', padding: '2px 4px', borderRadius: '4px' }}>{b.pos}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{b.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: homeTheme.bg, borderRadius: '16px', padding: '16px', border: `1px solid ${homeTheme.primary}22` }}>
                <div style={{ color: homeTheme.primary, fontWeight: 900, fontSize: '13px', marginBottom: '12px' }}>HOME</div>
                <div onClick={() => handlePlayerClick(data.home.pitcher, data.home.teamName)} style={{ background: '#fff', padding: '10px', borderRadius: '10px', marginBottom: '12px', cursor: 'pointer', border: `1px solid ${homeTheme.primary}44` }}>
                  <div style={{ fontSize: '9px', color: homeTheme.primary }}>STARTING PITCHER</div>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>{data.home.pitcher} ›</div>
                </div>
                {data.home.batters?.map((b, i) => (
                  <div key={i} onClick={() => handlePlayerClick(b.name, data.home.teamName)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                    <span style={{ fontSize: '11px', color: homeTheme.primary, fontWeight: 700, width: '15px' }}>{b.order}</span>
                    <span style={{ fontSize: '10px', background: '#fff', border: '1px solid #eee', padding: '2px 4px', borderRadius: '4px' }}>{b.pos}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}