// src/components/DateStrip.jsx
import { useRef, useEffect } from 'react';
import { DAYS } from '../data/mockData';

function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function DateStrip({ selectedDate, onChange }) {
  const scrollRef = useRef(null);
  const today = new Date(2025, 4, 10); // 프로토타입 기준

  const start = addDays(selectedDate, -4);
  const dates = Array.from({ length: 14 }, (_, i) => addDays(start, i));

  useEffect(() => {
    if (scrollRef.current) {
      const active = scrollRef.current.querySelector('.date-item--active');
      if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedDate]);

  return (
    <div className="date-strip">
      <div className="date-strip__nav" onClick={() => onChange(addDays(selectedDate, -7))}>‹</div>
      <div className="date-strip__scroll" ref={scrollRef}>
        {dates.map((d, i) => {
          const isSel = dateKey(d) === dateKey(selectedDate);
          const isToday = dateKey(d) === dateKey(today);
          let cls = 'date-item';
          if (isSel) cls += ' date-item--active';
          else if (isToday) cls += ' date-item--today';
          return (
            <div key={i} className={cls} onClick={() => onChange(new Date(d))}>
              <span className="date-item__day">{DAYS[d.getDay()]}</span>
              <span className="date-item__num">{d.getDate()}</span>
            </div>
          );
        })}
      </div>
      <div className="date-strip__nav" onClick={() => onChange(addDays(selectedDate, 7))}>›</div>
    </div>
  );
}
