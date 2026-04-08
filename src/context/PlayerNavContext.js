// src/context/PlayerNavContext.js
import { createContext, useContext, useState } from 'react';

const PlayerNavContext = createContext(null);

export function PlayerNavProvider({ children }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  return (
    <PlayerNavContext.Provider value={{ selectedPlayer, setSelectedPlayer }}>
      {children}
    </PlayerNavContext.Provider>
  );
}

export function usePlayerNav() {
  return useContext(PlayerNavContext);
}
