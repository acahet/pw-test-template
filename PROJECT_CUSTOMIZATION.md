# 🎨 Project Customization Guide

This guide provides detailed instructions for customizing the Playwright template to fit your specific project needs.

## Table of Contents

1. [Initial Configuration](#initial-configuration)
2. [Project Structure Customization](#project-structure-customization)
3. [API Testing Customization](#api-testing-customization)
4. [UI Testing Customization](#ui-testing-customization)
5. [Advanced Configuration](#advanced-configuration)
6. [CI/CD Customization](#cicd-customization)
7. [Best Practices](#best-practices)

---

## Initial Configuration

### 1. Update Project Metadata

Edit `package.json`:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Your project description",
  "repository": "https://github.com/your-org/your-repo.git",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT"
}
```

### 2. Configure Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Update with your values:

```env
# Test Environment
TEST_ENV=qa  # Options: qa, staging, prod

# API Configuration
API_URL=https://api.yourproject.com
EMAIL_API=test.user@yourproject.com
PASSWORD_API=your-secure-password

# UI Configuration (optional)
UI_BASE_URL=https://yourproject.com

# Locale (if needed)
LOCALE=en  # Options: en, br, or add custom
```

### 3. Update Playwright Base URL

Edit `playwright.config.ts`:

```typescript
export default defineConfig({
  use: {
    baseURL: "https://your-application.com",  // Change this
    trace: "retain-on-failure",
  },
});
```

---

## Project Structure Customization

### Remove Example Tests

The template includes example tests for demonstration. Remove what you don't need:

```bash
# Remove example API tests
rm -rf tests/api-tests/articles
rm -rf tests/api-tests/tags
rm -rf tests/api-tests/user

# Remove example UI tests
rm -rf tests/ui-tests/feature/login
rm -rf tests/ui-tests/pages/Homepage
rm -rf tests/ui-tests/pages/LoginPage

# Remove example schemas
rm -rf tests/response-schemas/articles
rm -rf tests/response-schemas/profiles
rm -rf tests/response-schemas/tags
rm -rf tests/response-schemas/users

# Remove example request objects
rm -rf request-objects/articles
rm -rf request-objects/user
```

### Create Your Test Structure

```bash
# Create your API test directories
mkdir -p tests/api-tests/your-feature
mkdir -p tests/api-tests/your-module

# Create your UI test directories
mkdir -p tests/ui-tests/feature/your-feature
mkdir -p tests/ui-tests/pages/YourPage

# Create schema directories
mkdir -p tests/response-schemas/your-feature
```

---

## API Testing Customization

### 1. Define Your API Endpoints

Edit `tests/utils/constants.ts`:

```typescript
import type { Endpoint, HttpStatusCode } from "@config";

/**
 * HTTP status codes used across API tests
 */
export const httpStatus = {
	Status200_Ok: 200,
	Status201_Created: 201,
	Status204_No_Content: 204,
	Status400_Bad_Request: 400,
	Status401_Unauthorized: 401,
	Status403_Forbidden: 403,
	Status404_Not_Found: 404,
	Status422_Unprocessable_Content: 422,
	Status500_Internal_Server_Error: 500,
	// Add more as needed
} satisfies HttpStatusCode;

/**
 * Centralized API endpoints for your project
 */
export const endpoints = {
	// Authentication
	login: "api/auth/login",
	logout: "api/auth/logout",
	register: "api/auth/register",
	
	// Users
	users: "api/users",
	userProfile: (id: string) => `api/users/${id}`,
	
	// Your domain endpoints
	products: "api/products",
	orders: "api/orders",
	
	// Add your endpoints here
} satisfies Endpoint;
```

### 2. Configure API Authentication

Edit `tests/helpers/createToken.ts`:

```typescript
import { endpoints } from "@utils/constants";

export async function createToken(email: string, password: string): Promise<string> {
	const response = await fetch(`${process.env.API_URL}/${endpoints.login}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			// Adjust payload structure for your API
			email,
			password,
		}),
	});

	if (!response.ok) {
		throw new Error(`Authentication failed: ${response.statusText}`);
	}

	const data = await response.json();
	
	// Adjust based on your API response structure
	return data.token; // or data.user.token, data.accessToken, etc.
}
```

### 3. Create API Test Examples

Create `tests/api-tests/your-feature/example.spec.ts`:

```typescript
import { test } from "@fixtures";
import { expect } from "@utils/custom-expect";

test.describe("Your Feature API Tests", () => {
	test("should get list of items", async ({ api, endpoints, httpStatus }) => {
		const response = await api
			.path(endpoints.yourEndpoint)
			.params({ limit: 10 })
			.getRequest(httpStatus.Status200_Ok);

		expect(response.ok()).toBeTruthy();
		const data = await response.json();
		expect(data).toBeDefined();
	});

	test("should create a new item", async ({ api, endpoints, httpStatus }) => {
		const payload = {
			name: "Test Item",
			description: "Test Description",
		};

		const response = await api
			.path(endpoints.yourEndpoint)
			.body(payload)
			.postRequest(httpStatus.Status201_Created);

		const data = await response.json();
		expect(data.id).toBeDefined();
	});

	test("should update an item", async ({ api, endpoints, httpStatus }) => {
		const itemId = "123";
		const payload = { name: "Updated Name" };

		const response = await api
			.path(`${endpoints.yourEndpoint}/${itemId}`)
			.body(payload)
			.putRequest(httpStatus.Status200_Ok);

		expect(response.ok()).toBeTruthy();
	});

	test("should delete an item", async ({ api, endpoints, httpStatus }) => {
		const itemId = "123";

		const response = await api
			.path(`${endpoints.yourEndpoint}/${itemId}`)
			.deleteRequest(httpStatus.Status204_No_Content);

		expect(response.status()).toBe(204);
	});
});
```

### 4. Add JSON Schema Validation

Create schema files in `tests/response-schemas/your-feature/`:

```json
// GET_items_schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["items", "total"],
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "name"],
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "description": { "type": "string" }
        }
      }
    },
    "total": { "type": "number" }
  }
}
```

Use in tests:

```typescript
test("should match response schema", async ({ api, endpoints, httpStatus }) => {
	const response = await api
		.path(endpoints.yourEndpoint)
		.getRequest(httpStatus.Status200_Ok);

	await expect(response).shouldMatchSchema("your-feature", "GET_items");
});
```

---

## UI Testing Customization

### 1. Create Page Objects

Create `tests/ui-tests/pages/YourPage/index.ts`:

```typescript
import type { Locator, Page } from "@playwright/test";

export class YourPage {
	readonly page: Page;
	readonly yourButton: Locator;
	readonly yourInput: Locator;
	readonly yourElement: Locator;

	constructor(page: Page) {
		this.page = page;
		this.yourButton = page.locator('[data-testid="your-button"]');
		this.yourInput = page.locator('input[name="your-input"]');
		this.yourElement = page.locator(".your-class");
	}

	async navigateTo() {
		await this.page.goto("/your-path");
	}

	async performAction() {
		await this.yourButton.click();
	}

	async fillForm(data: { field1: string; field2: string }) {
		await this.yourInput.fill(data.field1);
		// Add more form interactions
	}

	async waitForElement() {
		await this.yourElement.waitFor({ state: "visible" });
	}
}
```

Export from `tests/ui-tests/pages/index.ts`:

```typescript
export { YourPage } from "./YourPage";
export { HomePage } from "./Homepage";
// Add more page exports
```

### 2. Add Page Object to Fixtures

Edit `tests/fixtures.ts`:

```typescript
import { YourPage } from "@pages/YourPage";

export interface TestOptions {
	api: RequestHandler;
	yourPage: YourPage;  // Add this
	homePage: HomePage;
	// ... other fixtures
}

export const test = base.extend<TestOptions, WorkerFixture>({
	// ... existing fixtures

	yourPage: async ({ page }, use) => {
		const yourPage = new YourPage(page);
		await use(yourPage);
	},
});
```

### 3. Create UI Tests

Create `tests/ui-tests/feature/your-feature/example.spec.ts`:

```typescript
import { test } from "@fixtures";
import { expect } from "@playwright/test";

test.describe("Your Feature UI Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should perform user action", async ({ page, yourPage }) => {
		await yourPage.navigateTo();
		await yourPage.performAction();
		
		await expect(page).toHaveURL(/.*success/);
		await expect(yourPage.yourElement).toBeVisible();
	});

	test("should fill and submit form", async ({ yourPage }) => {
		await yourPage.navigateTo();
		await yourPage.fillForm({
			field1: "Test Value",
			field2: "Another Value",
		});
		
		await yourPage.yourButton.click();
		await yourPage.waitForElement();
	});
});
```

---

## Advanced Configuration

### 1. Multiple Test Projects

Edit `playwright.config.ts`:

```typescript
export default defineConfig({
	projects: [
		{
			name: "ui-tests",
			testDir: "./tests/ui-tests",
			use: {
				baseURL: "https://yourapp.com",
				screenshot: "only-on-failure",
			},
		},
		{
			name: "api-tests",
			testDir: "./tests/api-tests",
			use: {
				baseURL: "https://api.yourapp.com",
			},
		},
		{
			name: "integration-tests",
			testDir: "./tests/integration-tests",
			use: {
				baseURL: "https://integration.yourapp.com",
			},
		},
		{
			name: "e2e-tests",
			testDir: "./tests/e2e-tests",
			use: {
				baseURL: "https://yourapp.com",
				video: "retain-on-failure",
			},
		},
	],
});
```

### 2. Environment-Specific Configuration

Create `tests/config/environments.ts`:

```typescript
interface EnvironmentConfig {
	apiUrl: string;
	uiUrl: string;
	timeout: number;
}

const environments: Record<string, EnvironmentConfig> = {
	qa: {
		apiUrl: "https://qa-api.yourapp.com",
		uiUrl: "https://qa.yourapp.com",
		timeout: 30000,
	},
	staging: {
		apiUrl: "https://staging-api.yourapp.com",
		uiUrl: "https://staging.yourapp.com",
		timeout: 30000,
	},
	prod: {
		apiUrl: "https://api.yourapp.com",
		uiUrl: "https://yourapp.com",
		timeout: 15000,
	},
};

export function getEnvironmentConfig(): EnvironmentConfig {
	const env = process.env.TEST_ENV || "qa";
	return environments[env] || environments.qa;
}
```

Use in `tests/config/api-test.config.ts`:

```typescript
import { getEnvironmentConfig } from "./environments";

const envConfig = getEnvironmentConfig();

const apiConfig = {
	apiUrl: process.env.API_URL || envConfig.apiUrl,
	userEmail: process.env.EMAIL_API as string,
	userPassword: process.env.PASSWORD_API as string,
	timeout: envConfig.timeout,
};

export { apiConfig };
```

### 3. Custom Assertions

Extend `tests/utils/custom-expect.ts`:

```typescript
import { expect as baseExpect } from "@playwright/test";
import type { APIResponse } from "@playwright/test";

export const expect = baseExpect.extend({
	async toHaveValidToken(response: APIResponse) {
		const data = await response.json();
		const pass = data.token && typeof data.token === "string";

		return {
			message: () => `expected response to have valid token`,
			pass,
		};
	},

	async toHaveStatusMessage(response: APIResponse, expected: string) {
		const data = await response.json();
		const pass = data.message === expected;

		return {
			message: () => `expected message to be "${expected}", got "${data.message}"`,
			pass,
		};
	},

	// Add more custom matchers
});
```

### 4. Data Generation Utilities

Extend `tests/utils/data-generator.ts`:

```typescript
import { faker } from "@faker-js/faker";

export class DataGenerator {
	// Existing methods...

	static generateProduct() {
		return {
			name: faker.commerce.productName(),
			price: Number.parseFloat(faker.commerce.price()),
			description: faker.commerce.productDescription(),
			category: faker.commerce.department(),
		};
	}

	static generateOrder() {
		return {
			orderId: faker.string.uuid(),
			total: Number.parseFloat(faker.commerce.price()),
			items: Array.from({ length: 3 }, () => this.generateProduct()),
			customerEmail: faker.internet.email(),
		};
	}

	// Add your domain-specific generators
}
```

---

## CI/CD Customization

### 1. Update GitHub Actions Workflows

Edit `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, develop]  # Add your branches
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        environment: [qa, staging]  # Add environments
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'  # Update version as needed
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium
      
      - name: Run Playwright tests
        env:
          TEST_ENV: ${{ matrix.environment }}
          API_URL: ${{ secrets.API_URL }}
          EMAIL_API: ${{ secrets.EMAIL_API }}
          PASSWORD_API: ${{ secrets.PASSWORD_API }}
        run: npm run test:all
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-${{ matrix.environment }}
          path: tests/report/
          retention-days: 30
```

### 2. Add GitHub Secrets

Go to your repository settings and add:
- `API_URL`
- `EMAIL_API`
- `PASSWORD_API`
- Any other sensitive configuration

### 3. Customize Dependabot

Edit `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "your-github-username"
    assignees:
      - "your-github-username"
```

---

## Best Practices

### 1. Test Organization

```
tests/
├── api-tests/
│   ├── authentication/       # Group by feature
│   ├── users/
│   └── products/
├── ui-tests/
│   ├── feature/
│   │   ├── checkout/         # Group by user journey
│   │   ├── product-search/
│   │   └── user-profile/
│   └── pages/
│       ├── CheckoutPage/
│       └── ProductPage/
```

### 2. Configuration Management

- Keep sensitive data in `.env` (never commit)
- Use environment-specific configs
- Document all required environment variables
- Use TypeScript types for configuration

### 3. Naming Conventions

```typescript
// Test files
*.spec.ts or *.test.ts

// Page objects
YourPageName/index.ts

// Schemas
GET_resource_name_schema.json
POST_resource_name_schema.json

// Constants
SCREAMING_SNAKE_CASE for constants
camelCase for functions/variables
PascalCase for classes
```

### 4. Test Data Management

```typescript
// Use data generators
const testUser = DataGenerator.generateUser();

// Use fixtures for common data
test.use({ testData: { role: "admin" } });

// Clean up test data after tests
test.afterEach(async ({ api }) => {
	// Cleanup logic
});
```

### 5. Error Handling

```typescript
test("should handle errors gracefully", async ({ api, endpoints }) => {
	try {
		await api.path(endpoints.invalid).getRequest(404);
	} catch (error) {
		expect(error).toBeDefined();
	}
});
```

---

## Additional Customizations

### Add Browser Support

Edit `playwright.config.ts`:

```typescript
projects: [
	{
		name: "chromium",
		use: { ...devices["Desktop Chrome"] },
	},
	{
		name: "firefox",
		use: { ...devices["Desktop Firefox"] },
	},
	{
		name: "webkit",
		use: { ...devices["Desktop Safari"] },
	},
	{
		name: "Mobile Chrome",
		use: { ...devices["Pixel 5"] },
	},
],
```

### Add Allure Reporting

```bash
npm install -D allure-playwright

# Update playwright.config.ts
reporter: [
	["html"],
	["allure-playwright"],
],
```

### Add Visual Regression Testing

```typescript
test("visual regression test", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveScreenshot("homepage.png");
});
```

---

## Troubleshooting

### Common Issues

1. **Import path errors**: Check `tsconfig.json` paths match your structure
2. **Environment variables not loading**: Verify `.env` file location and dotenv config
3. **Authentication failing**: Check `createToken` function matches your API
4. **Schema validation failing**: Ensure schema structure matches API response

### Getting Help

- Review [TEMPLATE_SETUP.md](TEMPLATE_SETUP.md)
- Check [Playwright Documentation](https://playwright.dev)
- Open an issue on GitHub

---

**Need more help?** Check the [main README](README.md) or [open an issue](https://github.com/acahet/playwright-template/issues).
