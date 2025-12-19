# Playwright Testing Framework Template 🎭

> **A production-ready, reusable Playwright testing framework for UI and API automation**

[![CI](https://github.com/acahet/playwright-template/actions/workflows/playwright.yml/badge.svg)](https://github.com/acahet/playwright-template/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Playwright](https://img.shields.io/badge/Playwright-1.57+-green.svg)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)

---

## 🚀 Using This Template

This is a **template repository** - click the **"Use this template"** button on GitHub to create your own project!

### Quick Start for New Projects

```bash
# 1. Create from template (via GitHub UI) or clone
git clone https://github.com/acahet/playwright-template.git your-project-name
cd your-project-name

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 4. Run template initialization (optional - updates project metadata)
npm run init-template

# 5. Start testing!
npm run test:api
```

📖 **Detailed Setup Guide**: See [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) for complete instructions  
🎨 **Customization Guide**: See [PROJECT_CUSTOMIZATION.md](PROJECT_CUSTOMIZATION.md) for tailoring to your needs

---

## 📋 Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running Tests](#running-tests)
-   [Code Quality](#code-quality)
-   [CI/CD Integration](#cicd-integration)
-   [Template Customization](#template-customization)
-   [Contributing](#contributing)

---

## 🎯 Overview

A comprehensive, enterprise-ready test automation framework built with [Playwright](https://playwright.dev). This template provides everything you need to start testing immediately while maintaining flexibility for customization.

**Perfect for:**
- Starting new testing projects quickly
- Establishing testing standards across teams
- Learning Playwright best practices
- Building upon a solid foundation

---

## ✨ Features

### Core Testing Capabilities
-   🎭 **UI Testing**: End-to-end browser testing with Chromium, Firefox, and WebKit
-   🔌 **API Testing**: RESTful API validation with type-safe request/response handling
-   ✅ **Schema Validation**: JSON schema validation for API responses using AJV
-   🧩 **Custom Fixtures**: Reusable test fixtures for authentication, API clients, and page objects

### Code Quality & Maintainability
-   🔒 **Type Safety**: Full TypeScript support with strict type checking
-   📐 **Page Object Model**: Organized page object structure for UI test maintainability
-   🎨 **Code Formatting**: Pre-configured Biome and ESLint
-   🪝 **Git Hooks**: Husky pre-commit hooks for format and lint validation
-   📝 **Path Aliases**: Clean imports with TypeScript path mapping

### Reporting & Debugging
-   📊 **HTML Reports**: Detailed test results with traces and screenshots
-   📸 **Screenshot on Failure**: Automatic screenshot capture for failed tests
-   🔍 **Trace Viewer**: Visual debugging with Playwright's trace viewer
-   📋 **Console Logging**: Request/response logging with custom logger

### DevOps & CI/CD
-   ⚙️ **GitHub Actions**: Pre-configured workflows for testing and linting
-   🔄 **Dependabot**: Automated dependency updates
-   🌍 **Multi-Environment**: Support for QA, Staging, Production environments
-   🌐 **Internationalization**: Built-in locale support (EN, BR, extensible)

---

## 📁 Project Structure

```
playwright-template/
├── 📄 TEMPLATE_SETUP.md          # Quick start guide for new projects
├── 📄 PROJECT_CUSTOMIZATION.md   # Detailed customization guide
├── 📄 .env.example               # Environment variables template
│
├── .github/
│   ├── workflows/
│   │   ├── lint.yml              # ESLint & Biome format checks
│   │   ├── playwright.yml        # Playwright test execution
│   │   └── pr-title-check.yml    # PR title validation
│   └── dependabot.yml            # Dependency update automation
│
├── .husky/                        # Git hooks for pre-commit validation
│   ├── pre-commit                 # Format & lint checks before commit
│   └── commit-msg                 # Commit message format validation
│
├── scripts/
│   └── init-template.js          # Template initialization script
│
├── tests/
│   ├── api-tests/                # API test suites (examples included)
│   │   ├── articles/             # Article endpoints tests
│   │   ├── tags/                 # Tags endpoint tests
│   │   └── user/                 # User-related API tests
│   │
│   ├── ui-tests/                 # UI test suites (examples included)
│   │   ├── feature/              # Feature test scenarios
│   │   └── pages/                # Page Object Model definitions
│   │
│   ├── config/                   # Test configuration
│   │   ├── api-test.config.ts    # API configuration
│   │   ├── types/                # TypeScript type definitions
│   │   └── urls/                 # Environment-specific URLs
│   │
│   ├── utils/                    # Utility functions
│   │   ├── constants.ts          # API endpoints & HTTP status codes
│   │   ├── custom-expect.ts      # Custom assertion matchers
│   │   ├── logger.ts             # Request/response logging
│   │   ├── request-handler.ts    # Immutable HTTP client wrapper
│   │   ├── schema-validator.ts   # JSON schema validation
│   │   └── data-generator.ts     # Test data generation (Faker)
│   │
│   ├── helpers/                  # Test helpers
│   │   └── createToken.ts        # Authentication token generation
│   │
│   ├── response-schemas/         # JSON schema definitions (examples)
│   ├── fixtures.ts               # Playwright test fixtures
│   └── report/                   # Test reports and artifacts
│
├── request-objects/              # Request payload templates (examples)
├── config/                       # URL configurations by environment/locale
│
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.js              # ESLint configuration
├── biome.json                    # Biome formatter/linter config
└── package.json                  # Dependencies and scripts
```

---

## 🔧 Prerequisites

-   **Node.js**: v18+ (LTS recommended)
-   **npm** or **yarn**: Package manager
-   **Git**: Version control

---

## 📦 Installation

### For New Projects (Using as Template)

```bash
# 1. Create repository from template via GitHub UI
# OR clone and re-initialize:
git clone https://github.com/acahet/playwright-template.git your-project-name
cd your-project-name
rm -rf .git
git init

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your configuration

# 4. Initialize template (optional - updates project metadata)
npm run init-template

# 5. Install Playwright browsers
npx playwright install chromium
```

### For Development (Contributing to Template)

```bash
git clone https://github.com/acahet/playwright-template.git
cd playwright-template
npm install
npx playwright install chromium

---

## ⚙️ Configuration

### Environment Variables (`.env`)

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Key variables:
```env
# API Configuration
API_URL=https://your-api-url.com
EMAIL_API=test@example.com
PASSWORD_API=SecurePassword123!

# Environment Selection
TEST_ENV=qa  # Options: qa, staging, prod

# Locale/Language
LOCALE=en  # Options: en, br, or custom
```

### Playwright Configuration (`playwright.config.ts`)

**Default Settings:**
-   **Base URL**: https://conduit.bondaracademy.com *(Update for your project)*
-   **Projects**:
    -   `ui-tests` - UI testing with Chromium
    -   `api-tests` - API testing with single worker
-   **Retries**: 2 on CI, 0 locally
-   **Reporting**: HTML reports saved to `tests/report/playwright-report`
-   **Trace**: Retained on test failure for debugging

**Customize for your project:**

```typescript
export default defineConfig({
	use: {
		baseURL: "https://your-app.com",  // Change this
		trace: "retain-on-failure",
	},
	// Add more projects as needed
});
```

### TypeScript Path Aliases (`tsconfig.json`)

Pre-configured aliases for cleaner imports:

```typescript
import { test } from '@fixtures';              // tests/fixtures.ts
import { endpoints } from '@utils/constants';  // tests/utils/constants.ts
import { HomePage } from '@pages/Homepage';    // tests/ui-tests/pages/Homepage
```

**Available aliases:**
-   `@fixtures` → `tests/fixtures.ts`
-   `@config` → `tests/config/index.ts`
-   `@pages/*` → `tests/ui-tests/pages/*`
-   `@features/*` → `tests/ui-tests/feature/*`
-   `@utils/*` → `tests/utils/*`
-   `@helpers/*` → `tests/helpers/*`
-   `@schemas/*` → `tests/response-schemas/*`

---

## 🧪 Running Tests

### Execute all tests

```bash
npm run test:all
# or
yarn test:all
```

### Run UI tests only

```bash
npm run test:ui
```

### Run API tests only

```bash
npm run test:api
```

### Interactive test mode (UI mode)

```bash
npm run test:ui-mode
```

### View test report

```bash
npm run report
# or
yarn report
```

### Watch mode (for development)

```bash
npx playwright test --watch
```

### Run specific test file

```bash
npx playwright test tests/api-tests/articles/get_articles.spec.ts
```

### Debug tests

```bash
npx playwright test --debug
```

---

## Code Quality

### Linting

Run ESLint to check for code issues:

```bash
yarn lint
```

### Code Formatting

Format code with Biome:

```bash
yarn code:format
```

Biome provides:

-   Code formatting with consistent style
-   Import organization
-   Basic linting rules

**Configuration**: `biome.json`

-   **Indent**: Tabs
-   **Quote Style**: Double quotes for JavaScript
-   **Trailing Commas**: All
-   **Arrow Parentheses**: Always

### Tools

-   **ESLint**: JavaScript/TypeScript linting
-   **Biome**: Modern formatter and linter
-   **TypeScript**: Static type checking

## Git Hooks (Husky)

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality and commit conventions through Git hooks.

### Pre-commit Hook

Automatically runs before every commit to ensure code quality:

1. **Format Check**: Verifies code formatting with Biome
2. **Lint Check**: Runs ESLint to catch code issues

If either check fails, the commit will be blocked. To fix:

```bash
# Fix formatting issues
yarn code:format

# Check and fix linting issues
yarn lint
```

### Commit Message Hook

Validates that commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format:

**Format**: `<type>(<optional scope>): <description>`

**Valid types**:
-   `feat`: New feature
-   `fix`: Bug fix
-   `chore`: Maintenance tasks
-   `build`: Build system changes
-   `ci`: CI/CD changes
-   `docs`: Documentation
-   `style`: Code style (formatting)
-   `refactor`: Code refactoring
-   `perf`: Performance improvements
-   `test`: Test additions/updates

**Examples**:
```bash
git commit -m "feat: add user authentication"
git commit -m "fix(api): resolve login endpoint issue"
git commit -m "chore: update dependencies"
```

### Branch Naming Convention

While not strictly enforced, branch names should follow the same convention:

**Format**: `<type>/<description>`

**Examples**:
-   `feat/add-user-profile`
-   `fix/auth-bug`
-   `chore/update-deps`

The commit-msg hook will show a warning if your branch doesn't follow this convention, but it won't block the commit.

### Bypassing Hooks (Not Recommended)

In exceptional cases, you can bypass hooks using:

```bash
git commit --no-verify -m "your message"
```

**Note**: This should only be used in emergencies as it bypasses quality checks.

## CI/CD Pipeline

### Workflows

#### 1. **Lint & Format Check** (`.github/workflows/lint.yml`)

-   Triggers on every push and pull request to `main`/`master`
-   Runs ESLint checks
-   Runs Biome format verification
-   Blocks merge if checks fail

#### 2. **Playwright Tests** (`.github/workflows/playwright.yml`)

-   Executes on changes to `tests/` directory
-   Caches Node modules and Playwright browsers
-   Runs both UI and API tests
-   Uploads test reports on failure

#### 3. **PR Title Check** (`.github/workflows/pr-title-check.yml`)

-   Validates PR titles follow semantic commit conventions
-   Supported types: `feat`, `fix`, `chore`, `build`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`

#### 4. **Dependabot** (`.github/dependabot.yml`)

-   Weekly dependency updates (Mondays at 9:00 AM UTC)
-   Automatic PR creation for updates
-   Assigned to: acahet

## 💻 Development

### Technology Stack

| Tool       | Version | Purpose                          |
| ---------- | ------- | -------------------------------- |
| Playwright | ^1.57.0 | Browser automation & API testing |
| TypeScript | ^5.9.3  | Type-safe development            |
| ESLint     | ^9.39.2 | Code linting                     |
| Biome      | ^2.3.8  | Code formatting                  |
| Faker      | ^10.1.0 | Test data generation             |
| AJV        | ^8.17.1 | JSON schema validation           |
| Dotenv     | ^17.2.3 | Environment variable management  |
| Husky      | ^9.1.7  | Git hooks                        |

### Creating Tests

#### UI Test Example

```typescript
// tests/ui-tests/feature/example/example.spec.ts
import { test } from '@fixtures';

test('should login successfully', async ({ page, loginPage }) => {
	await page.goto('/');
	await loginPage.login('user@test.com', 'password');
	// Test steps here
});
```

#### API Test Example

```typescript
// tests/api-tests/example/example.spec.ts
import { test } from '@fixtures';
import { expect } from '@utils/custom-expect';

test('should get user data', async ({ api, endpoints, httpStatus }) => {
	const response = await api
		.path(endpoints.users)
		.getRequest(httpStatus.Status200_Ok);

	await expect(response).shouldMatchSchema('users', 'GET_user');
});

// Without authentication
test('should get public articles', async ({ api, endpoints, httpStatus }) => {
	const response = await api
		.path(endpoints.articles)
		.withoutAuth()
		.params({ limit: 10 })
		.getRequest(httpStatus.Status200_Ok);
});
```

### Custom Fixtures

Available fixtures in `tests/fixtures.ts`:

| Fixture | Type | Description |
|---------|------|-------------|
| `api` | RequestHandler | Immutable HTTP client with auth |
| `endpoints` | Object | Centralized API endpoints |
| `httpStatus` | Object | HTTP status code constants |
| `config` | Object | Test configuration |
| `validateSchema` | Function | JSON schema validation |
| `loginPage` | PageObject | Login page object |
| `homePage` | PageObject | Home page object |
| `authToken` | string | Auth token (worker-scoped) |

### RequestHandler (Immutable Pattern)

The `RequestHandler` uses an immutable builder pattern - each method returns a new instance:

```typescript
// GET request with authentication (default)
const response = await api.path('/users').getRequest(200);

// POST request with body
const created = await api
	.path('/articles')
	.body({ article: { title: 'Test' } })
	.postRequest(201);

// Request without authentication
const publicData = await api
	.path('/articles')
	.withoutAuth()
	.params({ limit: 10, offset: 0 })
	.getRequest(200);

// Custom headers
const custom = await api
	.path('/endpoint')
	.headers({ 'X-Custom': 'value' })
	.getRequest(200);
```

**Supported Methods:**
-   `getRequest(statusCode)` - GET request
-   `postRequest(statusCode)` - POST request
-   `putRequest(statusCode)` - PUT request
-   `deleteRequest(statusCode)` - DELETE request

---

## 🎨 Template Customization

### Quick Customization Checklist

After creating your project from this template:

- [ ] Update `package.json` (name, repository, author)
- [ ] Configure `.env` with your API credentials
- [ ] Update `playwright.config.ts` baseURL
- [ ] Modify `tests/utils/constants.ts` with your endpoints
- [ ] Remove example tests (or keep as reference)
- [ ] Add your API response schemas
- [ ] Create your page objects for UI tests
- [ ] Update CI/CD workflows for your environments
- [ ] Customize Git hooks if needed

### Detailed Guides

- 📖 **[TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)** - Complete setup instructions
- 🎨 **[PROJECT_CUSTOMIZATION.md](PROJECT_CUSTOMIZATION.md)** - In-depth customization guide

### Common Customizations

#### 1. Add New API Endpoints

Edit [`tests/utils/constants.ts`](tests/utils/constants.ts):

```typescript
export const endpoints = {
	users: "api/users",
	login: "api/auth/login",
	// Add your endpoints
	products: "api/products",
	orders: "api/orders",
} satisfies Endpoint;
```

#### 2. Add New Test Project

Edit [`playwright.config.ts`](playwright.config.ts):

```typescript
projects: [
	{
		name: "ui-tests",
		// ... existing config
	},
	{
		name: "integration-tests",
		testDir: "./tests/integration-tests",
		use: {
			baseURL: "https://integration.yourapp.com",
		},
	},
],
```

#### 3. Extend Custom Assertions

Edit [`tests/utils/custom-expect.ts`](tests/utils/custom-expect.ts):

```typescript
export const expect = baseExpect.extend({
	// Add your custom matchers
	async toHaveValidJWT(response: APIResponse) {
		// Implementation
	},
});
```

#### 4. Add Multi-Environment Support

Create environment configs in `config/urls/`:

```
config/urls/
├── staging/
│   └── api.ts
├── production/
│   └── api.ts
└── qa/
    └── api.ts
```

---
---

## 🤝 Contributing

We welcome contributions to improve this template!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feat/your-feature`
3. **Make your changes** and ensure tests pass
4. **Commit with conventional format**: `git commit -m "feat: add new feature"`
5. **Push to your fork**: `git push origin feat/your-feature`
6. **Open a Pull Request**

### Development Workflow

Before committing, Husky hooks will automatically run:
- **Pre-commit**: Format and lint checks
- **Commit-msg**: Validates commit message format

If hooks fail:
```bash
npm run code:format  # Fix formatting
npm run lint         # Check linting
```

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add PDF export` |
| `fix` | Bug fix | `fix: resolve login timeout` |
| `docs` | Documentation | `docs: update setup guide` |
| `chore` | Maintenance | `chore: update dependencies` |
| `refactor` | Code refactoring | `refactor: simplify API handler` |
| `test` | Test updates | `test: add user API tests` |
| `ci` | CI/CD changes | `ci: add deployment workflow` |
| `style` | Code style | `style: format with Biome` |
| `perf` | Performance | `perf: optimize schema validation` |
| `build` | Build system | `build: update webpack config` |

**Note**: PR titles must also follow this format.

---

## 📚 Resources

### Playwright
- [Official Documentation](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

### Testing
- [Test Design Patterns](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Page Object Model](https://playwright.dev/docs/pom)

### This Template
- [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md) - Quick start guide
- [PROJECT_CUSTOMIZATION.md](PROJECT_CUSTOMIZATION.md) - Customization guide
- [Issues](https://github.com/acahet/playwright-template/issues) - Report bugs or request features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Anderson Cahet**
- GitHub: [@acahet](https://github.com/acahet)
- Repository: [playwright-template](https://github.com/acahet/playwright-template)

---

## 🌟 Show Your Support

If this template helps you, give it a ⭐️ on GitHub!

---

## 📝 Changelog

### Version 2.0.0 (December 2025)
- 🎁 Converted to reusable template repository
- 📖 Added comprehensive setup and customization guides
- 🔧 Added template initialization script
- 📦 Created `.env.example` for easy configuration
- ✨ Enhanced documentation with badges and emojis
- 🎨 Improved project structure for template usage

### Version 1.0.0
- Initial release with UI and API testing capabilities

---

**Happy Testing!** 🎭✨
