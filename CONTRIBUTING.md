# Contributing Guide

## Welcome!

Thank you for your interest in contributing to Blessing's portfolio! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## Getting Started

### 1. Fork & Clone
```bash
git clone https://github.com/[YOUR-USERNAME]/personal_portfolio.git
cd personal_portfolio
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-fix-name
```

## Development Workflow

### Setup
```bash
npm install
npm run dev
```

### Make Changes
- Follow existing code style
- Use meaningful commit messages
- Keep commits atomic and focused

### Testing
```bash
npm run lint
npm run type-check
npm run build
```

### Push & Create PR
```bash
git push origin feature/your-feature-name
```

## Code Style

### JavaScript/React
- Use ES6+ syntax
- Use functional components with hooks
- Follow ESLint rules (configured)
- Use meaningful variable names
- Add comments for complex logic

### CSS/Tailwind
- Use Tailwind classes
- Avoid custom CSS unless necessary
- Use consistent spacing
- Follow mobile-first approach

### File Structure
```
src/
├── components/    # React components
├── utils/        # Utility functions
├── worker/       # Cloudflare Worker code
└── index.css     # Global styles
```

## Types of Contributions

### Bug Reports
1. Check existing issues first
2. Include:
   - Description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS info
   - Screenshots if applicable

### Features
1. Discuss major features first (open an issue)
2. Implement changes
3. Update tests and documentation
4. Submit PR with description

### Documentation
- Fix typos
- Improve clarity
- Add examples
- Update outdated info

## PR Guidelines

### Before Submitting
- ✅ Code follows style guide
- ✅ All tests pass (`npm run build`)
- ✅ No breaking changes (unless discussed)
- ✅ Commit messages are clear
- ✅ PR description explains changes

### PR Template
```markdown
## Description
Brief explanation of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Changes Made
- Change 1
- Change 2

## Testing
How to test these changes

## Screenshots
If applicable, add screenshots
```

## Commit Messages

- Start with capital letter
- Use present tense ("Add feature" not "Added")
- Be descriptive but concise
- Reference issues: "Fixes #123"

Examples:
```
Add dark mode toggle
Fix visitor counter bug
Update README deployment section
Refactor contact form validation
```

## Areas for Contribution

### High Priority
- [ ] Blog integration
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Performance optimization

### Medium Priority
- [ ] Enhanced analytics
- [ ] Email notifications
- [ ] Cache optimization
- [ ] Test coverage

### Low Priority
- [ ] UI polish
- [ ] Animation tweaks
- [ ] Documentation improvements
- [ ] Code cleanup

## Questions?

- Open an issue for questions
- Use GitHub Discussions for ideas
- Check existing documentation first

## Recognition

Contributors will be:
- Listed in README
- Thanked in release notes
- Credited in git history

---

Happy contributing! 🎉
