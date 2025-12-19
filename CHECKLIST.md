# Template Setup Checklist

Use this checklist when setting up a new project from this template.

## ✅ Initial Setup

- [ ] **Create repository from template**
  - Use GitHub's "Use this template" button, OR
  - Clone and remove `.git` directory

- [ ] **Install dependencies**
  ```bash
  npm install
  # or
  yarn install
  ```

- [ ] **Install Playwright browsers**
  ```bash
  npx playwright install chromium
  ```

---

## ⚙️ Configuration

- [ ] **Environment Variables**
  - [ ] Copy `.env.example` to `.env`
  - [ ] Update `API_URL` with your API endpoint
  - [ ] Update `EMAIL_API` with test user email
  - [ ] Update `PASSWORD_API` with test user password
  - [ ] Set `TEST_ENV` (qa, staging, prod)
  - [ ] Set `LOCALE` if using internationalization

- [ ] **Update `package.json`**
  - [ ] Change `name` to your project name
  - [ ] Update `description`
  - [ ] Update `repository` URL
  - [ ] Update `author` information
  - [ ] Update `license` if different from MIT

- [ ] **Update `playwright.config.ts`**
  - [ ] Change `baseURL` to your application URL
  - [ ] Adjust `retries` if needed
  - [ ] Update `reporter` paths if needed
  - [ ] Add/remove browser projects as needed

- [ ] **Update API Configuration**
  - [ ] Edit `tests/config/api-test.config.ts` for your environments
  - [ ] Update `tests/utils/constants.ts` with your API endpoints
  - [ ] Update `tests/helpers/createToken.ts` to match your auth API

---

## 🧹 Cleanup (Optional)

- [ ] **Remove example tests** (or keep as reference)
  - [ ] Delete `tests/api-tests/articles/`
  - [ ] Delete `tests/api-tests/tags/`
  - [ ] Delete `tests/api-tests/user/`
  - [ ] Delete `tests/ui-tests/feature/login/`
  - [ ] Delete `tests/ui-tests/pages/Homepage/`
  - [ ] Delete `tests/ui-tests/pages/LoginPage/`
  - [ ] Delete example schemas in `tests/response-schemas/`
  - [ ] Delete example request objects in `request-objects/`

- [ ] **Run template initialization script** (automated cleanup)
  ```bash
  npm run init-template
  ```

---

## 🧪 Create Your Tests

- [ ] **API Tests**
  - [ ] Create test directories in `tests/api-tests/`
  - [ ] Add your API endpoint tests
  - [ ] Create JSON schemas in `tests/response-schemas/`
  - [ ] Add request payloads in `request-objects/`

- [ ] **UI Tests**
  - [ ] Create page objects in `tests/ui-tests/pages/`
  - [ ] Add page objects to `tests/ui-tests/pages/index.ts`
  - [ ] Create test files in `tests/ui-tests/feature/`
  - [ ] Update fixtures if needed

- [ ] **Update Fixtures**
  - [ ] Add custom fixtures to `tests/fixtures.ts`
  - [ ] Export new page objects
  - [ ] Add custom utilities

---

## 🚀 CI/CD Setup

- [ ] **GitHub Actions**
  - [ ] Update `.github/workflows/playwright.yml` with your branches
  - [ ] Update `.github/workflows/lint.yml` if needed
  - [ ] Configure `.github/dependabot.yml` with your preferences

- [ ] **GitHub Secrets** (Repository Settings → Secrets)
  - [ ] Add `API_URL`
  - [ ] Add `EMAIL_API`
  - [ ] Add `PASSWORD_API`
  - [ ] Add any other environment-specific secrets

- [ ] **Branch Protection** (Optional)
  - [ ] Require PR reviews
  - [ ] Require status checks to pass
  - [ ] Require conventional commit format

---

## 📝 Documentation

- [ ] **Update README.md**
  - [ ] Update project title and description
  - [ ] Update badges with your repository info
  - [ ] Add project-specific instructions
  - [ ] Update author information
  - [ ] Add any custom features you've added

- [ ] **Update Documentation Files**
  - [ ] Review `TEMPLATE_SETUP.md` - remove if not needed
  - [ ] Review `PROJECT_CUSTOMIZATION.md` - keep for team reference
  - [ ] Update `CONTRIBUTING.md` with your guidelines
  - [ ] Remove or update `CHECKLIST.md` (this file)

- [ ] **Add Project Documentation**
  - [ ] Create API documentation if needed
  - [ ] Document test data requirements
  - [ ] Document environment setup
  - [ ] Add troubleshooting guide

---

## ✅ Verification

- [ ] **Run tests locally**
  ```bash
  npm run test:all
  ```

- [ ] **Check code quality**
  ```bash
  npm run lint
  npm run code:format:check
  ```

- [ ] **Verify Git hooks work**
  ```bash
  # Try making a commit to test pre-commit hooks
  git add .
  git commit -m "test: verify git hooks"
  ```

- [ ] **Test CI/CD pipeline**
  - [ ] Push to repository
  - [ ] Verify GitHub Actions run successfully
  - [ ] Check test reports are generated

---

## 🎯 Final Steps

- [ ] **Initialize Git** (if not already done)
  ```bash
  git init
  git add .
  git commit -m "chore: initialize project from template"
  git branch -M main
  git remote add origin your-repo-url
  git push -u origin main
  ```

- [ ] **Create first test**
  - [ ] Write your first API or UI test
  - [ ] Verify it runs successfully
  - [ ] Commit and push

- [ ] **Team Setup**
  - [ ] Share repository with team
  - [ ] Document project-specific setup steps
  - [ ] Set up team coding standards
  - [ ] Schedule code review sessions

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Template Setup Guide](TEMPLATE_SETUP.md)
- [Customization Guide](PROJECT_CUSTOMIZATION.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

## 🎉 You're Ready!

Once you've completed this checklist, you're ready to start writing tests!

**Next Steps:**
1. Write your first test
2. Run it to verify everything works
3. Set up your CI/CD pipeline
4. Share with your team

**Remove this file** once setup is complete, or keep it for team reference.

---

**Need help?** Check the documentation or open an issue on the template repository.
