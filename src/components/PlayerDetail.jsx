// src/components/PlayerDetail.jsx
import { useState } from 'react';

function StatChip({ label, value, hot }) {
  return (
    <div style={{ flex: 1, background: '#f5f5f5', borderRadius: 10, padding: '8px 0', textAlign: 'center' }}>
      <div style={{ fontSize: 10, color: '#888', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: hot ? '#D85A30' : '#000' }}>{value}</div>
    </div>
  );
}

function SeasonTab({ player }) {
  const s = player.season;
  const rows = player.isPitcher
    ? [
        { label: 'ERA', value: s.era },
        { label: '승', value: s.wins },
        { label: '패', value: s.losses },
        { label: '세이브', value: s.saves },
        { label: '홀드', value: s.holds },
        { label: '이닝', value: s.innings },
        { label: '삼진', value: s.so },
        { label: '볼넷', value: s.bb },
        { label: 'WHIP', value: s.whip },
        { label: '등판', value: `${s.games}경기` },
      ]
    : [
        { label: '타율', value: s.avg },
        { label: '출루율', value: s.obp },
        { label: 'OPS', value: s.ops },
        { label: '슬러깅', value: s.slg },
        { label: '홈런', value: s.hr },
        { label: '타점', value: s.rbi },
        { label: '안타', value: s.hits },
        { label: '도루', value: s.sb },
        { label: '타석', value: s.ab },
        { label: '출장', value: `${s.games}경기` },
      ];
  return (
    <div style={{ padding: '12px 16px' }}>
      <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: '4px 14px' }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0',
            borderBottom: i < rows.length - 1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none',
          }}>
            <span style={{ fontSize: 13, color: '#888' }}>{r.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>{r.value}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

function RecentTab({ player }) {
  return (
    <div style={{ padding: '12px 16px' }}>
      <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ background: '#f9f9f9', padding: '8px 14px', fontSize: 11, fontWeight: 600, color: '#888', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
          최근 5경기
        </div>
        {player.recent.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', padding: '10px 14px', gap: 8,
            borderBottom: i < player.recent.length - 1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none',
          }}>
            <span style={{ width: 36, fontSize: 11, color: '#bbb', flexShrink: 0 }}>{r.date}</span>
            <span style={{ width: 60, fontSize: 12, color: '#888', flexShrink: 0 }}>{r.opp}</span>
            <span style={{ flex: 1, fontSize: 13, color: r.good ? '#D85A30' : '#555', fontWeight: r.good ? 600 : 400 }}>{r.result}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

function PrevTab({ player }) {
  const colStyle = (i) => ({
    flex: i === 0 ? '0 0 44px' : 1,
    fontSize: 11, color: '#aaa',
    textAlign: i > 0 ? 'center' : 'left',
  });

  const pitcherHeaders = ['연도', 'ERA', '승', '패', '이닝', '삼진'];
  const batterHeaders  = ['연도', '타율', '홈런', '타점', '안타', '경기'];

  return (
    <div style={{ padding: '12px 16px' }}>
      <div style={{ background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ background: '#f9f9f9', padding: '8px 14px', fontSize: 11, fontWeight: 600, color: '#888', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
          연도별 누적 기록
        </div>
        {/* 컬럼 헤더 */}
        <div style={{ display: 'flex', padding: '7px 14px', background: '#fcfcfc', borderBottom: '0.5px solid rgba(0,0,0,0.06)' }}>
          {(player.isPitcher ? pitcherHeaders : batterHeaders).map((h, i) => (
            <span key={i} style={colStyle(i)}>{h}</span>
          ))}
        </div>
        {/* 데이터 행 */}
        {player.prev.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', padding: '10px 14px',
            borderBottom: i < player.prev.length - 1 ? '0.5px solid rgba(0,0,0,0.06)' : 'none',
          }}>
            <span style={{ flex: '0 0 44px', fontSize: 13, fontWeight: 600, color: '#000' }}>{p.year}</span>
            {player.isPitcher ? (
              <>
                <span style={{ flex: 1, fontSize: 13, color: '#D85A30', fontWeight: 600, textAlign: 'center' }}>{p.era}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.wins}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.losses}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.innings}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.so}</span>
              </>
            ) : (
              <>
                <span style={{ flex: 1, fontSize: 13, color: '#D85A30', fontWeight: 600, textAlign: 'center' }}>{p.avg}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.hr}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.rbi}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.hits}</span>
                <span style={{ flex: 1, fontSize: 13, color: '#555', textAlign: 'center' }}>{p.games}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

export default function PlayerDetail({ player, onBack }) {
  const [tab, setTab] = useState('season');

  return (
    <>
      <div className="detail-topbar">
        <div className="back-btn" onClick={onBack}>
          <svg width="10" height="14" viewBox="0 0 10 16" fill="none" stroke="#666" strokeWidth="1.8">
            <path d="M8 2L2 8L8 14"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#000' }}>{player.name}</div>
          <div style={{ fontSize: 11, color: '#888' }}>{player.team} · {player.pos}</div>
        </div>
      </div>

      {/* 선수 헤더 */}
      <div style={{ background: '#fff', padding: '14px 16px 16px', borderBottom: '0.5px solid rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: '#E1F5EE', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 18, fontWeight: 600, color: '#0F6E56', flexShrink: 0,
          }}>
            {player.name[0]}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#000' }}>{player.name}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>
              {player.team} · {player.pos} · #{player.num}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {player.isPitcher ? (
            <>
              <StatChip label="ERA" value={player.era} hot />
              <StatChip label="승" value={player.wins} />
              <StatChip label="패" value={player.losses} />
              <StatChip label="이닝" value={player.innings} />
            </>
          ) : (
            <>
              <StatChip label="타율" value={player.avg} hot />
              <StatChip label="홈런" value={player.hr} />
              <StatChip label="타점" value={player.rbi} />
              <StatChip label="출루율" value={player.obp} />
            </>
          )}
        </div>
      </div>

      <div className="seg-row">
        <button className={`seg${tab === 'season' ? ' seg--active' : ''}`} onClick={() => setTab('season')}>2025 시즌</button>
        <button className={`seg${tab === 'recent' ? ' seg--active' : ''}`} onClick={() => setTab('recent')}>최근 경기</button>
        <button className={`seg${tab === 'prev'   ? ' seg--active' : ''}`} onClick={() => setTab('prev')}>이전 시즌</button>
      </div>

      <div className="screen">
        {tab === 'season' && <SeasonTab player={player} />}
        {tab === 'recent' && <RecentTab player={player} />}
        {tab === 'prev'   && <PrevTab player={player} />}
      </div>
    </>
  );
}
