// src/components/SearchScreen.jsx
import { useState } from 'react';
import { usePlayerNav } from '../context/PlayerNavContext';
import { PLAYERS_DB, PLAYER_SEARCH_LIST } from '../data/mockData';

const QUICK_NAMES = ['안우진', '이정후', '황성빈', '홍창기', '임찬규', '양현종', '강백호', '박동원'];

function PlayerRow({ player, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)',
      borderRadius: 12, padding: '10px 14px',
      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: '#E1F5EE', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 14, fontWeight: 600,
        color: '#0F6E56', flexShrink: 0,
      }}>
        {player.name[0]}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>{player.name}</div>
        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
          {player.team} · {player.pos} · #{player.num}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#D85A30' }}>
          {player.isPitcher ? player.era : player.avg}
        </div>
        <div style={{ fontSize: 10, color: '#bbb', marginTop: 2 }}>
          {player.isPitcher ? 'ERA' : '타율'}
        </div>
      </div>
      <div style={{ fontSize: 13, color: '#ccc' }}>›</div>
    </div>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { setSelectedPlayer } = usePlayerNav();

  const results = query.trim().length > 0
    ? PLAYER_SEARCH_LIST.filter(p => p.name.includes(query.trim()))
    : [];

  return (
    <>
      <div className="topbar">
        <div className="topbar__title">선수 검색</div>
      </div>
      <div className="screen">
        <div style={{ padding: '12px 16px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#f0f0f0', borderRadius: 12, padding: '10px 14px',
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#aaa" strokeWidth="1.5">
              <circle cx="7" cy="7" r="4.5"/>
              <line x1="10.2" y1="10.2" x2="13.5" y2="13.5"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="선수 이름 검색..."
              style={{
                flex: 1, border: 'none', background: 'transparent',
                fontSize: 14, color: '#000', outline: 'none',
              }}
            />
            {query.length > 0 && (
              <div onClick={() => setQuery('')} style={{ fontSize: 16, color: '#bbb', cursor: 'pointer', lineHeight: 1 }}>✕</div>
            )}
          </div>
        </div>

        {query.trim().length > 0 ? (
          <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#bbb', fontSize: 13 }}>검색 결과가 없어요</div>
            ) : (
              results.map(p => <PlayerRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />)
            )}
          </div>
        ) : (
          <>
            <div className="section-title" style={{ marginTop: 16 }}>많이 찾는 선수</div>
            <div className="quick-chips">
              {QUICK_NAMES.map(name => (
                <div key={name} className="quick-chip"
                  onClick={() => PLAYERS_DB[name] && setSelectedPlayer(PLAYERS_DB[name])}>
                  {name}
                </div>
              ))}
            </div>
            <div className="section-title" style={{ marginTop: 8 }}>전체 선수</div>
            <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PLAYER_SEARCH_LIST.map(p => (
                <PlayerRow key={p.name} player={p} onClick={() => setSelectedPlayer(p)} />
              ))}
            </div>
          </>
        )}
        <div style={{ height: 16 }} />
      </div>
    </>
  );
}
