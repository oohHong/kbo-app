const axios = require('axios');

async function scrapeLineup(gameId) {
  try {
    const url = `https://api-gw.sports.naver.com/schedule/games/${gameId}/preview`;
    console.log(`🔗 [Lineup Fetch] URL: ${url}`);
    
    const response = await axios.get(url, { timeout: 5000 });
    const res = response.data.result.previewData;

    if (!res) {
      console.log("❌ [Lineup] previewData가 없습니다.");
      return null;
    }

    // 💡 핵심: 객체 안에서 실제 배열(fullLineUp)을 찾아내는 안전한 함수
    const extractArray = (data) => {
      if (!data) return [];
      if (Array.isArray(data)) return data; // 바로 배열이면 반환
      if (data.fullLineUp && Array.isArray(data.fullLineUp)) return data.fullLineUp; // 객체 안의 fullLineUp 반환
      return [];
    };

    const homeLineup = extractArray(res.homeTeamLineUp);
    const awayLineup = extractArray(res.awayTeamLineUp);

    console.log(`🔍 [Check] Home 선수 수: ${homeLineup.length}, Away 선수 수: ${awayLineup.length}`);

    if (homeLineup.length === 0 || awayLineup.length === 0) {
      console.log(`❌ [Lineup] 타자 배열을 찾지 못했습니다.`);
      return null;
    }

    const transform = (list, teamName, starter) => ({
      teamName: teamName || '팀명',
      pitcher: starter?.playerInfo?.name || '미정',
      batters: list
        .filter(p => p.batorder || p.battingOrder) // 드디어 여기서 에러 안 날 거야!
        .map(p => ({
          name: p.playerName || p.name || '',
          pos: p.positionName || p.pos || '',
          order: p.batorder || p.battingOrder || 0,
          hitRate: p.seasonRt || '0.000'
        }))
        .sort((a, b) => a.order - b.order)
    });

    console.log(`✅ [Lineup] 가공 성공: ${res.gameInfo?.hName} vs ${res.gameInfo?.aName}`);

    return {
      gameId,
      home: transform(homeLineup, res.gameInfo?.hName, res.homeStarter),
      away: transform(awayLineup, res.gameInfo?.aName, res.awayStarter)
    };
  } catch (error) {
    console.error(`❌ [Lineup Error] ${error.message}`);
    return null;
  }
}

module.exports = scrapeLineup;