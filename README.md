# Sawa Academy

AI-powered technology learning platform for Cloudflare Workers.

## Deployment

Connect this repository to Cloudflare Workers and configure the values listed in `.env.example`.

Required for the core platform:
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_SETUP_TOKEN`

Use a strong random `ADMIN_SETUP_TOKEN` of at least 16 characters. After deployment, visit `/setup-admin` once to create the primary administrator account. The bootstrap endpoint refuses further administrator creation after the first admin exists.

Required for AI tutoring, assessments and the AI Course Studio:
- `AI_API_BASE_URL`
- `AI_API_KEY`
- `AI_MODEL`

Card checkout remains disabled until a bank integration is ready. When the bank provides its merchant API credentials, configure the `BANK_*` values and set `PAYMENTS_ENABLED=true`. The bank adapter is isolated in `lib/bank-gateway.ts` so a bank-specific payload can be adjusted without changing the rest of the platform.

The database schema and starter course catalogue initialize automatically on the first database-backed request.

### Cloudflare build

```bash
npm install
npm run deploy
```
