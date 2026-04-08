const axios = require('axios');

async function scrapeTodayMatches(dateStr) {
  // 💡 수정포인트 1: fields에 %2Cvictory 를 추가해서 승패 투수 정보를 요청함
  const url = `https://api-gw.sports.naver.com/schedule/games?fields=basic%2Cschedule%2Cbaseball%2CmanualRelayUrl%2Cvictory&upperCategoryId=kbaseball&fromDate=${dateStr}&toDate=${dateStr}&size=500`;

  try {
    console.log(`[${dateStr}] 네이버 API에서 데이터를 가져오는 중...`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const data = response.data;
    
    if (data.code !== 200 || !data.success) {
      console.error("데이터를 불러오는데 실패했습니다.");
      return [];
    }

    const rawGames = data.result.games;
    const kboMatches = [];

    rawGames.forEach(game => {
      if (game.categoryId === 'kbo') {
        
        let mappedStatus = '';
        if (game.statusCode === 'BEFORE') mappedStatus = 'sched';
        else if (game.statusCode === 'PLAYING') mappedStatus = 'live';
        else mappedStatus = 'done';

        // 💡 수정포인트 2: 네이버 API 구조상 승패 투수는 game.victory 객체 안에 있음
        // 만약 victory 객체가 없으면 예비로 game.winPitcherName 등을 체크
        const winP = game.victory ? game.victory.winPitcherName : (game.winPitcherName || '');
        const loseP = game.victory ? game.victory.losePitcherName : (game.losePitcherName || '');

        kboMatches.push({
          matchId: game.gameId,
          status: mappedStatus,
          time: game.gameDateTime.split('T')[1].substring(0, 5),
          inning: game.statusInfo,
          stadium: game.stadium,
          winPitcher: winP, 
          losePitcher: loseP,
          home: {
            name: game.homeTeamName,
            pitcher: game.homeStarterName || '',
            score: game.homeTeamScore || 0
          },
          away: {
            name: game.awayTeamName,
            pitcher: game.awayStarterName || '',
            score: game.awayTeamScore || 0
          }
        });
      }
    });

    // 💡 로그에서 투수 이름이 잘 나오는지 확인해봐!
    console.log(`✅ [${dateStr}] 정제 완료 (첫 번째 경기 승투: ${kboMatches[0]?.winPitcher || '없음'})`);
    
    return kboMatches;

  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    return [];
  }
}

module.exports = scrapeTodayMatches;