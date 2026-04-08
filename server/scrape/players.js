const puppeteer = require('puppeteer');

async function scrapeAllPlayers() {
    console.log("🚀 [Scraper] 크롬 브라우저 실행 중...");
    const browser = await puppeteer.launch({ 
        headless: "new", // 속도를 위해 다시 new로 변경 (창 보고 싶으면 false)
        args: ['--window-size=1400,1000'] 
    });
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');

    try {
        console.log("🔗 [KBO] 등록 선수 페이지 접속 중...");
        await page.goto('https://www.koreabaseball.com/Player/Register.aspx', { waitUntil: 'networkidle2' });
        console.log("✅ [KBO] 페이지 로드 완료!");

        const teamConfigs = [
            { name: 'SSG', alt: 'SSG' }, { name: 'KT', alt: 'KT' }, { name: 'NC', alt: 'NC' },
            { name: '삼성', alt: '삼성' }, { name: 'LG', alt: 'LG' }, { name: '한화', alt: '한화' },
            { name: '키움', alt: '키움' }, { name: '두산', alt: '두산' }, { name: '롯데', alt: '롯데' },
            { name: 'KIA', alt: 'KIA' }
        ];

        const allTeamData = {}; // { 'SSG': [...], 'KT': [...] }

        for (const team of teamConfigs) {
            console.log(`📡 [KBO] ${team.name} 구단 클릭 시도...`);

            // 1. 엠블럼 클릭
            await page.evaluate((altText) => {
                const imgs = Array.from(document.querySelectorAll('img'));
                const target = imgs.find(img => img.alt && img.alt.includes(altText));
                if (target) {
                    const parentLink = target.closest('a');
                    if (parentLink) parentLink.click();
                    else target.click();
                }
            }, team.alt);

            // 2. 데이터 로딩 대기
            console.log(`⏳ [KBO] ${team.name} 데이터 로딩 대기 (5초)...`);
            await new Promise(resolve => setTimeout(resolve, 5000));

            // 3. 테이블 데이터 파싱
            const players = await page.evaluate(() => {
                const results = [];
                const allRows = Array.from(document.querySelectorAll('tr'));
                let currentType = "미분류";

                allRows.forEach(row => {
                    const tds = Array.from(row.querySelectorAll('td'));
                    const ths = Array.from(row.querySelectorAll('th'));

                    // 섹션 헤더 감지 (투수, 타자 등)
                    if (ths.length > 0) {
                        const headerText = ths[1] ? ths[1].innerText.trim() : "";
                        if (headerText && !headerText.includes('성명')) currentType = headerText;
                    }

                    // 데이터 행 추출
                    if (tds.length === 5) {
                        const name = tds[1].innerText.trim();
                        if (name && name !== '성명' && !name.includes('데이터가')) {
                            results.push({
                                posType: currentType,
                                backNum: tds[0].innerText.trim(),
                                name: name,
                                position: tds[2].innerText.trim(),
                                birth: tds[3].innerText.trim(),
                                physical: tds[4].innerText.trim()
                            });
                        }
                    }
                });
                return results;
            });

            allTeamData[team.name] = players;
            console.log(`✅ [KBO] ${team.name} 추출 성공: ${players.length}명`);
        }

        console.log("🏁 [Scraper] 전 구단 수집 작업 완료!");
        return allTeamData;

    } catch (error) {
        console.error("❌ [Scraper Error]:", error.message);
        return null;
    } finally {
        await browser.close();
    }
}

module.exports = scrapeAllPlayers;