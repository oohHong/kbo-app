const axios = require('axios');

async function scrapeRecord(gameId) {
  try {
    const url = `https://api-gw.sports.naver.com/schedule/games/${gameId}/record`;
    const response = await axios.get(url, { timeout: 5000 });
    const res = response.data.result.recordData;

    if (!res) return null;

    return {
      gameId,
      // 상단 요약 (RHEB)
      summary: res.scoreBoard.rheb,
      // 이닝별 점수
      innings: res.scoreBoard.inn,
      // 투수 박스스코어
      pitchers: {
        home: res.pitchersBoxscore.home,
        away: res.pitchersBoxscore.away
      },
      // 타자 박스스코어
      batters: {
        home: res.battersBoxscore.home,
        away: res.battersBoxscore.away
      },
      // 기타 기록 (결승타, 2루타 등)
      etc: res.etcRecords
    };
  } catch (error) {
    console.error(`❌ [Record Error] ${error.message}`);
    return null;
  }
}

module.exports = scrapeRecord;