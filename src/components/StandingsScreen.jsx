// src/components/StandingsScreen.jsx
import TeamEmblem from './TeamEmblem';
import { STANDINGS } from '../data/mockData';

export default function StandingsScreen() {
  const sorted = [...STANDINGS].sort(
    (a, b) => (b.w / (b.w + b.l)) - (a.w / (a.w + a.l))
  );

  return (
    <>
      <div className="topbar">
        <div className="topbar__title">순위</div>
        <div className="topbar__sub">2025 시즌</div>
      </div>
      <div className="screen">
        <div className="standings-table">
          <div className="standings-header">
            <span className="col-rank" style={{ color: '#aaa', fontSize: 11 }}>순위</span>
            <span style={{ flex: 1, fontSize: 11, color: '#aaa', fontWeight: 600 }}>팀</span>
            <span className="col-w" style={{ fontSize: 11, color: '#aaa', fontWeight: 600 }}>승</span>
            <span className="col-l" style={{ fontSize: 11, color: '#aaa', fontWeight: 600 }}>패</span>
            <span className="col-pct" style={{ fontSize: 11, color: '#aaa', fontWeight: 600 }}>승률</span>
          </div>
          {sorted.map((s, i) => {
            const isK = s.t === '키움';
            return (
              <div key={s.t} className={`standings-row${isK ? ' standings-row--kiwoom' : ''}`}>
                <span className={`col-rank${i < 5 ? ' col-rank--top' : ''}`}>{i + 1}</span>
                <span className={`col-team${isK ? ' col-team--kiwoom' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <TeamEmblem teamKey={s.t} size={24} />
                  {s.t} {s.n}
                </span>
                <span className="col-w">{s.w}</span>
                <span className="col-l">{s.l}</span>
                <span className="col-pct">{(s.w / (s.w + s.l)).toFixed(3)}</span>
              </div>
            );
          })}
        </div>
        <div style={{ height: 16 }} />
      </div>
    </>
  );
}
