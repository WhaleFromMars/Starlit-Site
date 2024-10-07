# StarlitSite
Current Inactive:
We are working on private repos/mods under the StarlitMC organisation
The postgresql server this website relies on is no longer active
Unstable version is hosted via vercel at www.starlitmc.com
The store page will load data/products from stripe, products wont populate to a basket
sign in will fail to validate against our database as its not alive rn

## TODO

- [x] Scaffold base UI with mock data
    - [x] Main Navigation
    - [ ] Store
        - [ ] Navigation
        - [x] Categories
        - [x] Items
    - [ ] Vote
    - [ ] News
- [x] setup database (via supabase) self hosted (not currently)
- [x] connect to database
- [ ] setup error management (sentry)
- [ ] setup analytics (plausible)
- [ ] rate limiter (upstash)
