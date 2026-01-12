# Getting Started Guide

## 🎯 Quick Setup (5 minutes)

### 1. Prerequisites Check
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

### 2. Install & Run Locally
```bash
# Clone (or your forked version)
git clone https://github.com/okutachiblessing/personal_portfolio.git
cd personal_portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser!

## 📝 Personalization (10 minutes)

### 1. Update Hero Section
Edit [src/components/Hero.jsx](src/components/Hero.jsx):
```javascript
- Change "Blessing Ele Agbonkpolor" to your name
- Update the social links with your profiles
- Modify the description
```

### 2. Update About Section
Edit [src/components/About.jsx](src/components/About.jsx):
```javascript
- Replace bio text with your background
- Update statistics (projects, years, clients)
- Change resume download link
```

### 3. Add Your Projects
Edit [src/components/Projects.jsx](src/components/Projects.jsx):
```javascript
// Replace projects array with your projects:
const projects = [
  {
    title: 'Your Project',
    description: 'What it does',
    tech: ['React', 'Node.js'],
    github: 'https://github.com/your-project',
    live: 'https://your-project.com',
    image: '🎨'
  },
  // Add more...
]
```

### 4. Update Skills
Edit [src/components/Skills.jsx](src/components/Skills.jsx):
```javascript
// Update skillCategories with your expertise
```

### 5. Update Contact Info
Edit [src/components/Contact.jsx](src/components/Contact.jsx):
```javascript
// Update contact info and form action
```

### 6. Update Navigation Links
Edit [src/components/Navigation.jsx](src/components/Navigation.jsx):
```javascript
// Ensure all social links point to your profiles
```

## 🚀 Deploy to Cloudflare (15 minutes)

### Step 1: Prepare
```bash
npm run build  # Test the build locally
```

### Step 2: Cloudflare Setup
1. Create account at [cloudflare.com](https://cloudflare.com)
2. Generate API token in Account Settings
3. Create KV namespace named `counter-kv`
4. Get your Account ID

### Step 3: GitHub Configuration
1. Fork this repository
2. Go to Settings → Secrets and Variables → Actions
3. Add secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - `VITE_API_URL`
   - `VITE_WORKER_URL`
   - `VITE_CORS_ORIGIN`

### Step 4: Deploy
```bash
git push origin main
```

GitHub Actions will automatically build and deploy!

## 🔧 Configuration Files Guide

### `.env.local` - Local Development
Set your local API and worker URLs for testing

### `wrangler.toml` - Cloudflare Worker Config
Update KV namespace IDs and environment variables

### `tailwind.config.js` - Styling
Customize colors, fonts, animations

### `vite.config.js` - Build Config
Already optimized, usually no changes needed

## 📱 Testing Before Deploy

### Local Testing
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Worker
npm run worker:dev
```

### Test Visitor Counter
1. Open `http://localhost:5173`
2. Open DevTools → Network tab
3. Check that `/visitors` endpoint is called
4. Verify count increments

### Test Contact Form
1. Fill out the form
2. Check console for errors
3. Verify validation works

## 🎨 Customizing Appearance

### Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: "#0f172a",    // Dark background
  secondary: "#1e293b",  // Card background
  accent: "#3b82f6",     // Primary color (blue)
  highlight: "#06b6d4",  // Secondary color (cyan)
}
```

### Fonts
Edit `index.html`:
```html
<!-- Add font links in head -->
<link href="https://fonts.googleapis.com/css2?family=Font:wght@400;700&display=swap" rel="stylesheet">
```

Then use in `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Font', 'sans-serif'],
}
```

### Logo/Avatar
Replace the "BA" initials in Hero component with an image:
```javascript
<img 
  src="/your-photo.jpg" 
  alt="Profile" 
  className="w-full h-full object-cover"
/>
```

## 🔐 Security Checklist

Before deploying:
- [ ] Update contact email to your real email
- [ ] Verify all external links are correct
- [ ] Check that GitHub links point to your repos
- [ ] Test contact form end-to-end
- [ ] Review security headers are present
- [ ] Run `npm audit` and fix vulnerabilities

## 📊 Analytics Setup (Optional)

Add Google Analytics:

1. Create GA4 property
2. Copy Measurement ID
3. Update environment variables:
```env
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

4. Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_ID');
</script>
```

## 🆘 Troubleshooting

### Build fails with "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Visitor counter shows "..."
- Check worker is deployed
- Verify KV namespace exists
- Check network tab for errors

### Contact form doesn't work
- Verify API endpoint in environment variables
- Check CORS settings
- Review browser console for errors

### Deployment stuck
- Check GitHub Actions logs
- Verify Cloudflare API token is valid
- Ensure account ID is correct

## 📚 Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- [GitHub Actions](https://docs.github.com/en/actions)

## ✅ Next Steps

1. ✏️ Personalize your portfolio
2. 🧪 Test locally with `npm run dev`
3. 🏗️ Build with `npm run build`
4. 🚀 Deploy to Cloudflare
5. 🎉 Share your portfolio!

---

Need help? Check [DEPLOYMENT.md](DEPLOYMENT.md) or open an [issue](https://github.com/okutachiblessing/personal_portfolio/issues).
