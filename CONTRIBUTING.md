# Contributing to Playwright Template

Thank you for your interest in improving this Playwright testing framework template! 🎭

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Convention](#commit-convention)

---

## Code of Conduct

This project follows a simple code of conduct:
- Be respectful and constructive
- Help others learn and grow
- Focus on making the template better for everyone

---

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Git
- Basic understanding of Playwright and TypeScript

### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/playwright-template.git
cd playwright-template

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Set up environment
cp .env.example .env

# Run tests to verify setup
npm run test:api
```

---

## How to Contribute

### Ways to Contribute

1. **Report Bugs**: Open an issue describing the bug with steps to reproduce
2. **Suggest Features**: Open an issue describing the feature and its use case
3. **Improve Documentation**: Fix typos, clarify instructions, add examples
4. **Submit Code**: Fix bugs, add features, improve tests
5. **Review Pull Requests**: Provide feedback on open PRs

### What We're Looking For

- **Bug fixes**: Fixes for identified issues
- **Feature improvements**: Enhancements to existing features
- **Documentation**: Better guides, examples, and explanations
- **Test coverage**: More comprehensive test examples
- **Utilities**: Helpful utilities for common testing scenarios
- **CI/CD improvements**: Better workflows and automation

### What We're NOT Looking For

- Breaking changes without discussion
- Framework alternatives (this is a Playwright template)
- Project-specific implementations (keep it generic)
- Dependencies that significantly increase bundle size

---

## Development Workflow

### 1. Create a Branch

Follow the naming convention:

```bash
git checkout -b <type>/<description>
```

**Examples:**
- `feat/add-visual-testing`
- `fix/schema-validation-bug`
- `docs/update-setup-guide`
- `chore/update-dependencies`

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add/update tests if applicable
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Run formatting
npm run code:format

# Run tests
npm run test:all

# Or run specific tests
npm run test:api
npm run test:ui
```

### 4. Commit Your Changes

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: add visual regression testing support"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `perf`: Performance improvements
- `build`: Build system changes

### 5. Push and Create PR

```bash
git push origin your-branch-name
```

Then open a Pull Request on GitHub.

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] Linting and formatting checks pass
- [ ] Documentation is updated (if applicable)
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### PR Title Format

Follow the same convention as commits:

```
<type>(<optional scope>): <description>
```

**Examples:**
- `feat: add Allure reporting integration`
- `fix(api): resolve authentication token issue`
- `docs: improve template setup guide`

### PR Description

Use this template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Other (describe)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Tests pass
- [ ] Linting passes
- [ ] Documentation updated
- [ ] Breaking changes documented
```

### Review Process

1. **Automated Checks**: CI will run tests, linting, and formatting checks
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

---

## Coding Standards

### TypeScript

```typescript
// Use explicit types
function createUser(email: string, password: string): User {
	return { email, password };
}

// Use interfaces for objects
interface User {
	email: string;
	password: string;
}

// Use enums for constants
enum UserRole {
	Admin = "admin",
	User = "user",
}

// Use async/await over promises
async function fetchData() {
	const response = await api.get("/data");
	return response.json();
}
```

### File Organization

```
tests/
├── api-tests/           # API tests
│   └── feature/         # Group by feature
├── ui-tests/            # UI tests
│   ├── feature/         # Test scenarios
│   └── pages/           # Page objects
├── utils/               # Utilities (keep generic)
├── helpers/             # Helper functions
└── fixtures.ts          # Test fixtures
```

### Naming Conventions

- **Files**: `kebab-case.ts` or `PascalCase/index.ts` for page objects
- **Functions**: `camelCase`
- **Classes**: `PascalCase`
- **Constants**: `SCREAMING_SNAKE_CASE`
- **Interfaces/Types**: `PascalCase`

### Code Style

- Use tabs for indentation (configured in Biome)
- Double quotes for strings
- Trailing commas
- Max line length: 120 characters
- Arrow functions for callbacks
- Template literals over string concatenation

### Comments

```typescript
/**
 * JSDoc for functions and classes
 * @param email - User's email address
 * @returns User object
 */
function createUser(email: string): User {
	// Inline comments for complex logic
	const sanitizedEmail = email.toLowerCase().trim();
	
	return { email: sanitizedEmail };
}
```

---

## Commit Convention

### Format

```
<type>(<optional scope>): <subject>

<optional body>

<optional footer>
```

### Examples

```
feat: add support for visual regression testing

Added screenshot comparison utilities and example tests
for visual regression testing using Playwright's built-in
screenshot capabilities.
```

```
fix(api): resolve token expiration handling

Previously, expired tokens would cause tests to fail silently.
Now properly catches and handles token expiration errors.

Fixes #123
```

```
docs: update README with new features

- Added visual testing section
- Updated configuration examples
- Fixed typos in setup guide
```

### Scopes

Common scopes:
- `api`: API testing related
- `ui`: UI testing related
- `config`: Configuration changes
- `ci`: CI/CD changes
- `deps`: Dependency updates

---

## Testing Guidelines

### Writing Tests

- **Be descriptive**: Test names should clearly describe what they test
- **Be independent**: Tests should not depend on each other
- **Be deterministic**: Tests should produce the same results every time
- **Be fast**: Avoid unnecessary waits and delays

### Example Test Structure

```typescript
import { test } from "@fixtures";
import { expect } from "@playwright/test";

test.describe("Feature Name", () => {
	test.beforeEach(async ({ page }) => {
		// Setup
	});

	test("should do something specific", async ({ api, endpoints }) => {
		// Arrange
		const testData = { /* ... */ };

		// Act
		const response = await api
			.path(endpoints.resource)
			.body(testData)
			.postRequest(201);

		// Assert
		expect(response.ok()).toBeTruthy();
	});

	test.afterEach(async () => {
		// Cleanup
	});
});
```

---

## Documentation Guidelines

### README Updates

- Keep it clear and concise
- Include code examples
- Update table of contents
- Test all commands

### Code Documentation

- Document complex logic
- Explain "why" not just "what"
- Keep comments up to date
- Use JSDoc for public APIs

---

## Questions or Need Help?

- **Issues**: [GitHub Issues](https://github.com/acahet/playwright-template/issues)
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainers if needed

---

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes (for significant contributions)
- Documentation (for major features)

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
