# Sawa Academy

AI-powered technology learning platform for Cloudflare Workers.

## Deployment

Connect this repository to Cloudflare Workers and configure the values listed in `.env.example`.

Required for the core platform:
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL`
- `ADMIN_EMAIL`

Required for AI tutoring, assessments and the AI Course Studio:
- `AI_API_BASE_URL`
- `AI_API_KEY`
- `AI_MODEL`

Card checkout remains disabled until a bank integration is ready. When the bank provides its merchant API credentials, configure the `BANK_*` values and set `PAYMENTS_ENABLED=true`.

The database schema and starter course catalogue initialize automatically on the first database-backed request.

### Cloudflare build

```bash
npm install
npm run deploy
```
