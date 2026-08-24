#!/usr/bin/env node
/* Shoots tools/og.html into img/og.png — the 1200x630 social card.
 *
 * Playwright is not a dependency of this repo; it is already installed
 * in the game repo next door, which is where the screenshots in img/
 * come from too. Point PLAYWRIGHT_ROOT at another checkout if yours
 * lives somewhere else.
 *
 * Run:  node tools/og.mjs
 */
'use strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const ROOT = path.resolve(HERE, '..');
const PW = process.env.PLAYWRIGHT_ROOT
  || path.resolve(ROOT, '..', 'sunbird', 'node_modules', 'playwright', 'index.mjs');

const { chromium } = await import(pathToFileURL(PW).href);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(HERE, 'og.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
const out = path.join(ROOT, 'img', 'og.png');
await page.screenshot({ path: out });
await browser.close();
console.log('wrote', out);
