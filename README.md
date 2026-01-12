# 🚀 Blessing Ele Agbonkpolor - Personal Portfolio

A modern, responsive portfolio website built with React and deployed on Cloudflare Pages with Cloudflare Workers for real-time visitor tracking.

## ✨ Features

- **Modern Design**: Beautiful, responsive UI built with Tailwind CSS
- **React Framework**: Component-based architecture with React 18
- **Real-time Visitor Counter**: Track visitor counts using Cloudflare KV Storage
- **Security Best Practices**: CSP headers, input validation, XSS prevention
- **Environment-based Configuration**: Separate configs for dev, staging, and production
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Mobile Responsive**: Fully responsive design for all devices
- **Smooth Animations**: Framer Motion animations for engaging interactions
- **Dark Theme**: Modern dark theme with gradient accents
- **SEO Optimized**: Meta tags and semantic HTML
- **Performance Optimized**: Code splitting, lazy loading, minification

## 🛠 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

### Backend & Hosting
- Cloudflare Pages (Static site hosting)
- Cloudflare Workers (Serverless functions)
- Cloudflare KV (Key-value store for visitor tracking)

### DevOps & CI/CD
- GitHub Actions
- Wrangler (Cloudflare CLI)
- ESLint (Code quality)

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Cloudflare Account
- GitHub Account

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/okutachiblessing/personal_portfolio.git
cd personal_portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
VITE_API_URL=http://localhost:8787
VITE_WORKER_URL=http://localhost:8787
VITE_CORS_ORIGIN=http://localhost:5173
VITE_ENVIRONMENT=development
```

### 4. Development

#### Start the frontend dev server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

#### Start the Cloudflare Worker locally:
```bash
npm run worker:dev
```

Worker will run at `http://localhost:8787`

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deploy to Cloudflare Pages
```bash
npm run deploy
```

Or manually:
1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy

### Deploy Worker Only
```bash
npm run worker:deploy
```

## 🔐 Security Features

### Implemented Security Best Practices:
- **Content Security Policy (CSP)**: Restrict resource loading
- **XSS Prevention**: Input sanitization and validation
- **CORS Configuration**: Controlled cross-origin access
- **Security Headers**: X-Frame-Options, X-Content-Type-Options, etc.
- **Form Validation**: Email, spam detection, input length checks
- **Environment Secrets**: Sensitive data in GitHub Secrets

### Security Headers Set:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

## 📊 Real-time Visitor Counter

The portfolio includes a real-time visitor counter powered by:
- **Cloudflare KV**: Persistent data storage
- **Cloudflare Workers**: Serverless backend

### Setup:
1. Create a KV namespace in Cloudflare Dashboard
2. Update `wrangler.toml` with your KV namespace ID:
```toml
kv_namespaces = [
  { binding = "COUNTER_KV", id = "your_kv_id" }
]
```

3. Update environment variables with Worker URL

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for automated deployment:

### Workflows:
1. **deploy.yml**: Builds and deploys to Cloudflare Pages + Workers
2. **quality.yml**: Runs linting and security audits

### Required GitHub Secrets:
```
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
VITE_API_URL
VITE_WORKER_URL
VITE_CORS_ORIGIN
```

### Deployment Triggers:
- Push to `main` branch: Full deployment
- Push to `develop` branch: Preview deployment
- Pull requests: Build verification only

## 📁 Project Structure

```
personal_portfolio/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── VisitorCounter.jsx
│   ├── utils/
│   │   ├── security.js
│   │   └── formValidator.js
│   ├── worker/
│   │   └── index.js (Cloudflare Worker)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── favicon.svg
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       └── quality.yml
├── index.html
├── vite.config.js
├── tailwind.config.js
├── wrangler.toml
├── package.json
└── README.md
```

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run worker:dev      # Start Worker locally

# Build & Deploy
npm run build           # Build for production
npm run deploy          # Deploy to Cloudflare Pages + Workers
npm run worker:deploy   # Deploy Worker only

# Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript type checking
```

## 🎨 Customization

### Update Portfolio Content
Edit the component files in `src/components/`:
- **Hero**: Personal intro and CTA
- **About**: Bio and statistics
- **Projects**: Featured projects
- **Skills**: Technical skills and proficiencies
- **Contact**: Contact form and information

### Styling
- Colors: Edit `tailwind.config.js`
- Animations: Modify Framer Motion configs in components
- Fonts: Update in `index.html` and `index.css`

### Environment Variables
Update `.env.example` and deploy via GitHub Secrets for production.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: blessing@example.com
- **GitHub**: [@okutachiblessing](https://github.com/okutachiblessing)
- **LinkedIn**: [Blessing Agbonkpolor](https://linkedin.com/in/blessing-agbonkpolor)
- **Twitter**: [@your_handle](https://twitter.com/your_handle)

## 🎯 Roadmap

- [ ] Blog integration
- [ ] Dark/Light theme toggle
- [ ] Multiple language support (i18n)
- [ ] Analytics dashboard
- [ ] Email notifications for contact form
- [ ] Newsletter subscription
- [ ] Performance metrics tracking
- [ ] A/B testing capabilities

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Cloudflare Pages Docs](https://pages.cloudflare.com)
- [Cloudflare Workers Docs](https://workers.cloudflare.com)
- [Framer Motion Docs](https://www.framer.com/motion)

## ✅ Deployment Checklist

Before deploying to production:

- [ ] Update personal information (name, email, links)
- [ ] Add real projects with descriptions
- [ ] Update skills based on actual proficiencies
- [ ] Set up Cloudflare KV namespace
- [ ] Configure GitHub Secrets
- [ ] Test contact form end-to-end
- [ ] Verify visitor counter functionality
- [ ] Check security headers in DevTools
- [ ] Run npm audit and fix vulnerabilities
- [ ] Test on multiple browsers and devices
- [ ] Set up custom domain (optional)
- [ ] Enable caching and optimization in Cloudflare

---

**Last Updated**: December 29, 2025

Made with ❤️ by Blessing Ele Agbonkpolor
