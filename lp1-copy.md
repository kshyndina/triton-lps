# LP1 — Full copy ($25 promo)

Live URL: https://kshyndina.github.io/triton-lps/lp1.html

---

## Top bar / sticky nav

**Nav links** (sticky nav, appears after scroll past hero)
- Use cases
- Why Triton
- Who it's for
- What's included
- Get started
- Build your stack
- FAQ

**CTAs** (both top bar and sticky nav)
- Contact sales
- Start building with $25

---

## Hero

**H1**
Get the full Triton stack for $25 at [event]

**Sub**
Fund your balance with $25 and access every Triton product for 12 months.

**Email pill**
- Placeholder: you@team.com
- Button: Start building with $25

**Live tracker (right side)**
- Big counter: 1,269,760
- Label: Requests served, last 60s
- Feed rows:
  - Account update batch · 744 accounts · just now
  - Stream subscriber joined · ams-1 · just now
  - RPC request batch · 665 requests · just now
  - gRPC client connected · sgp-1 · just now
  - Account update batch · 681 accounts · just now

**Testimonials strip (4 cards below hero)**
- rampa (@rampa_cash): Triton is one of the strongest performance stacks in Web3, and their best-in-class RPC layer will help us deliver a faster, more reliable experience for our users on @solana
- Corbits (@corbits_dev): We turned up our Corbits Monad Facilitator a notch with @triton_one RPC
- xAxios AI (@xaxiosai_new): Pump Guard was built entirely thanks to @triton_one. It's incredibly fast, and the system has been running 24/7 without a single issue so far
- Bondum (@Bondum_App): When infrastructure is done right, it disappears. All systems running on Triton

---

## Every Solana use case (capability tabs)

**H2**
Every Solana use case, covered by premium infrastructure

**Sub**
Every Triton product lands in one of four buckets. Pick the tab to see what your balance covers in each.

**Tabs**: Streaming · History · Accounts · Send transactions

### Streaming (default open)

**H3**
Low-latency, reliable real-time streaming

**Body**
Built on Yellowstone, the open-source gRPC layer Triton authors. Pick one or run them in parallel on the same auth.

**Bullets**
- Account Sync for teams that want streaming benefits without integrating streaming
- Deshred transactions, pre-execution intent ~20ms faster than standard gRPC at p90
- Dragon's Mouth gRPC for sub-slot updates on accounts, transactions, slots, and blocks
- Whirligig real-time updates, improved WebSockets backed by gRPC, stable transactionSubscribe
- Fumarole persistent streams with 96h cursor resume and at-least-once delivery

**CTA**: Start building with $25

### History

**H3**
Full Solana ledger, queryable in milliseconds

**Body**
Hydrant rebuilds Solana history on ClickHouse. Every standard JSON-RPC method, every epoch, same flat pricing.

**Bullets**
- Single-call wallet history via getTransactionsForAddress with ATAs server-side
- Old Faithful streams to replay every block from genesis through the same gRPC interface as live
- Sub-1ms reads on the most recent slots through the in-memory head cache
- Bidirectional sorting and native cursor pagination for seamless resumes over large batches
- Slot range parameters scope reads to exactly the window you need for fastest response

**CTA**: Learn more about Hydrant

### Accounts

**H3**
Indexed account reads on shared infrastructure

**Body**
Steamboat replaces Agave's full-state scans with custom Postgres indexes. Same per-call pricing as standard RPC whether your query hits an index or falls back to a scan.

**Bullets**
- Custom indexes for getProgramAccounts on shared infrastructure, no dedicated node required
- Token-account hot paths for owner, delegate, and mint indexed out of the box
- Auto-indexed from your traffic, no manual setup, no index requests to file
- Immediate startup bootstrapped from a Solana snapshot, every query resolves from day one
- Same per-call price as standard RPC, no premium for indexed reads

**CTA**: Learn more about Steamboat

### Send transactions

**H3**
Direct-to-leader sending, built for reliability

**Body**
Yellowstone Jet routes every sendTransaction direct to the leader over QUIC, with leader scheduling and stake-weighted bandwidth.

**Bullets**
- Leader scheduling, connection pooling, and retries handled by the engine
- Stake-weighted routing via Triton-operated validators
- Yellowstone Shield MEV-protection integrated, custom rules and policies you configure
- Priority Fees API with tail-aware percentiles paired on the send path
- Jito bundle support for atomic execution and tipping

**CTA**: Learn more about Jet

---

## Why teams move to Triton (6 cards, 2×3)

**H2**
Why teams move to Triton

**Sub**
What the largest Solana apps run on. Same fleet, same support, same pricing for everyone.

### Card 1: Original Solana validator since testnet
- Authored Yellowstone, the open-source Geyser plugin most of Solana streams from
- Continuous production track record across every Solana upgrade
- Operate validators that ingest shreds directly into the streaming layer

### Card 2: Direct line to senior engineers
- Shared Slack or Telegram with the engineering team on every endpoint
- 24/7 incident response across regions
- Query tuning, configuration help, and urgent fixes at no extra charge

### Card 3: Open-source by default, zero vendor lock-in
- AGPL-licensed core products across streaming, history, and accounts
- Drop-in compatible with standard Solana JSON-RPC and gRPC clients
- Self-host on commodity hardware or run on Triton, same code

### Card 4: Predictable pricing across every product
- $0.08 per GB bandwidth across the entire stack
- Same per-call rate for fresh and historical methods
- No tier-jump pricing for higher rate limits

### Card 5: Premium RPCs, global distribution, advanced routing
- GeoDNS routing with automatic failover
- 10 PoPs across North America, Europe, and Asia-Pacific
- Dedicated streaming clusters isolated from general RPC traffic

### Card 6: Abuse protection with flexible limits
- Access controls, origin allowlists, request fingerprinting
- Flexible RPS and connection limits on every subscription
- No tier-gated throttling that blocks legitimate traffic

---

## Triton powers the teams defining Solana (audience marquee)

**H2**
Triton powers the teams defining Solana

**Sub**
Since the start of Solana DeFi.

**Filter chips**
All · Trading & MEV · DeFi & DEXs · Wallets & custodians · Indexers & analytics · NFTs & gaming · Infrastructure & validators

**Logos** (categorised below — multi-category for ones that appear in multiple filters)

**Trading & MEV**
Wintermute · Binance · Bitfinex · BONK · BONKbot · Cube Exchange · Jito Labs · Shuriken · Trojan Bot · Moonshot

**DeFi & DEXs**
Jupiter · Sanctum · Raydium · Orca · Meteora · Kamino · Drift · Adrena · Alpha.fi · Cetus · Circular Fi · deBridge · Flash · Hubble · PancakeSwap · Rain.fi · Ranger Finance · Solend · Wormhole · Zeta

**Wallets & custodians**
Jupiter · Moonshot · Phantom · Solflare · Squads · Streamflow · SwissBorg · Dialect · Moongate · Tensor

**Indexers & analytics**
Jupiter · Birdeye · Block Logic · Corbits · Defi Tuna · Ergonia · Pyth · Switchboard · ABK Labs · Arcium · Metaplex · MetEngine · Validators.app

**NFTs & gaming**
Jupiter · Metaplex · Tensor · Star Atlas · Moongate

**Infrastructure & validators**
Marinade · Jupiter · Jito Labs · DoubleZero · N1 · Validators.app · Colosseum · MtnDAO · MonkeDAO · Superteam DAO · Meta DAO · Pyth · Wormhole

---

## What's included for $25 (ultra-block + product scroller)

**H2**
What's included for $25

**Sub**
Your balance unlocks every Triton product on every subscription, valid for 12 months. One auth, one bill, one balance across the full stack.

**Left card title**
One subscription. All the features.

**Left card body**
Stream real-time and historical data at max throughput, index real-time with 4-day rolling cache and data guarantees, query accounts through custom indexes and history reliably and affordably, send protected transactions, simulate bundles, and more.

**Left card CTA**: Start building with $25

**16 product cards (right scroller)**

1. **Standard RPC** — Solana JSON-RPC over HTTP/3 QUIC. Every standard method delivered up to 2x faster than HTTPS transport, served from 20+ regional bare-metal nodes.
2. **Steamboat** — Custom indexes for getProgramAccounts on shared infrastructure, up to 20x faster than full Agave scans. Token-account hot paths for owner, delegate, and mint included.
3. **Account Sync** — Streaming-backed local cache for account reads. Sub-slot freshness from your existing polling code via a one-line SDK swap.
4. **Hydrant** — ClickHouse rewrite of Solana history, tuned to how devs query the chain. Up to 38x faster at p50, sub-1ms head cache, single-call wallet history.
5. **Dragon's Mouth gRPC** — Sub-slot real-time updates via gRPC, built and maintained by Triton. The Solana streaming standard.
6. **Whirligig WebSockets** — Drop-in for native Solana WebSockets, backed by gRPC. Stable transactionSubscribe and intra-slot account updates.
7. **Fumarole reliable streams** — Redundant streaming layer with 96h of stored data, cursor resume, and at-least-once delivery.
8. **Deshred transactions** — Pre-execution transactions reconstructed from raw shreds, ~20ms faster than standard gRPC at p90.
9. **Old Faithful streams** — Replay every block from genesis through the same gRPC interface as live streams.
10. **Yellowstone Jet** — Direct-to-leader forwarding over QUIC with leader scheduling, connection pooling, and retries.
11. **Jito bundles** — Atomic transaction bundles with MEV protection. Submit directly to block engines or via Triton's routing layer.
12. **DAS API** — Fastest read for NFT and cNFT ownership, proofs, and metadata. Dedicated DAS clusters handling billions of requests per day.
13. **ZK Compression** — Photon-backed reads for compressed accounts, cNFTs, and validity proofs via Light Protocol indexes.
14. **Priority Fees API** — Smart fee estimation with tail-aware percentiles for reliable landing.
15. **Metis swap API** — Swap routing across 20+ DEXes with exact-out and platform-fee support.
16. **Titan swap API** — Streaming quotes via DART live re-optimisation or Prime API for high-volume desks.

Every card CTA: View docs →

---

## Three steps to a working endpoint

**H2**
Three steps to a working endpoint

**Sub**
Self-onboarding takes around 2 minutes. Your existing calls return faster the moment you swap your URL.

**Step 1: Fill out the onboarding form**
On customers.triton.one. Takes a minute. We provision your endpoint and credentials right after.

**Step 2: Fund your balance with $25 in stablecoins**
Valid for 12 months and usable across every Triton product on Mainnet. Devnet is free.

**Step 3: Swap your RPC URL**
Running on the same bare-metal fleet powering the largest Solana DEXs and wallets. No code changes needed.

**CTA below the 3 cards**: Start building with $25

---

## Build your stack (wizard)

**Left intro card**

H2: Build your stack
Body: Four questions, around 60 seconds. We pre-configure the right products, rate limits, and region for your workload.

Bullets:
- Answers route straight to senior engineering
- Pre-tuned endpoint ready in under 2 minutes from submission
- Recommendations cover streaming, history, accounts, and sending

Stats (2×2 grid below bullets):
- 99.99% — Uptime across regions
- 20x — Faster gPA with custom indexes
- <1ms — Recent Solana history reads
- 10 — PoPs on three continents

**Wizard right side**

### Step 1 of 4: What are you working on?
Pick the closest match. We'll tailor the recommendation.

- A lending, DEX or DeFi protocol — AMM, perps, lending, structured products
- A portfolio dashboard, wallet or custodian — Consumer wallet, portfolio tracker, custody
- An indexer or data project — Analytics, dashboards, pipelines
- An NFT or collectibles app — Marketplace, gallery, minting
- Infrastructure others depend on — Platform, SDK, B2B infra
- Something else — Tell us in the next step

### Step 2 of 4: What's most important in real-time data for you?
We'll set up the right streaming products if so.

- Intra-slot `processed` updates over gRPC — Trading, MEV, copy trading
- Pre-execution transactions — Earliest on-chain signal for trading
- Low-latency WebSockets — Browser compatibility
- Reliability and 100% completeness over raw speed — Indexer, analytics, compliance
- No streaming — Standard RPC only
- Not sure yet — Skip for now

### Step 3 of 4: Do you need historical data?
Hydrant is included on every plan. We'll pre-tune the right methods.

- Wallet transaction history — getTransactionsForAddress, getSignaturesForAddress, getTransaction
- Bulk replay or backfill — Old Faithful streams
- Recent slots only — Head cache
- No history needed — Real-time only

### Step 4 of 4: Your suggested stack
Based on your answers. All included in the $25 deposit.

(Dynamic list — generated from selections, shows product name + 1-line description + unit price for each. Footer: "Unit pricing applies as you consume. Top up anytime.")

**Final CTA**: Start building with $25

---

## FAQ

**H2**
Frequently asked questions

**Sub**
Common questions about the $25 promo, balance, and what's included.

**Q1: Is $25 the deposit or the price?**
It's the deposit, prepaid. You spend it down as you use Triton products at their per-unit rates. Top up anytime, valid for 12 months.

**Q2: How can I top up my deposit?**
From your customer dashboard, any amount, anytime. Top-ups bill at the same per-GB and per-call rates as your initial $25.

**Q3: What happens when I use up my $25?**
We alert you before the balance hits zero. Top up to keep running, or let it lapse. Your endpoint pauses, configuration stays in place for 12 months from your deposit date.

**Q4: Can I pay in stablecoins?**
Yes. USDC on Solana plus standard card and ACH. Stablecoin payments confirm in seconds.

**Q5: What's included for $25?**
Every Triton product on every subscription. Standard RPC, Steamboat, Account Sync, Hydrant, the full streaming suite, Jet, DAS, ZK Compression, Metis, Titan, Priority Fees, Hermes. Unit pricing applies as you consume.

**Q6: Are connection and rate limits flexible?**
Yes, on the high end of what providers offer. Production-tuned defaults. We raise them within hours if you need more. No tier-jump pricing for higher limits.

**Q7: What happens after [event] ends?**
The standard $125 minimum returns for new accounts. Your $25 balance keeps working, top-ups bill at the same per-unit rates as everyone else.

**Q8: Can I use the balance across multiple products at once?**
Yes. One endpoint, one auth, one bill. Run Steamboat for account reads, Dragon's Mouth for streaming, Hydrant for history, and Jet for sending in parallel, all drawing from the same $25.

---

## Footer

© Triton One 2026 · All rights reserved · Terms · Privacy · Cookies

---

## Contact modal (opens from "Contact sales" CTA)

**H2**
Tell us about your stack

**Sub**
We'll get back to you with the best setup for streaming, history, accounts, and sending.

**Form fields**
- Name (required)
- Email (required)
- Telegram handle (optional)
- Project type (required, dropdown): Trading or DeFi · Wallet or consumer · Indexer or data · NFT or collectibles · Infrastructure · Other
- What are you building? (required, textarea, placeholder: "We are building...")

**Submit**: Send
