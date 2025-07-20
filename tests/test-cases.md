# Leasey.AI QA Automation - Test Suite Description

## ✅ What was tested?

### Companies
- Creating a company with:
  - Invalid email (HTML5 validation)
  - Very long names (2000+ chars)
  - Very short names (2 char)
  - SQL injection attempt (e.g., `'; DROP TABLE ...`)

### Properties
- Creating a property with:
  - Negative price (validation rejected)
  - Price = 0 (rejected)
  - Missing required fields (name, address, price)
  - No company selected
  - Special characters in property name

## 🧪 Tools & Frameworks
- [Playwright](https://playwright.dev) with TypeScript
- Page Object Model (POM) design pattern
- GitHub Actions CI (via `.github/workflows/CI.yml`)

## ⚠️ Known Limitations
- Native HTML5 validation used (some messages are not DOM-accessible)
- Data is in-memory only — all test data resets after app restart

## 📌 Notes
- All tests follow Playwright best practices and use stable selectors
- Easily extendable with more CRUD and UI regression scenarios
