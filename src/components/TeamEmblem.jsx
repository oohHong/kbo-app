// src/components/TeamEmblem.jsx
import { useState } from 'react';

export const EMBLEM_URL = {
  'LG':   'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/LG.png',
  '한화': 'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2025/HH.png',
  'SSG':  'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2024/SK.png',
  '삼성': 'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/SS.png',
  'NC':   'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/NC.png',
  'KT':   'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/KT.png',
  '롯데': 'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/LT.png',
  'KIA':  'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/HT.png',
  '두산': 'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2025/OB.png',
  '키움': 'https://6ptotvmi5753.edge.naverncp.com/KBO_IMAGE/KBOHome/resources/images/emblem/regular/2022/WO.png',
};

/**
 * TeamEmblem — 동그라미 안에 KBO 공식 엠블럼 이미지
 * @param {string} teamKey  — 팀명 (예: '키움', 'LG')
 * @param {number} size     — 원 지름 px (기본 36)
 * @param {object} style    — 추가 인라인 스타일
 */
export default function TeamEmblem({ teamKey, size = 36, style = {} }) {
  const [imgError, setImgError] = useState(false);
  const url = EMBLEM_URL[teamKey];
  const isKiwoom = teamKey === '키움';

  const circleStyle = {
    width: size, height: size, borderRadius: '50%',
    background: isKiwoom ? '#E1F5EE' : '#f0f0f0',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', flexShrink: 0,
    ...style,
  };

  if (url && !imgError) {
    return (
      <div style={circleStyle}>
        <img
          src={url}
          alt={teamKey}
          onError={() => setImgError(true)}
          style={{ width: '85%', height: '85%', objectFit: 'contain' }}
        />
      </div>
    );
  }

  // 이미지 로드 실패 시 텍스트 fallback
  return (
    <div style={{
      ...circleStyle,
      fontSize: size * 0.28, fontWeight: 600,
      color: isKiwoom ? '#0F6E56' : '#555',
    }}>
      {teamKey}
    </div>
  );
}
