# UAGENT Fair Mint / UANENT

Static front-end for the UAGENT × Binance Agent ID fair mint page.

## Current product parameters

- Base mint price: `0.002 BNB / share`
- Liquidity allocation: `80%`
- Multi-signature wallet allocation: `20%`
- Network: BNB Smart Chain
- Launch model: 7-day fair mint, max 10 shares per address, UUSD liquidity, minting permanently closes when trading opens.
- Tier algorithm: 353 generated tiers, with `1U = 0.002 BNB`; tier 1 covers 0–10,000 shares, tiers 2–181 add 1,000 shares per tier, tiers 182–353 add 20,000 shares per tier; max is `8.07U = 0.01614 BNB`.

The wallet flow is a demo interaction only. No real transaction is submitted from this page.

## Run locally

```bash
python3 -m http.server 49152
```

Open <http://localhost:49152>.
