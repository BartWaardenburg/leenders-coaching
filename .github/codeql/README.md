# CodeQL Security Analysis for Next.js TypeScript Project

This directory contains the CodeQL configuration and custom queries for comprehensive security and code quality analysis of the Leenders Coaching Next.js TypeScript project.

## Overview

CodeQL is GitHub's semantic code analysis engine that finds security vulnerabilities and code quality issues. This setup is specifically tailored for Next.js TypeScript projects and leverages both built-in CodeQL queries and custom project-specific rules.

### Key Features

- **Comprehensive Security Analysis**: Detects 50+ types of security vulnerabilities
- **Built-in Query Integration**: Leverages GitHub's security-extended and security-and-quality suites
- **Custom Next.js Rules**: Project-specific security and quality checks
- **TypeScript Best Practices**: Enforces TypeScript coding standards
- **Broken Link Detection**: Finds potential broken imports, URLs, and references
- **Performance Optimization**: Focused analysis with minimal false positives

## Files Structure

```
.github/codeql/
├── README.md                           # This file
├── codeql-config.yml                   # Main CodeQL configuration
├── data-extensions.yml                 # Custom library models
└── custom-queries/
    ├── broken-links.ql                 # Basic broken link detection
    ├── taint-broken-links.ql           # Advanced taint tracking for broken links
    ├── nextjs-security.ql              # Next.js specific security vulnerabilities
    ├── typescript-best-practices.ql    # TypeScript code quality checks
    └── comprehensive-security.ql       # Comprehensive security analysis
```

## Built-in CodeQL Queries

This setup leverages GitHub's comprehensive set of built-in queries:

### Security Vulnerabilities (50+ types)

- **XSS**: Cross-site scripting vulnerabilities
- **SQL Injection**: Database query injection
- **Command Injection**: Shell command injection
- **Path Traversal**: File system access vulnerabilities
- **Open Redirect**: URL redirection vulnerabilities
- **SSRF**: Server-side request forgery
- **CSRF**: Cross-site request forgery
- **Prototype Pollution**: Object manipulation vulnerabilities
- **Deserialization**: Unsafe object deserialization
- **Resource Exhaustion**: Memory and CPU exhaustion attacks

### Code Quality Issues

- **Inefficient Regular Expressions**: Performance issues
- **Missing Security Headers**: Security configuration gaps
- **Unsafe Crypto**: Weak cryptographic implementations
- **Information Exposure**: Sensitive data leaks
- **Input Validation**: Missing input sanitization

## Configuration

### Main Configuration (`codeql-config.yml`)

The main configuration file defines:

- **Query Suites**: Uses `security-extended` and `security-and-quality` from GitHub
- **Custom Queries**: Includes project-specific queries for Next.js and TypeScript
- **Path Filters**: Focuses analysis on source code, excludes test files and build artifacts
- **Threat Models**: Includes both remote and local threat models
- **Query Filters**: Reduces false positives by excluding experimental and low-precision queries
- **CWE Focus**: Prioritizes high-impact security issues (CWE-079, CWE-089, CWE-078, etc.)

### Custom Queries

#### 1. Broken Links Detection (`broken-links.ql`)

Detects potential broken links and references:

- **Module Imports**: Invalid `require()` and `import()` statements
- **File References**: Broken file paths in file operations
- **URL References**: Invalid URLs in network requests
- **Internal Routes**: Broken Next.js routing paths

#### 2. Taint Tracking Broken Links (`taint-broken-links.ql`)

Advanced analysis using taint tracking to find broken links that flow through variables and function calls.

#### 3. Next.js Security (`nextjs-security.ql`)

Detects common security vulnerabilities in Next.js applications:

- **XSS Vulnerabilities**: `dangerouslySetInnerHTML` usage
- **SQL Injection**: Unsafe database queries
- **Command Injection**: Unsafe command execution
- **Path Traversal**: Unsafe file operations
- **Hardcoded Secrets**: Sensitive information in code
- **Unsafe Redirects**: Open redirect vulnerabilities
- **Header Injection**: Unsafe HTTP headers
- **Cookie Injection**: Unsafe cookie values
- **File Upload Vulnerabilities**: Unsafe file uploads

#### 4. TypeScript Best Practices (`typescript-best-practices.ql`)

Identifies TypeScript code quality issues:

- **Type Safety**: Usage of `any` type
- **Unused Code**: Unused imports and variables
- **Unsafe Assertions**: Non-null and type assertions
- **Production Code**: Console.log statements
- **Type Annotations**: Missing return and parameter types
- **Memory Leaks**: Event listener issues
- **Performance**: Synchronous file operations
- **Race Conditions**: Async operation issues
- **Code Quality**: Magic numbers and null dereferences

#### 5. Comprehensive Security Analysis (`comprehensive-security.ql`)

Advanced taint tracking analysis that combines multiple security checks:

- **Multi-Vector Analysis**: Detects vulnerabilities across different attack vectors
- **Sanitization Awareness**: Recognizes proper input validation and sanitization
- **Flow Tracking**: Follows data flow through complex application logic
- **Library Integration**: Works with common security libraries (Zod, Joi, etc.)

## GitHub Actions Workflow

The CodeQL analysis runs automatically via GitHub Actions (`.github/workflows/codeql-analysis.yml`):

### Triggers

- **Push**: Runs on pushes to `main` and `develop` branches
- **Pull Request**: Runs on PRs to `main` and `develop` branches
- **Schedule**: Runs weekly on Mondays at 00:00 UTC

### Jobs

#### 1. CodeQL Analysis

- Initializes CodeQL with JavaScript/TypeScript support
- Runs autobuild to compile the project
- Executes all configured queries (built-in + custom)
- Uploads results to GitHub Code Scanning

#### 2. Security and Quality Checks

- **Dependency Audit**: Checks for known vulnerabilities
- **Outdated Dependencies**: Identifies packages that need updates
- **Type Checking**: Runs TypeScript compiler
- **Linting**: Executes ESLint rules
- **Documentation Links**: Checks for broken links in docs
- **Environment Variables**: Scans for hardcoded secrets
- **Unsafe Patterns**: Detects dangerous code patterns
- **TypeScript Best Practices**: Validates TypeScript usage
- **Security Headers**: Checks for proper security configurations
- **Authentication Patterns**: Validates auth/authorization setup
- **Input Validation**: Checks for proper input sanitization
- **File Upload Security**: Validates file upload handling
- **Database Security**: Checks for SQL injection prevention

## Best Practices

### Security

1. **Environment Variables**: Always use `NEXT_PUBLIC_` prefix for client-side variables
2. **Input Validation**: Validate all user inputs before processing using libraries like Zod
3. **Output Encoding**: Properly encode output to prevent XSS
4. **Dependencies**: Regularly update dependencies and audit for vulnerabilities
5. **Secrets**: Never commit secrets to version control
6. **Security Headers**: Implement proper security headers (Helmet.js)
7. **CORS**: Configure CORS properly for your application
8. **Rate Limiting**: Implement rate limiting for API endpoints
9. **CSRF Protection**: Use CSRF tokens for state-changing operations
10. **File Uploads**: Validate and sanitize all file uploads

### TypeScript

1. **Type Safety**: Avoid using `any` type, prefer specific types
2. **Type Annotations**: Always provide return types and parameter types
3. **Null Safety**: Use optional chaining and nullish coalescing
4. **Imports**: Remove unused imports
5. **Variables**: Remove unused variables (prefix with `_` if intentionally unused)
6. **Assertions**: Use type guards instead of type assertions when possible
7. **Error Handling**: Implement proper error boundaries and error handling

### Next.js

1. **Routing**: Use Next.js routing instead of client-side navigation
2. **API Routes**: Validate inputs in API routes
3. **Static Generation**: Use SSG/ISR for better performance
4. **Environment Variables**: Use proper environment variable handling
5. **Error Boundaries**: Implement error boundaries for better UX
6. **Security Headers**: Use Next.js security headers
7. **Image Optimization**: Use Next.js Image component for optimization
8. **Bundle Analysis**: Regularly analyze bundle size and optimize

## Running Locally

To run CodeQL analysis locally:

1. **Install CodeQL CLI**:

   ```bash
   npm install -g @github/codeql/cli
   ```

2. **Create Database**:

   ```bash
   codeql database create db --language=javascript
   ```

3. **Run Analysis**:

   ```bash
   codeql database analyze db .github/codeql/custom-queries/*.ql --format=sarif-latest --output=results.sarif
   ```

4. **View Results**:
   ```bash
   codeql bqrs decode --format=csv results.bqrs
   ```

## Interpreting Results

### Severity Levels

- **Error**: Critical security vulnerabilities
- **Warning**: Potential security issues or code quality problems
- **Note**: Informational findings

### Precision Levels

- **Very High**: Very few false positives
- **High**: Low false positive rate
- **Medium**: Some false positives expected
- **Low**: Many false positives expected

### Common False Positives

1. **Legitimate `any` usage**: Some third-party libraries require `any` types
2. **Console.log in development**: Development-only logging
3. **Hardcoded values**: Configuration constants
4. **Type assertions**: Necessary type conversions
5. **Sanitized inputs**: Properly validated and sanitized user inputs
6. **Test files**: Code in test files that intentionally tests edge cases

## Performance Optimization

### Query Selection

- Uses focused query filters to reduce analysis time
- Excludes low-precision and experimental queries
- Prioritizes high-impact security issues

### Path Filtering

- Excludes test files, build artifacts, and dependencies
- Focuses analysis on source code only
- Reduces false positives from generated code

### Caching

- Leverages GitHub Actions caching for dependencies
- Uses incremental analysis where possible
- Optimizes database creation and query execution

## Customization

### Adding New Queries

1. Create a new `.ql` file in `custom-queries/`
2. Follow the query template with proper metadata
3. Add the query to `codeql-config.yml`
4. Test locally before committing

### Modifying Existing Queries

1. Update the query logic in the `.ql` file
2. Test with local CodeQL database
3. Update documentation if needed

### Configuration Changes

1. Modify `codeql-config.yml` for global changes
2. Update workflow file for CI/CD changes
3. Test changes in a feature branch first

## Troubleshooting

### Common Issues

1. **Build Failures**: Check autobuild configuration
2. **Timeout Errors**: Increase timeout in workflow
3. **Memory Issues**: Reduce query complexity or split analysis
4. **False Positives**: Adjust query precision or add filters

### Performance Optimization

1. **Path Filters**: Exclude unnecessary directories
2. **Query Selection**: Use specific queries instead of full suites
3. **Database Size**: Limit analysis scope
4. **Caching**: Use GitHub Actions caching

## Resources

- [CodeQL Documentation](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors)
- [CodeQL Query Writing](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/writing-codeql-queries)
- [Built-in JavaScript/TypeScript Queries](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/exploring-the-alerts-in-a-repository#viewing-the-alerts-for-a-repository)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
