# 🚀 GitHub Actions Workflows

This repository uses a comprehensive CI/CD pipeline designed with enterprise-grade best practices. The workflow architecture ensures code quality, security, and reliable deployments across our monorepo structure.

## 📋 Workflow Overview

| Workflow                                          | Trigger             | Purpose                                      | Duration |
| ------------------------------------------------- | ------------------- | -------------------------------------------- | -------- |
| [Continuous Integration](#continuous-integration) | Pull Requests       | Fast feedback loop                           | ~10 min  |
| [Build & Test Pipeline](#build--test-pipeline)    | Main/Develop pushes | Comprehensive testing                        | ~20 min  |
| [Visual Testing](#visual-testing--design-system)  | Component changes   | Visual regression & design system validation | ~15 min  |
| [Quality Gates](#quality-gates--security)         | Daily/On-demand     | Security audits & dependency analysis        | ~15 min  |

## 🔄 Continuous Integration

**File:** `ci.yml`  
**Triggers:** Pull requests to `main` or `develop`

Fast, parallel quality checks that provide immediate feedback:

- **Quality Gate**: Linting and type checking across all packages
- **Frontend Tests**: Unit tests with coverage reporting
- **Studio Validation**: Sanity schema validation and build verification
- **Build Verification**: Ensures all packages build successfully

### Features:

- ⚡ **Intelligent caching** with pnpm store optimization
- 🔀 **Parallel execution** for maximum speed
- 📊 **Coverage reporting** to Codecov
- ✅ **Build artifact verification**

## 🏗️ Build & Test Pipeline

**File:** `build-and-test.yml`  
**Triggers:** Pushes to `main` or `develop` branches

Comprehensive testing and production-ready build validation:

- **Test & Coverage Analysis**: Full test suite with security audits
- **Production Build**: Matrix builds for both frontend and studio
- **Content Validation**: Sanity schema extraction and type generation
- **Security Analysis**: Dependency auditing and vulnerability scanning
- **Deployment Readiness**: Final validation for production deployment

### Features:

- 🎯 **Matrix strategy** for parallel package builds
- 📦 **Build artifact management** with compression
- 🔒 **Security scanning** with configurable severity levels
- 📈 **Bundle analysis** for performance monitoring
- 🚀 **Deployment readiness** validation

## 🎨 Visual Testing & Design System

**File:** `visual-testing.yml`  
**Triggers:** Changes to components, stories, or Storybook configuration

Ensures visual consistency and design system integrity:

- **Visual Regression Testing**: Chromatic integration with smart change detection
- **Accessibility Testing**: Automated a11y validation for components
- **Performance Testing**: Component bundle analysis and optimization
- **Design System Validation**: Tailwind CSS configuration and token validation

### Features:

- 🎯 **Smart change detection** - only runs on relevant file changes
- ♿ **Accessibility compliance** with automated testing
- 📊 **Performance metrics** for component library
- 🎨 **Design token validation** and consistency checks

## 🛡️ Quality Gates & Security

**File:** `quality-gates.yml`  
**Triggers:** Daily schedule, dependency changes, manual dispatch

Maintains code quality and security standards:

- **Security Audit**: Dependency vulnerability scanning
- **License Compliance**: License validation and reporting
- **Dependency Analysis**: Outdated package detection and deduplication
- **Code Quality Metrics**: ESLint analysis and complexity measurement
- **Performance Benchmarks**: Build time and bundle size tracking

### Features:

- 🔒 **Configurable security levels** (info → critical)
- 📜 **License compliance** monitoring
- 📊 **Quality metrics** tracking over time
- ⚡ **Performance benchmarking** with trend analysis
- 🤖 **Automated PR comments** for security issues

## 🏗️ Architecture Principles

### 🎯 **Fail Fast Strategy**

Workflows are designed to fail quickly on fundamental issues, providing rapid feedback to developers.

### ⚡ **Intelligent Caching**

Multi-layered caching strategy:

- pnpm store caching across workflows
- Next.js build cache optimization
- Storybook build caching for visual tests

### 🔄 **Parallel Execution**

Jobs run in parallel where possible to minimize total pipeline time while maintaining dependencies.

### 🔒 **Security First**

All workflows include security considerations:

- Dependency scanning
- Secret management
- Minimal permission scopes

### 📊 **Observability**

Comprehensive reporting and artifact collection:

- Coverage reports to Codecov
- Build artifacts for debugging
- Performance metrics tracking
- Quality trend analysis

## 🛠️ Package Integration

### Frontend (`leenders-coaching-nl`)

- Next.js application with React 19
- Storybook component library
- Vitest testing framework
- TypeScript strict mode
- Tailwind CSS design system

### Studio (`studio-leenders-coaching-nl`)

- Sanity CMS configuration
- Schema validation and type generation
- Content seeding scripts
- Build verification

## 📈 Performance Metrics

| Metric         | Target          | Monitoring   |
| -------------- | --------------- | ------------ |
| CI Pipeline    | < 10 minutes    | ✅ Automated |
| Build Pipeline | < 20 minutes    | ✅ Automated |
| Test Coverage  | > 80%           | ✅ Codecov   |
| Security Audit | 0 high/critical | ✅ Daily     |
| Bundle Size    | Trend tracking  | ✅ Weekly    |

## 🚀 Deployment Strategy

### Development Flow

1. **PR Created** → CI pipeline validates changes
2. **PR Merged** → Full build and test pipeline
3. **Visual Changes** → Chromatic visual testing
4. **Dependencies** → Security and quality gates

### Production Readiness

The `deployment-readiness` job in the build pipeline validates:

- ✅ All tests passing
- ✅ Builds successful for all packages
- ✅ Security audit clean
- ✅ Content validation complete

## 📋 Maintenance

### Daily Tasks (Automated)

- Security audit scanning
- Dependency update checks
- Performance benchmarking

### Weekly Tasks

- Review quality metrics trends
- Analyze bundle size changes
- Update security policies if needed

### Monthly Tasks

- Review and update workflow configurations
- Analyze performance trends
- Update documentation

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_SANITY_*`: Sanity CMS configuration
- `RESEND_API_KEY`: Email service integration
- `CODECOV_TOKEN`: Coverage reporting
- `CHROMATIC_PROJECT_TOKEN`: Visual testing

### Secrets Management

All sensitive data is stored in GitHub Secrets with minimal access scopes.

---

**Designed for excellence** • **Built for scale** • **Optimized for developer experience**
