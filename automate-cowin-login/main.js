const puppeteer = require('puppeteer');

const loginToCoWin = async (portalUrl, phoneNumber) => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-maximized', '--force-device-scale-factor=0.75']
    });
    // const browser = await puppeteer.launch({executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe' });
    const page = await browser.newPage();

    try {
        page.setViewport({
            width: 2560,
            height: 1440,
        });
        await page.goto(portalUrl);

        await page.waitForSelector('input[appmobilenumber]');

        await page.type('input[appmobilenumber]', phoneNumber);

        await page.waitForTimeout(1000);

        await page.waitForSelector('ion-button');

        await page.click('ion-button');

        await page.waitForSelector('input[formcontrolname="otp"]');
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
            document.querySelector('input[formcontrolname="otp"]').focus();
        });

        await page.waitForSelector('.dose-data ion-col:nth-child(2) a', {
            timeout: 0,
        });

        // await page.waitForTimeout(1000);
        await page.evaluate(() => {
            const scheduleButton = document.querySelectorAll('.dose-data ion-col:nth-child(2) a');
            Array.from(scheduleButton).forEach((item) => item.click());
        });
        
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            document.querySelector('ion-button').click();
        });
        
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            document.querySelector('.status-switch').click();
        });

        await page.waitForTimeout(100);
        await page.evaluate(() => {
            document.querySelector('mat-form-field.search-select mat-select').click();
        });

        await page.waitForTimeout(100);
        await page.evaluate(() => {
            document.querySelector('#mat-option-16').click();
        });

        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            document.querySelector('mat-form-field.pin-search mat-select').click();
        });

        await page.waitForTimeout(100);
        await page.evaluate(() => {
            Array.from(document.querySelectorAll('.mat-select-panel-wrap mat-option')).find((item) => item.textContent == ' BBMP ').click();
        });

        await page.waitForTimeout(100);
        await page.evaluate(() => {
            document.querySelector('.district-search').click();
        });

        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            document.querySelector('#c1').click();
        });

        let interval = setInterval(async () => {
            await page.evaluate(() => {
                if (document.querySelector('.time-slot-list ion-button.time-slot')) {
                    clearInterval(interval);
                }
                if (!document.querySelector('#c1').checked) {
                    document.querySelector('#c1').click();
                }
            });
        }, 500);

        await page.waitForSelector('.time-slot-list ion-button.time-slot', {
            timeout: 0,
        });

        await page.waitForTimeout(100);
        await page.evaluate(() => {
            document.querySelector('.time-slot-list ion-button.time-slot').click();
            document.querySelector('input[type="text"]').focus();
        });

        // await page.waitForSelector('ion-button');

        // await page.click('ion-button');
        
        // await page.evaluate(() => {
        //     const portalNavElement = document.querySelector('portal-nav');
        //     portalNavElement.shadowRoot.querySelector('a[data-cy="nav-tile-actions"]').click();
        // })

        // await page.click('a[data-cy="tenant-change"]');

        // await page.evaluate(() => {
        //     document.querySelector('input[data-cy="tenant"]').value = '';
        // });

        // await page.type('input[data-cy="tenant"]', 'Host');

        // await page.type('input[data-cy="phoneNumber"]', phoneNumber);

        // await page.click('button[data-cy="login-btn"]');

        // await page.waitForSelector('.sidenav-container');
        //  // .then(() => console.log('Identity Loaded'));

        // await page.click('a[href="/identity/admin/access-token"]');

        // await page.waitForSelector('button[data-cy="access-token-generate-button"]');

        // await page.click('button[data-cy="access-token-generate-button"]');

        // let installationAccessToken = '';

        // while (true) {

        //     installationAccessToken = await (await page.$('input[data-cy="access-token-generated"]')).evaluate((htmlElement) => htmlElement.value);
        //     if (installationAccessToken.length) {
        //         break;
        //     }
        // };

        // // // await page.screenshot({ path: 'example.png' });

        // // await browser.close();

        // console.log(installationAccessToken);

        // return installationAccessToken;
    } catch (error) {
        await page.screenshot({ path: `${phoneNumber}.png` });
        // await browser.close();
        console.log(error);
        // console.log('Error, trying again', portalUrl, phoneNumber);
        // return await loginToCoWin(portalUrl, phoneNumber);
    }
}


(async () => {
    console.log((new Date()).toLocaleTimeString());
    var [phoneNumber] = process.argv.slice(2);
    await loginToCoWin('https://selfregistration.cowin.gov.in/', phoneNumber);
})();

/*
Example
node main.js 7299279218
*/
