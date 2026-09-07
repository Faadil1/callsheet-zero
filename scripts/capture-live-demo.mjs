import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const out = process.env.CAPTURE_DIR || 'public/live-capture';
await fs.mkdir(out, {recursive:true});
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1920,height:1080}, deviceScaleFactor:1});
await page.goto('https://callsheet-zero.vercel.app', {waitUntil:'networkidle', timeout:60000});
await page.screenshot({path:`${out}/01-landing.png`});
await page.locator('#runBtn').click();
await page.waitForFunction(() => document.querySelector('#viewMode')?.textContent?.includes('LIVE RUNNING'), null, {timeout:15000});
await page.screenshot({path:`${out}/02-live-running.png`});
await page.waitForFunction(() => !document.querySelector('#runBtn')?.hasAttribute('disabled'), null, {timeout:60000});
await page.screenshot({path:`${out}/03-live-result.png`});
await page.locator('#replayBtn').click();
for (let i=0;i<5;i++){await page.locator(`[data-step="${i}"]`).click(); await page.waitForTimeout(250); await page.screenshot({path:`${out}/replay-${i+1}.png`});}
await page.locator('#adaptionReceipt').scrollIntoViewIfNeeded(); await page.screenshot({path:`${out}/09-adaption.png`});
await page.locator('.receipt-link').first().scrollIntoViewIfNeeded(); await page.screenshot({path:`${out}/10-receipt.png`});
await browser.close();
