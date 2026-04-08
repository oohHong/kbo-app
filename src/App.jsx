// src/App.jsx
import { useState } from 'react';
import GamesScreen from './components/GamesScreen';
import TeamScreen from './components/TeamScreen';
import SearchScreen from './components/SearchScreen';
import StandingsScreen from './components/StandingsScreen';
import PlayerDetail from './components/PlayerDetail';
import { PlayerNavProvider, usePlayerNav } from './context/PlayerNavContext';

const TABS = [
  {
    id: 'games', label: '경기',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="17" rx="2"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 'teams', label: '팀',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'search', label: '선수 검색',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7"/>
        <line x1="16.5" y1="16.5" x2="21" y2="21"/>
      </svg>
    ),
  },
  {
    id: 'standings', label: '순위',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="12" width="4" height="9"/>
        <rect x="10" y="7" width="4" height="14"/>
        <rect x="17" y="3" width="4" height="18"/>
      </svg>
    ),
  },
];

// context에서 selectedPlayer 꺼내 전체화면 오버레이로 렌더
function GlobalPlayerOverlay() {
  const { selectedPlayer, setSelectedPlayer } = usePlayerNav();
  if (!selectedPlayer) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: '50%',
      transform: 'translateX(-50%)',
      width: '100%', maxWidth: 430,
      bottom: 0,
      background: '#f5f5f5',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <PlayerDetail player={selectedPlayer} onBack={() => setSelectedPlayer(null)} />
    </div>
  );
}

function AppInner() {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab === 'games'     && <GamesScreen />}
        {activeTab === 'teams'     && <TeamScreen />}
        {activeTab === 'search'    && <SearchScreen />}
        {activeTab === 'standings' && <StandingsScreen />}
      </div>

      <div className="bottom-tab">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn${activeTab === tab.id ? ' tab-btn--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="tab-btn__label">{tab.label}</span>
          </button>
        ))}
      </div>

      <GlobalPlayerOverlay />
    </div>
  );
}

export default function App() {
  return (
    <PlayerNavProvider>
      <AppInner />
    </PlayerNavProvider>
  );
}
