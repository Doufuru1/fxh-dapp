# BIBI Agent ID Mint

Static front-end for the BIBI × Binance Agent ID launch page.

## Current product parameters

- Base mint price: `0.002 BNB / share`
- Liquidity allocation: `85%`
- Multi-signature wallet allocation: `15%`
- Network: BNB Smart Chain
- Tier algorithm: 353 generated tiers, with `1U = 0.002 BNB`; tier 1 covers 0–10,000 shares, tiers 2–181 add 1,000 shares per tier, tiers 182–353 add 20,000 shares per tier; max is `8.07U = 0.01614 BNB`.

The wallet flow is a demo interaction only. No real transaction is submitted from this page.

## Run locally

```bash
python3 -m http.server 49152
```

Open <http://localhost:49152>.
