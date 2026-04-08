// src/data/mockData.js

export const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const GAMES_DB = {
  '2025-05-08': [
    { home: '키움', away: '삼성', homeP: '에레디아', awayP: '원태인', status: 'done', homeScore: 5, awayScore: 3, stadium: '고척스카이돔' },
    { home: 'LG', away: '두산', homeP: '임찬규', awayP: '곽빈', status: 'done', homeScore: 2, awayScore: 4, stadium: '잠실야구장' },
    { home: 'SSG', away: 'NC', homeP: '노경은', awayP: '루친스키', status: 'done', homeScore: 1, awayScore: 1, stadium: 'SSG 랜더스필드' },
  ],
  '2025-05-09': [
    { home: '키움', away: 'KT', homeP: '하영민', awayP: '벤자민', status: 'done', homeScore: 3, awayScore: 7, stadium: '고척스카이돔' },
    { home: 'LG', away: '두산', homeP: '플럿코', awayP: '이영하', status: 'done', homeScore: 6, awayScore: 2, stadium: '잠실야구장' },
    { home: '한화', away: '롯데', homeP: '류현진', awayP: '스트레일리', status: 'done', homeScore: 4, awayScore: 2, stadium: '한화생명이글스파크' },
  ],
  '2025-05-10': [
    { home: '키움', away: 'KT', homeP: '안우진', awayP: '벤자민', status: 'live', inning: '6회말', homeScore: 4, awayScore: 2, stadium: '고척스카이돔' },
    { home: 'LG', away: '두산', homeP: '임찬규', awayP: '곽빈', status: 'live', inning: '5회초', homeScore: 3, awayScore: 3, stadium: '잠실야구장' },
    { home: '삼성', away: 'NC', homeP: '원태인', awayP: '루친스키', status: 'sched', time: '17:00', stadium: '대구삼성라이온즈파크' },
    { home: 'SSG', away: '한화', homeP: '노경은', awayP: '류현진', status: 'sched', time: '17:00', stadium: 'SSG 랜더스필드' },
    { home: '롯데', away: 'KIA', homeP: '스트레일리', awayP: '양현종', status: 'sched', time: '17:00', stadium: '사직야구장' },
  ],
  '2025-05-11': [
    { home: '키움', away: 'KT', homeP: '김선기', awayP: '소형준', status: 'sched', time: '14:00', stadium: '고척스카이돔' },
    { home: 'LG', away: '두산', homeP: '켈리', awayP: '이영하', status: 'sched', time: '14:00', stadium: '잠실야구장' },
    { home: '삼성', away: 'NC', homeP: '최채흥', awayP: '신민혁', status: 'sched', time: '14:00', stadium: '대구삼성라이온즈파크' },
  ],
  '2025-05-12': [
    { home: '키움', away: 'SSG', homeP: '에레디아', awayP: '김광현', status: 'sched', time: '18:30', stadium: '고척스카이돔' },
    { home: 'KT', away: '롯데', homeP: '벤자민', awayP: '스트레일리', status: 'sched', time: '18:30', stadium: '수원KT위즈파크' },
    { home: '한화', away: 'KIA', homeP: '류현진', awayP: '양현종', status: 'sched', time: '18:30', stadium: '한화생명이글스파크' },
  ],
  '2025-05-13': [
    { home: '키움', away: 'SSG', homeP: '안우진', awayP: '노경은', status: 'sched', time: '18:30', stadium: '고척스카이돔' },
    { home: 'LG', away: '삼성', homeP: '임찬규', awayP: '원태인', status: 'sched', time: '18:30', stadium: '잠실야구장' },
  ],
  '2025-05-14': [
    { home: '두산', away: '키움', homeP: '이영하', awayP: '하영민', status: 'sched', time: '18:30', stadium: '잠실야구장' },
    { home: 'KT', away: '한화', homeP: '소형준', awayP: '류현진', status: 'sched', time: '18:30', stadium: '수원KT위즈파크' },
  ],
};

export const STANDINGS = [
  { t: 'LG',   n: '트윈스',    w: 28, l: 14 },
  { t: 'KT',   n: '위즈',      w: 26, l: 16 },
  { t: '삼성', n: '라이온즈',  w: 24, l: 18 },
  { t: 'SSG',  n: '랜더스',    w: 23, l: 19 },
  { t: '두산', n: '베어스',    w: 21, l: 21 },
  { t: '한화', n: '이글스',    w: 20, l: 22 },
  { t: '롯데', n: '자이언츠',  w: 19, l: 23 },
  { t: '키움', n: '히어로즈',  w: 15, l: 27 },
  { t: 'NC',   n: '다이노스',  w: 18, l: 24 },
  { t: 'KIA',  n: '타이거즈',  w: 17, l: 25 },
];

export const TEAM_LIST = [
  { t: '키움', n: '히어로즈' },
  { t: 'LG',   n: '트윈스' },
  { t: 'KT',   n: '위즈' },
  { t: '삼성', n: '라이온즈' },
  { t: 'SSG',  n: '랜더스' },
  { t: '두산', n: '베어스' },
  { t: '한화', n: '이글스' },
  { t: '롯데', n: '자이언츠' },
  { t: 'NC',   n: '다이노스' },
  { t: 'KIA',  n: '타이거즈' },
];

export const TEAM_INFO = {
  '키움': { full: '키움 히어로즈', stadium: '고척스카이돔' },
  'LG':   { full: 'LG 트윈스',     stadium: '잠실야구장' },
  'KT':   { full: 'KT 위즈',       stadium: '수원KT위즈파크' },
  '삼성': { full: '삼성 라이온즈', stadium: '대구삼성라이온즈파크' },
  'SSG':  { full: 'SSG 랜더스',    stadium: 'SSG 랜더스필드' },
  '두산': { full: '두산 베어스',   stadium: '잠실야구장' },
  '한화': { full: '한화 이글스',   stadium: '한화생명이글스파크' },
  '롯데': { full: '롯데 자이언츠', stadium: '사직야구장' },
  'NC':   { full: 'NC 다이노스',   stadium: '창원NC파크' },
  'KIA':  { full: 'KIA 타이거즈',  stadium: '광주기아챔피언스필드' },
};

// 포지션별 로스터 + 등록/말소
export const ROSTERS = {
  '키움': {
    투수: [
      { num: 19, name: '안우진',  stat: 'ERA 2.41', active: true },
      { num: 51, name: '하영민',  stat: 'ERA 3.88', active: true },
      { num: 17, name: '에레디아', stat: 'ERA 4.12', active: true },
      { num: 41, name: '주승우',  stat: 'ERA 4.55', active: true },
      { num: 36, name: '김선기',  stat: 'ERA 5.01', active: true },
      { num: 32, name: '이승호',  stat: 'ERA 3.72', active: false, reason: '부상' },
      { num: 55, name: '김동규',  stat: 'ERA 6.12', active: false, reason: '말소' },
    ],
    포수: [
      { num: 22, name: '이지영',  stat: '.241 / 3홈런', active: true },
      { num: 52, name: '손성빈',  stat: '.198 / 1홈런', active: true },
    ],
    내야수: [
      { num: 3,  name: '김혜성',  stat: '.301 / 2루수', active: true },
      { num: 10, name: '송성문',  stat: '.278 / 3루수', active: true },
      { num: 25, name: '이주형',  stat: '.265 / 유격수', active: true },
      { num: 47, name: '최원태',  stat: '.233 / 1루수', active: true },
      { num: 6,  name: '박찬혁',  stat: '.241 / 내야', active: false, reason: '부상' },
    ],
    외야수: [
      { num: 44, name: '이정후',  stat: '.339 / 중견수', active: true },
      { num: 8,  name: '이원석',  stat: '.281 / 우익수', active: true },
      { num: 29, name: '황성빈',  stat: '.263 / 좌익수', active: true },
      { num: 53, name: '임지열',  stat: '.218 / 외야',  active: false, reason: '말소' },
    ],
  },
  'LG': {
    투수: [
      { num: 37, name: '임찬규',  stat: 'ERA 3.21', active: true },
      { num: 54, name: '켈리',    stat: 'ERA 3.44', active: true },
      { num: 11, name: '플럿코',  stat: 'ERA 3.88', active: true },
      { num: 26, name: '이정용',  stat: 'ERA 4.50', active: false, reason: '부상' },
    ],
    포수: [
      { num: 23, name: '박동원',  stat: '.251 / 포수', active: true },
    ],
    내야수: [
      { num: 7,  name: '오지환',  stat: '.278 / 유격수', active: true },
      { num: 5,  name: '문보경',  stat: '.265 / 3루수', active: true },
      { num: 88, name: '오스틴',  stat: '.298 / 1루수', active: true },
      { num: 1,  name: '신민재',  stat: '.231 / 2루수', active: true },
    ],
    외야수: [
      { num: 47, name: '홍창기',  stat: '.341 / 좌익수', active: true },
      { num: 33, name: '박해민',  stat: '.312 / 중견수', active: true },
      { num: 9,  name: '문성주',  stat: '.219 / 우익수', active: true },
    ],
  },
};

// 데이터 없는 팀 기본값
export function getDefaultRoster() {
  return {
    투수:   [{ num: 1, name: '선발투수A', stat: 'ERA 3.50', active: true }, { num: 11, name: '불펜투수B', stat: 'ERA 4.20', active: false, reason: '말소' }],
    포수:   [{ num: 22, name: '주전포수', stat: '.240 / 포수', active: true }],
    내야수: [{ num: 3, name: '유격수', stat: '.270 / 유격수', active: true }, { num: 7, name: '2루수', stat: '.255 / 2루수', active: false, reason: '부상' }],
    외야수: [{ num: 8, name: '중견수', stat: '.280 / 중견수', active: true }, { num: 9, name: '우익수', stat: '.261 / 우익수', active: true }],
  };
}

// 선발 라인업 (그라운드뷰용)
export const LINEUPS = {
  LG: {
    home: [
      { pos: '좌', name: '홍창기', avg: '.341' },
      { pos: '유', name: '오지환', avg: '.278' },
      { pos: '중', name: '박해민', avg: '.312' },
      { pos: '1루', name: '오스틴', avg: '.298' },
      { pos: '3루', name: '문보경', avg: '.265' },
      { pos: '포', name: '박동원', avg: '.251' },
      { pos: '지타', name: '김현수', avg: '.243' },
      { pos: '2루', name: '신민재', avg: '.231' },
      { pos: '우', name: '문성주', avg: '.219' },
    ],
    field: {
      cf: '박해민', lf: '홍창기', rf: '문성주',
      ss: '오지환', b2: '신민재',
      b3: '문보경', p: '임찬규', b1: '오스틴', c: '박동원',
    },
  },
  KT: {
    away: [
      { pos: '중', name: '배정대', avg: '.308' },
      { pos: '1루', name: '강백호', avg: '.290' },
      { pos: '좌', name: '멜빈',   avg: '.315' },
      { pos: '3루', name: '황재균', avg: '.271' },
      { pos: '포', name: '장성우', avg: '.261' },
      { pos: '우', name: '박병호', avg: '.247' },
      { pos: '2루', name: '심우준', avg: '.238' },
      { pos: '유', name: '김상수', avg: '.225' },
    ],
    field: {
      cf: '배정대', lf: '멜빈', rf: '박병호',
      ss: '김상수', b2: '심우준',
      b3: '황재균', p: '벤자민', b1: '강백호', c: '장성우',
    },
  },
};

// ─── 선수 상세 데이터 ───────────────────────────────────────────
export const PLAYERS_DB = {
  '안우진': {
    name: '안우진', team: '키움', pos: '투수', num: 19, isPitcher: true,
    era: '2.41', wins: 6, losses: 2, innings: '63.2',
    season: { era: '2.41', wins: 6, losses: 2, saves: 0, holds: 0, innings: '63.2', so: 72, bb: 18, whip: '0.98', games: 12 },
    recent: [
      { date: '5/9',  opp: 'vs KT',  result: '6이닝 1실점 승', good: true },
      { date: '5/4',  opp: 'vs 두산', result: '7이닝 무실점 승', good: true },
      { date: '4/28', opp: 'vs 삼성', result: '5이닝 3실점 패', good: false },
      { date: '4/22', opp: 'vs LG',  result: '6이닝 2실점 승', good: true },
      { date: '4/16', opp: 'vs SSG', result: '7이닝 1실점 승', good: true },
    ],
    prev: [
      { year: '2024', era: '2.98', wins: 15, losses: 6, innings: '168.1', so: 189 },
      { year: '2023', era: '3.14', wins: 14, losses: 8, innings: '155.0', so: 171 },
      { year: '2022', era: '3.55', wins: 11, losses: 9, innings: '140.2', so: 152 },
      { year: '2021', era: '4.01', wins:  8, losses: 10, innings: '112.0', so: 118 },
    ],
  },
  '이정후': {
    name: '이정후', team: '키움', pos: '외야수', num: 44, isPitcher: false,
    avg: '.339', hr: 5, rbi: 31, obp: '.412',
    season: { avg: '.339', hr: 5, rbi: 31, obp: '.412', slg: '.521', ops: '.933', hits: 52, games: 38, ab: 153, sb: 8 },
    recent: [
      { date: '5/9',  opp: 'vs KT',  result: '3안타 1홈런 2타점', good: true },
      { date: '5/8',  opp: 'vs KT',  result: '1안타', good: false },
      { date: '5/7',  opp: 'vs 두산', result: '2안타 1타점', good: true },
      { date: '5/6',  opp: 'vs 두산', result: '무안타', good: false },
      { date: '5/5',  opp: 'vs NC',  result: '1안타 1볼넷', good: false },
    ],
    prev: [
      { year: '2024', avg: '.298', hr: 7,  rbi: 55, hits: 144, games: 130 },
      { year: '2023', avg: '.321', hr: 5,  rbi: 48, hits: 138, games: 120 },
      { year: '2022', avg: '.349', hr: 23, rbi: 78, hits: 193, games: 141 },
      { year: '2021', avg: '.360', hr: 22, rbi: 80, hits: 189, games: 142 },
    ],
  },
  '황성빈': {
    name: '황성빈', team: '키움', pos: '외야수', num: 29, isPitcher: false,
    avg: '.263', hr: 1, rbi: 14, obp: '.331',
    season: { avg: '.263', hr: 1, rbi: 14, obp: '.331', slg: '.341', ops: '.672', hits: 31, games: 35, ab: 118, sb: 12 },
    recent: [
      { date: '5/9',  opp: 'vs KT',  result: '2안타 1도루', good: true },
      { date: '5/8',  opp: 'vs KT',  result: '무안타', good: false },
      { date: '5/7',  opp: 'vs 두산', result: '1안타', good: false },
      { date: '5/6',  opp: 'vs 두산', result: '2안타 1타점', good: true },
      { date: '5/5',  opp: 'vs NC',  result: '1안타 1도루', good: true },
    ],
    prev: [
      { year: '2024', avg: '.281', hr: 2, rbi: 28, hits: 98,  games: 110 },
      { year: '2023', avg: '.255', hr: 1, rbi: 21, hits: 74,  games: 95 },
    ],
  },
  '홍창기': {
    name: '홍창기', team: 'LG', pos: '외야수', num: 47, isPitcher: false,
    avg: '.341', hr: 8, rbi: 42, obp: '.421',
    season: { avg: '.341', hr: 8, rbi: 42, obp: '.421', slg: '.531', ops: '.952', hits: 53, games: 42, ab: 156, sb: 5 },
    recent: [
      { date: '5/9',  opp: 'vs KT',  result: '3안타 1홈런 2타점', good: true },
      { date: '5/8',  opp: 'vs KT',  result: '1안타', good: false },
      { date: '5/7',  opp: 'vs 두산', result: '2안타 1타점', good: true },
      { date: '5/6',  opp: 'vs 두산', result: '무안타', good: false },
      { date: '5/5',  opp: 'vs NC',  result: '1안타 1볼넷', good: false },
    ],
    prev: [
      { year: '2024', avg: '.298', hr: 7,  rbi: 55, hits: 144, games: 130 },
      { year: '2023', avg: '.321', hr: 5,  rbi: 48, hits: 138, games: 120 },
      { year: '2022', avg: '.282', hr: 3,  rbi: 31, hits: 110, games: 110 },
      { year: '2021', avg: '.267', hr: 2,  rbi: 24, hits: 95,  games: 95 },
    ],
  },
  '임찬규': {
    name: '임찬규', team: 'LG', pos: '투수', num: 37, isPitcher: true,
    era: '3.21', wins: 6, losses: 2, innings: '50.1',
    season: { era: '3.21', wins: 6, losses: 2, saves: 0, holds: 0, innings: '50.1', so: 48, bb: 14, whip: '1.10', games: 10 },
    recent: [
      { date: '5/9',  opp: 'vs 두산', result: '6이닝 2실점 승', good: true },
      { date: '5/4',  opp: 'vs KT',  result: '5이닝 3실점 무', good: false },
      { date: '4/28', opp: 'vs SSG', result: '7이닝 1실점 승', good: true },
      { date: '4/22', opp: 'vs NC',  result: '6이닝 2실점 승', good: true },
      { date: '4/16', opp: 'vs 삼성', result: '5이닝 4실점 패', good: false },
    ],
    prev: [
      { year: '2024', era: '3.88', wins: 12, losses: 8, innings: '145.0', so: 128 },
      { year: '2023', era: '4.01', wins: 10, losses: 9, innings: '130.2', so: 112 },
      { year: '2022', era: '3.55', wins: 13, losses: 7, innings: '152.1', so: 141 },
    ],
  },
  '양현종': {
    name: '양현종', team: 'KIA', pos: '투수', num: 54, isPitcher: true,
    era: '3.44', wins: 5, losses: 3, innings: '52.0',
    season: { era: '3.44', wins: 5, losses: 3, saves: 0, holds: 0, innings: '52.0', so: 51, bb: 12, whip: '1.15', games: 11 },
    recent: [
      { date: '5/9',  opp: 'vs 롯데', result: '7이닝 2실점 승', good: true },
      { date: '5/3',  opp: 'vs SSG', result: '6이닝 3실점 패', good: false },
      { date: '4/27', opp: 'vs 두산', result: '7이닝 1실점 승', good: true },
      { date: '4/21', opp: 'vs 한화', result: '6이닝 2실점 승', good: true },
      { date: '4/15', opp: 'vs NC',  result: '5이닝 3실점 패', good: false },
    ],
    prev: [
      { year: '2024', era: '3.21', wins: 14, losses: 7, innings: '162.0', so: 155 },
      { year: '2023', era: '3.55', wins: 12, losses: 9, innings: '148.2', so: 138 },
      { year: '2022', era: '2.99', wins: 16, losses: 6, innings: '172.1', so: 168 },
    ],
  },
  '강백호': {
    name: '강백호', team: 'KT', pos: '내야수', num: 52, isPitcher: false,
    avg: '.290', hr: 10, rbi: 38, obp: '.371',
    season: { avg: '.290', hr: 10, rbi: 38, obp: '.371', slg: '.512', ops: '.883', hits: 44, games: 40, ab: 152, sb: 2 },
    recent: [
      { date: '5/9',  opp: 'vs 키움', result: '1안타 1홈런 2타점', good: true },
      { date: '5/8',  opp: 'vs 키움', result: '2안타', good: true },
      { date: '5/7',  opp: 'vs LG',  result: '무안타', good: false },
      { date: '5/6',  opp: 'vs LG',  result: '1안타 1타점', good: false },
      { date: '5/5',  opp: 'vs 삼성', result: '2안타 1홈런', good: true },
    ],
    prev: [
      { year: '2024', avg: '.311', hr: 22, rbi: 88, hits: 168, games: 140 },
      { year: '2023', avg: '.288', hr: 18, rbi: 72, hits: 148, games: 135 },
      { year: '2022', avg: '.302', hr: 20, rbi: 80, hits: 162, games: 138 },
    ],
  },
  '박동원': {
    name: '박동원', team: 'LG', pos: '포수', num: 23, isPitcher: false,
    avg: '.251', hr: 4, rbi: 22, obp: '.321',
    season: { avg: '.251', hr: 4, rbi: 22, obp: '.321', slg: '.388', ops: '.709', hits: 28, games: 38, ab: 111, sb: 0 },
    recent: [
      { date: '5/9',  opp: 'vs 두산', result: '1안타 1타점', good: false },
      { date: '5/8',  opp: 'vs 두산', result: '2안타 1홈런', good: true },
      { date: '5/7',  opp: 'vs KT',  result: '무안타', good: false },
      { date: '5/6',  opp: 'vs KT',  result: '1안타', good: false },
      { date: '5/5',  opp: 'vs SSG', result: '1안타 2타점', good: true },
    ],
    prev: [
      { year: '2024', avg: '.261', hr: 9,  rbi: 48, hits: 88,  games: 108 },
      { year: '2023', avg: '.241', hr: 7,  rbi: 38, hits: 72,  games: 98 },
    ],
  },
};

export const PLAYER_SEARCH_LIST = Object.values(PLAYERS_DB);
