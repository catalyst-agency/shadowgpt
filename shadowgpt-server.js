const express = require('express');
const { chromium } = require('playwright');

const app = express();
app.use(express.json());

let page;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: 'auth.json' });
  page = await context.newPage();

  await page.goto('https://chat.openai.com');
  console.log('🤖 ShadowGPT is online');
})();

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    await page.fill('textarea', prompt);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.markdown', { timeout: 20000 });

    const response = await page.$eval('.markdown', el => el.innerText);
    res.json({ reply: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🛰️ Listening on port 3000'));
