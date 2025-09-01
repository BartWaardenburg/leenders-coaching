/**
 * @name Broken Links Detection
 * @description Detects potential broken links, imports, and references in the codebase
 * @kind problem
 * @id js/broken-links
 * @problem.severity warning
 * @precision medium
 * @tags maintainability
 *       external/cwe/cwe-404
 */

import javascript

/**
 * A broken link or reference that could cause runtime errors or maintenance issues.
 */
class BrokenLink extends DataFlow::Node {
  BrokenLink() {
    exists(DataFlow::CallNode call |
      // Detect broken import statements
      (call.getCalleeName() = "require" and
       call.getArgument(0).asExpr() instanceof ConstantString and
       not isValidModulePath(call.getArgument(0).asExpr().getStringValue()))
      or
      // Detect broken dynamic imports
      (call.getCalleeName() = "import" and
       call.getArgument(0).asExpr() instanceof ConstantString and
       not isValidModulePath(call.getArgument(0).asExpr().getStringValue()))
      or
      // Detect broken file references in Next.js
      (call.getCalleeName() = "readFileSync" and
       call.getArgument(0).asExpr() instanceof ConstantString and
       not isValidFilePath(call.getArgument(0).asExpr().getStringValue()))
    )
  }
}

/**
 * A broken URL reference that could cause network errors.
 */
class BrokenUrl extends DataFlow::Node {
  BrokenUrl() {
    exists(DataFlow::CallNode call |
      // Detect broken fetch URLs
      (call.getCalleeName() = "fetch" and
       call.getArgument(0).asExpr() instanceof ConstantString and
       not isValidUrl(call.getArgument(0).asExpr().getStringValue()))
      or
      // Detect broken axios URLs
      (call.getCalleeName() = "get" and
       call.getArgument(0).asExpr() instanceof ConstantString and
       not isValidUrl(call.getArgument(0).asExpr().getStringValue()))
    )
  }
}

/**
 * A broken internal link reference in Next.js routing.
 */
class BrokenInternalLink extends DataFlow::Node {
  BrokenInternalLink() {
    exists(DataFlow::CallNode call |
      // Detect broken Next.js router.push calls
      (call.getCalleeName() = "push" and
       call.getArgument(0).asExpr() instanceof ConstantString and
       not isValidNextJsRoute(call.getArgument(0).asExpr().getStringValue()))
      or
      // Detect broken Link component hrefs
      (call.getCalleeName() = "Link" and
       call.getArgument(0).asExpr() instanceof ConstantString and
       not isValidNextJsRoute(call.getArgument(0).asExpr().getStringValue()))
    )
  }
}

/**
 * Checks if a module path is valid.
 */
predicate isValidModulePath(string path) {
  // Valid npm package names
  path.regexpMatch("^[a-zA-Z0-9@][a-zA-Z0-9._-]*$")
  or
  // Valid relative paths
  path.regexpMatch("^[\\./][a-zA-Z0-9._/-]*$")
  or
  // Valid absolute paths (for Node.js built-ins)
  path.regexpMatch("^[a-zA-Z0-9._-]+$")
}

/**
 * Checks if a file path is valid.
 */
predicate isValidFilePath(string path) {
  // Valid file paths
  path.regexpMatch("^[a-zA-Z0-9._/-]+$")
  or
  // Valid relative paths
  path.regexpMatch("^[\\./][a-zA-Z0-9._/-]*$")
}

/**
 * Checks if a URL is valid.
 */
predicate isValidUrl(string url) {
  // Valid HTTP/HTTPS URLs
  url.regexpMatch("^https?://[a-zA-Z0-9._-]+(\\.[a-zA-Z0-9._-]+)*([/\\?][a-zA-Z0-9._-]*)*$")
  or
  // Valid relative URLs
  url.regexpMatch("^[/][a-zA-Z0-9._-]*$")
  or
  // Valid anchor links
  url.regexpMatch("^#[a-zA-Z0-9._-]*$")
}

/**
 * Checks if a Next.js route is valid.
 */
predicate isValidNextJsRoute(string route) {
  // Valid Next.js routes
  route.regexpMatch("^[/][a-zA-Z0-9._-]*$")
  or
  // Valid dynamic routes
  route.regexpMatch("^[/][a-zA-Z0-9._-]*\\[[a-zA-Z0-9._-]+\\][a-zA-Z0-9._-]*$")
  or
  // Valid catch-all routes
  route.regexpMatch("^[/][a-zA-Z0-9._-]*\\[\\.\\.\\.[a-zA-Z0-9._-]+\\][a-zA-Z0-9._-]*$")
}

from BrokenLink brokenLink, DataFlow::CallNode call
where call.getCalleeName() = "require" and
      brokenLink = call.getArgument(0)
select brokenLink, "Potentially broken module import: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().getStringValue()

from BrokenLink brokenLink, DataFlow::CallNode call
where call.getCalleeName() = "import" and
      brokenLink = call.getArgument(0)
select brokenLink, "Potentially broken dynamic import: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().getStringValue()

from BrokenUrl brokenUrl, DataFlow::CallNode call
where call.getCalleeName() = "fetch" and
      brokenUrl = call.getArgument(0)
select brokenUrl, "Potentially broken URL in fetch call: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().getStringValue()

from BrokenInternalLink brokenLink, DataFlow::CallNode call
where call.getCalleeName() = "push" and
      brokenLink = call.getArgument(0)
select brokenLink, "Potentially broken internal route: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().getStringValue()
