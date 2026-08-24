# sunbird-game

The public website for **Sunbird**, a one-tap flying game — and the host
for the privacy policy both app stores require to be reachable before
review.

```
index.html          the landing page
privacy/index.html  the privacy policy
404.html            a miss at any depth, so its paths are root-absolute
style.css           the whole design system, one file, no framework
site.js             nav frosting, the small-screen menu, scroll reveals
img/                screenshots and brand art, copied from the game repo
img/og.png          the social card, generated — see below
robots.txt          + sitemap.xml
tools/og.html       the source of img/og.png
tools/og.mjs        shoots that template at 1200x630
```

## Rules this site is held to

**The privacy policy is not authored here.** `store/PRIVACY.md` in the
(private) game repository is the source of truth. When it changes, this
page has to be regenerated and pushed in the same sitting: the store
listing points here, and a policy that disagrees with the app is a
review problem.

**The screenshots are not authored here either.** Everything in `img/`
except `og.png` comes from `npm run screenshots` and `npm run icons` in
the game repo, drawn by the shipping renderer. Copy them across after a
visual change rather than editing them — the captions on the landing
page describe what is actually in each frame, so a stale image makes the
copy wrong too.

**The palette is the game's palette.** Every colour in `style.css` is
lifted from `www/src/core/catalogue.js` — the night sky keyframe, the
robin's body and beak, and the six skins listed in the Roost section.
The header comment in that file says which is which.

## Regenerating the social card

`img/og.png` is what Slack, WhatsApp, X and Google show when the site is
shared. It is a screenshot of a page rather than a hand-made image, so
it can be rebuilt after any copy or palette change:

```sh
node tools/og.mjs
```

That needs Playwright, which this repo does not depend on — it borrows
the copy already installed in the game repo next door. Point
`PLAYWRIGHT_ROOT` at another checkout if yours lives somewhere else.

## Publishing

GitHub Pages, from `main`, at **https://sunbird.tridesetri.com** — a
Cloudflare CNAME to `obrana-boranija.github.io`, **DNS only** (no orange
cloud): proxying it stops GitHub from renewing the Let's Encrypt
certificate. `.nojekyll` is what keeps Pages from running the files
through Jekyll on the way out.

© 2026 Tridesetri doo Beograd
