import { createPortal } from 'react-dom';

export default function PlayerDetail({ player, onBack }) {
  if (!player) return null;

  const pid = player?.playerId;
  const naverUrl = `https://m.sports.naver.com/player/index?category=kbo&playerId=${pid}&tab=record`;

  const openNaverRecord = () => {
    if (!pid) {
      alert("선수 고유 ID가 없어 기록을 불러올 수 없습니다.");
      return;
    }
    window.open(naverUrl, '_blank', 'noopener,noreferrer');
  };

  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0, // 💡 좌우 대칭을 위해 추가
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', // 💡 배경을 살짝 어둡게 하면 더 앱 같음
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center', // 💡 가로 중앙 정렬
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px', // 👈 우리 앱의 모바일 최대 너비 (네 설정에 맞춰 조절해!)
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)', // 💡 그림자 살짝 주면 입체감 폭발
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* --- 여기부터 상단 탑바 --- */}
        <div className="detail-topbar" style={{ borderBottom: '1px solid #eee', flexShrink: 0 }}>
          <div className="back-btn" onClick={onBack}>
            <svg width="10" height="14" viewBox="0 0 10 16" fill="none" stroke="#333" strokeWidth="1.8">
              <path d="M8 2L2 8L8 14"/>
            </svg>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>선수 정보</div>
        </div>

        {/* --- 선수 프로필 카드 --- */}
        <div style={{ padding: '30px 20px', textAlign: 'center', background: '#f8f9fa', flexShrink: 0 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: '#e2e8f0', display: 'inline-flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#4a5568',
            marginBottom: 15, border: '3px solid #fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            {player.name ? player.name[0] : '?'}
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#1a202c' }}>
            {player.name} <span style={{ fontSize: 16, color: '#a0aec0', fontWeight: 400 }}>#{player.backNum}</span>
          </div>
          <div style={{ fontSize: 14, color: '#718096', marginTop: 8 }}>
            {player.teamName} · {player.position}
          </div>
        </div>

        {/* --- 액션 영역 --- */}
        <div style={{ flex: 1, padding: '40px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 15, color: '#4a5568', marginBottom: 30 }}>기록을 확인하시겠습니까?</p>
          <button onClick={openNaverRecord} style={{
             width: '100%', maxWidth: 280, padding: '16px', backgroundColor: '#00c73c', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer'
          }}>
            실시간 기록실 바로가기
          </button>
          <button onClick={onBack} style={{ 
             marginTop: 15, width: '100%', maxWidth: 280, padding: '14px', backgroundColor: 'transparent', color: '#a0aec0', border: '1px solid #e2e8f0', borderRadius: 12, cursor: 'pointer'
          }}>
            이전으로
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}