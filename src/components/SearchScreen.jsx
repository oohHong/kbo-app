import { useState, useEffect } from 'react';
import { usePlayerNav } from '../context/PlayerNavContext';

// 💡 개별 선수 행 컴포넌트 (DB 필드명에 맞춰 수정)
function PlayerRow({ player, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', border: '0.5px solid rgba(0,0,0,0.08)',
      borderRadius: 12, padding: '10px 14px',
      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: '#f0f4f8', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 14, fontWeight: 600,
        color: '#4a5568', flexShrink: 0,
      }}>
        {player.name[0]}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#000' }}>{player.name}</div>
        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
          {player.teamName} · {player.position} · #{player.backNum}
        </div>
      </div>
      <div style={{ textAlign: 'right', fontSize: 10, color: '#ccc' }}>
        보기 ›
      </div>
    </div>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { setSelectedPlayer } = usePlayerNav();

  // 💡 검색어가 바뀔 때마다 API 호출 (디바운싱 적용하면 더 좋음)
  useEffect(() => {
    const searchPlayers = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/players/search?name=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.error("검색 에러:", e);
      }
    };

    const timer = setTimeout(searchPlayers, 300); // 0.3초 대기 후 검색
    return () => clearTimeout(timer);
  }, [query]);

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
              <div onClick={() => setQuery('')} style={{ fontSize: 16, color: '#bbb', cursor: 'pointer' }}>✕</div>
            )}
          </div>
        </div>

        <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {query.trim().length > 0 ? (
            results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0', color: '#bbb', fontSize: 13 }}>검색 결과가 없어요</div>
            ) : (
              results.map(p => <PlayerRow key={p.playerId} player={p} onClick={() => setSelectedPlayer(p)} />)
            )
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#ccc' }}>
              <p style={{ fontSize: 13 }}>찾고 싶은 선수의 이름을 입력하세요</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}