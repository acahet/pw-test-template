# 🚀 Template Setup Guide

Welcome! This is a reusable Playwright testing framework template for UI and API automation. Follow these steps to set up your new project.

## Quick Start (5 minutes)

### 1. Create Your New Repository

```bash
# Option A: Use GitHub's "Use this template" button (Recommended)
# Click the green "Use this template" button on GitHub

# Option B: Clone and re-initialize
git clone https://github.com/acahet/playwright-template.git your-project-name
cd your-project-name
rm -rf .git
git init
git remote add origin your-repo-url
```

### 2. Customize Project Information

Run the initialization script to automatically update project details:

```bash
npm run init-template
```

Or manually update these files:
- `package.json` - name, repository, author
- `README.md` - project title and description
- `LICENSE` - your organization/name

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your project-specific values
# For Windows: copy .env.example .env
```

Required environment variables:
```env
# API Configuration
API_URL=https://your-api-url.com
EMAIL_API=test@example.com
PASSWORD_API=your-password

# Test Environment
TEST_ENV=qa  # or 'prod'

# Optional: Locale support
LOCALE=en  # or 'br'
```

### 5. Update Playwright Configuration

Edit `playwright.config.ts`:
```typescript
use: {
    trace: "retain-on-failure",
    baseURL: "https://your-app-url.com",  // Update this
},
```

### 6. Verify Installation

```bash
# Run format check
npm run code:format:check

# Run linting
npm run lint

# Run sample tests (optional)
npm run test:api
```

## Project Customization

### Remove Example Tests

The template includes example tests for demonstration. Remove them:

```bash
# Delete example API tests
rm -rf tests/api-tests/articles
rm -rf tests/api-tests/tags
rm -rf tests/api-tests/user

# Delete example UI tests
rm -rf tests/ui-tests/feature/login
rm -rf tests/ui-tests/pages/Homepage
rm -rf tests/ui-tests/pages/LoginPage

# Delete example request objects
rm -rf request-objects/articles
rm -rf request-objects/user

# Delete example response schemas
rm -rf tests/response-schemas/articles
rm -rf tests/response-schemas/profiles
rm -rf tests/response-schemas/tags
rm -rf tests/response-schemas/users
```

### Update API Endpoints

Edit `tests/utils/constants.ts` with your API endpoints:

```typescript
export const endpoints = {
    // Replace with your actual endpoints
    user: "api/user",
    login: "api/auth/login",
    // Add your endpoints here
} satisfies Endpoint;
```

### Configure Your Environments

1. **Update URLs**: Edit files in `config/urls/`
   - `config/urls/english/test/` - QA environment URLs
   - `config/urls/english/production/` - Production URLs
   - Add more locales as needed

2. **API Configuration**: Edit `tests/config/api-test.config.ts`
   - Add environment-specific configurations
   - Update authentication logic if needed

### Add Your Tests

1. **API Tests**: Create new test files in `tests/api-tests/`
2. **UI Tests**: Create page objects in `tests/ui-tests/pages/` and tests in `tests/ui-tests/feature/`
3. **Fixtures**: Extend `tests/fixtures.ts` with custom fixtures
4. **Helpers**: Add utilities in `tests/helpers/`

## CI/CD Setup

### GitHub Actions

The template includes workflows in `.github/workflows/`:
- `playwright.yml` - Run tests on push/PR
- `lint.yml` - Code quality checks
- `pr-title-check.yml` - Conventional commit validation

Update workflow files if needed:
1. Change trigger branches
2. Update Node.js version
3. Add environment-specific secrets

### Environment Secrets

Add these secrets to your GitHub repository:
- `API_URL`
- `EMAIL_API`
- `PASSWORD_API`

Go to: Repository Settings → Secrets and variables → Actions

## Git Hooks (Husky)

Pre-configured hooks ensure code quality:
- **pre-commit**: Runs format and lint checks
- **commit-msg**: Validates commit message format

To customize hooks, edit files in `.husky/`

## Common Customizations

### Add New Test Projects

In `playwright.config.ts`:

```typescript
projects: [
    {
        name: "ui-tests",
        // ... existing config
    },
    {
        name: "integration-tests",  // New project
        testDir: "./tests/integration-tests",
        use: { /* config */ },
    },
],
```

### Custom Assertions

Extend `tests/utils/custom-expect.ts` with project-specific matchers.

### Request Handlers

Modify `tests/utils/request-handler.ts` to add custom authentication or headers.

### Logging

Customize logging in `tests/utils/logger.ts` for your needs.

## Troubleshooting

### Installation Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Playwright Browser Issues

```bash
# Install browsers
npx playwright install chromium
```

### Environment Variable Issues

```bash
# Verify .env is loaded
node -e "require('dotenv').config(); console.log(process.env.API_URL)"
```

## Next Steps

1. ✅ Complete setup steps above
2. 📝 Read `PROJECT_CUSTOMIZATION.md` for detailed guidance
3. 🧪 Write your first test
4. 🔄 Set up CI/CD pipeline
5. 📖 Update documentation for your team

## Support

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Template Issues](https://github.com/acahet/playwright-template/issues)

## Template Version

**Current Version**: 2.0.0  
**Last Updated**: December 2025

---

Happy Testing! 🎭
