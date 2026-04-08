const axios = require('axios');

async function scrapeTeamStandings() {
    try {
        const url = 'https://api-gw.sports.naver.com/statistics/categories/kbo/seasons/2026/teams?gameType=REGULAR_SEASON';
        
        console.log("📡 네이버 API 호출 중...");
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // 💡 보내준 JSON 구조: response.data.result.seasonTeamStats
        const stats = response.data && response.data.result && response.data.result.seasonTeamStats;

        if (!stats || !Array.isArray(stats)) {
            console.log("⚠️ 네이버에서 seasonTeamStats 리스트를 찾지 못했습니다.");
            return [];
        }

        // 네이버 필드명과 우리 DB 필드명 매칭
        return stats.map(t => ({
            rank: t.ranking,                // ranking
            teamName: t.teamName,           // teamName (SSG, KT 등)
            matches: t.gameCount,           // gameCount
            win: t.winGameCount,            // winGameCount
            lose: t.loseGameCount,          // loseGameCount
            draw: t.drawnGameCount,         // drawnGameCount
            winRate: t.wra.toFixed(3),      // wra (0.778 등)
            gameDiff: t.gameBehind.toString(), // gameBehind (0.0)
            streak: t.continuousGameResult, // continuousGameResult (1패, 2승 등)
            lastTen: t.lastFiveGames        // 최근 5경기 데이터뿐이라 일단 이걸로 대체
        }));

    } catch (error) {
        console.error("❌ [Standings Scrape Error]:", error.message);
        return [];
    }
}

module.exports = scrapeTeamStandings;