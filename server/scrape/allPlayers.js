const puppeteer = require('puppeteer');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeAllPlayers() {
  const browser = await puppeteer.launch({ 
    headless: "new", 
    args: ['--window-size=1400,1000'] 
  });
  const page = await browser.newPage();
  const url = 'https://www.koreabaseball.com/Player/Search.aspx';

  try {
    console.log("🔍 [KBO] 전 구단 선수 마스터 데이터 수집 시작...");
    await page.goto(url, { waitUntil: 'networkidle2' });

    const teams = [
      { name: 'SSG', value: 'SK' }, { name: 'KT', value: 'KT' }, { name: 'NC', value: 'NC' },
      { name: '삼성', value: 'SS' }, { name: 'LG', value: 'LG' }, { name: '한화', value: 'HH' },
      { name: '키움', value: 'WO' }, { name: '두산', value: 'OB' }, { name: '롯데', value: 'LT' },
      { name: 'KIA', value: 'HT' }
    ];

    const finalResults = [];

    for (const team of teams) {
      console.log(`📡 [${team.name}] 팀 선택 중...`);
      await page.select('#cphContents_cphContents_cphContents_ddlTeam', team.value);
      await delay(2000); 

      let hasNextPage = true;
      let currentPage = 1;

      while (hasNextPage) {
        console.log(`   📄 ${team.name} - ${currentPage}페이지 추출 중...`);

        // 1. 현재 페이지 데이터 파싱
        const teamPlayers = await page.evaluate((teamName) => {
          const rows = Array.from(document.querySelectorAll('.tEx tbody tr'));
          return rows.map(row => {
            const tds = row.querySelectorAll('td');
            if (tds.length < 5) return null;

            const nameTag = tds[1].querySelector('a');
            const name = nameTag ? nameTag.innerText.trim() : tds[1].innerText.trim();
            const href = nameTag ? nameTag.getAttribute('href') : '';
            const playerId = href.includes('playerId=') ? href.split('playerId=')[1] : '';

            return {
              backNum: tds[0].innerText.trim(),
              name: name,
              teamName: teamName,
              position: tds[3].innerText.trim(),
              playerId: playerId,
              birth: tds[4].innerText.trim(),
              physical: tds[5] ? tds[5].innerText.trim() : ''
            };
          }).filter(p => p !== null && p.playerId !== '');
        }, team.name);

        finalResults.push(...teamPlayers);

        // 2. 다음 페이지 버튼 체크 (오타 수정됨 ✅)
        currentPage++;
        const nextPageSelector = `#cphContents_cphContents_cphContents_ucPager_btnNo${currentPage}`;
        
        // 💡 해당 버튼이 존재하는지 확인
        const nextBtn = await page.$(nextPageSelector);

        if (nextBtn) {
          await page.click(nextPageSelector);
          await delay(2000); // 페이지 로딩 시간 조금 더 넉넉히 줌
        } else {
          hasNextPage = false; 
        }
      }
      console.log(`✅ [${team.name}] 수집 완료 (누적: ${finalResults.length}명)`);
    }

    console.log(`🏁 전 구단 선수단 수집 완료! (총 ${finalResults.length}명)`);
    return finalResults;

  } catch (error) {
    console.error("❌ KBO 페이징 스크래핑 에러:", error);
    return [];
  } finally {
    await browser.close();
  }
}

module.exports = scrapeAllPlayers;