# Deployment Guide

## Prerequisites

- Cloudflare Account (free or paid)
- GitHub Account
- Node.js installed locally

## Step 1: Cloudflare Setup

### 1.1 Create Cloudflare Account
Visit [cloudflare.com](https://www.cloudflare.com) and sign up for a free account.

### 1.2 Create API Token
1. Go to Cloudflare Dashboard → Account Settings → API Tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template
4. Grant permissions for:
   - Account.Workers Scripts & Routes
   - Account.Workers KV
   - Account.Pages
5. Copy the token

### 1.3 Get Account ID
1. Go to any Cloudflare page
2. Look at the URL: `https://dash.cloudflare.com/[ACCOUNT_ID]/`
3. Copy your Account ID

### 1.4 Create KV Namespace
1. Dashboard → Workers → KV
2. Click "Create namespace"
3. Name it: `counter-kv` (for production)
4. Copy the namespace ID

## Step 2: GitHub Setup

### 2.1 Fork the Repository
```bash
# Fork from https://github.com/okutachiblessing/personal_portfolio
git clone https://github.com/[YOUR-USERNAME]/personal_portfolio
cd personal_portfolio
```

### 2.2 Add GitHub Secrets
1. Go to your repository → Settings → Secrets and Variables → Actions
2. Add the following secrets:

```
CLOUDFLARE_API_TOKEN: <your_api_token>
CLOUDFLARE_ACCOUNT_ID: <your_account_id>
VITE_API_URL: https://api.example.com
VITE_WORKER_URL: https://worker.example.com
VITE_CORS_ORIGIN: https://yourportfolio.com
```

### 2.3 Enable GitHub Actions
1. Go to Settings → Actions → General
2. Ensure "Allow all actions and reusable workflows" is selected

## Step 3: Update Configuration

### 3.1 Update wrangler.toml
```toml
name = "visitor-counter"
main = "src/worker/index.js"
compatibility_date = "2024-01-01"

[env.production]
vars = { ENVIRONMENT = "production" }
kv_namespaces = [
  { binding = "COUNTER_KV", id = "YOUR_KV_NAMESPACE_ID" }
]
```

### 3.2 Update .env.local
```env
VITE_API_URL=https://api.example.com
VITE_WORKER_URL=https://worker.example.com
VITE_CORS_ORIGIN=https://yourportfolio.com
VITE_ENVIRONMENT=production
```

## Step 4: Deploy Steps

### 4.1 Initial Local Build
```bash
npm install
npm run build
```

### 4.2 Cloudflare Pages Project
1. Dashboard → Pages
2. Click "Create a project"
3. Select "Connect to Git" → Select your repository
4. Framework preset: "Vite"
5. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Add environment variables:
   - `VITE_API_URL`
   - `VITE_WORKER_URL`
   - `VITE_CORS_ORIGIN`
7. Deploy

### 4.3 Deploy Worker
```bash
npm run worker:deploy
```

### 4.4 Auto-Deployment via GitHub
Push to main branch:
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

GitHub Actions will automatically:
1. Build the project
2. Run security checks
3. Deploy to Cloudflare Pages
4. Deploy Cloudflare Worker

## Step 5: Post-Deployment Verification

### 5.1 Check Pages Deployment
1. Dashboard → Pages → blessing-portfolio
2. Verify build is successful
3. Visit the deployment URL

### 5.2 Check Worker Deployment
1. Dashboard → Workers → visitor-counter
2. Test endpoints:
   - GET `/health` - Should return healthy
   - POST `/visitors` - Should increment count
   - GET `/visitors` - Should return current count

### 5.3 Test Visitor Counter
1. Visit your portfolio site
2. Check browser console for visitor counter request
3. Verify count displays in bottom-right corner

### 5.4 Verify Security Headers
```bash
# Using curl
curl -I https://yourportfolio.com

# Check for:
# x-content-type-options: nosniff
# x-frame-options: DENY
# x-xss-protection: 1; mode=block
```

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain
1. Pages project → Custom domains
2. Add your domain
3. Update DNS records as instructed

### 6.2 DNS Configuration
For namesake delegation:
```
Nameserver 1: blake.ns.cloudflare.com
Nameserver 2: milo.ns.cloudflare.com
```

## Step 7: Monitoring & Maintenance

### 7.1 View Analytics
- Pages: Dashboard → Pages → Analytics
- Workers: Dashboard → Workers → Analytics

### 7.2 Monitor Logs
```bash
# View worker logs
wrangler tail --env production

# View pages build logs
# Check in Pages project → Deployments
```

### 7.3 Update Dependencies
```bash
npm update
npm audit fix
git push origin main  # Triggers automatic redeploy
```

## Troubleshooting

### Issue: Deploy fails with authentication error
**Solution**: Verify Cloudflare API token and Account ID in GitHub secrets

### Issue: Visitor counter not working
**Solution**: 
1. Check KV namespace exists
2. Verify KV namespace ID in wrangler.toml
3. Check Worker logs: `wrangler tail`

### Issue: 404 on contact form submission
**Solution**:
1. Verify API endpoint is configured
2. Check CORS origin matches
3. Review Worker logs for errors

### Issue: Build fails with missing dependencies
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Rollback

If deployment goes wrong:

### Rollback Pages
1. Pages project → Deployments
2. Click on previous working deployment
3. Click "Rollback to this deployment"

### Rollback Worker
```bash
# Revert to previous version
wrangler rollback
```

## Performance Optimization

### Enable Caching
1. Pages project → Settings
2. Adjust cache rules for better performance
3. Set browser cache TTL

### Minification & Compression
Already configured in vite.config.js and automatic in Cloudflare

### Image Optimization
- Use next-gen formats (WebP)
- Compress before uploading
- Use Cloudflare Image Optimization

## Costs

**Cloudflare Free Plan Includes:**
- ✅ Unlimited Pages deployments
- ✅ 100,000 Worker requests/day
- ✅ 1GB KV storage
- ✅ Custom domains
- ✅ Unlimited bandwidth

**Additional Costs:**
- Workers: $0.50/million requests after free tier
- KV: Storage and operations (very affordable)

## Support

- [Cloudflare Docs](https://developers.cloudflare.com)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vite Docs](https://vitejs.dev)

---

Deployment should be complete! Visit your portfolio at the Pages URL or custom domain.
