/**
 * @name Taint Tracking Broken Links
 * @description Detects broken links and references using taint tracking analysis
 * @kind path-problem
 * @id js/taint-broken-links
 * @problem.severity warning
 * @precision medium
 * @tags maintainability
 *       external/cwe/cwe-404
 */

import javascript

/**
 * Configuration for tracking broken links through taint analysis.
 */
module BrokenLinksConfig implements DataFlow::ConfigSig {
  predicate isSource(DataFlow::Node source) {
    // Sources are string literals that might be broken links
    exists(ConstantString str |
      source.asExpr() = str and
      (
        // Potentially broken module paths
        (str.getStringValue().regexpMatch("^[^a-zA-Z0-9@/.]") and
         str.getStringValue().regexpMatch(".*[a-zA-Z0-9].*"))
        or
        // Potentially broken URLs
        (str.getStringValue().regexpMatch("^[^h]") and
         str.getStringValue().regexpMatch(".*[a-zA-Z0-9].*"))
        or
        // Potentially broken file paths
        (str.getStringValue().regexpMatch("^[^a-zA-Z0-9./]") and
         str.getStringValue().regexpMatch(".*[a-zA-Z0-9].*"))
      )
    )
  }

  predicate isSink(DataFlow::Node sink) {
    // Sinks are function calls that use the potentially broken links
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      (
        // Module imports
        call.getCalleeName() = "require"
        or
        call.getCalleeName() = "import"
        or
        // File operations
        call.getCalleeName() = "readFileSync"
        or
        call.getCalleeName() = "readFile"
        or
        call.getCalleeName() = "writeFileSync"
        or
        call.getCalleeName() = "writeFile"
        or
        // Network requests
        call.getCalleeName() = "fetch"
        or
        call.getCalleeName() = "get"
        or
        call.getCalleeName() = "post"
        or
        // Next.js routing
        call.getCalleeName() = "push"
        or
        call.getCalleeName() = "replace"
        or
        call.getCalleeName() = "prefetch"
      )
    )
  }

  predicate isAdditionalFlowStep(DataFlow::Node pred, DataFlow::Node succ) {
    // Add flow through string concatenation
    exists(StringOps::Concatenation concat |
      pred = concat.getAnOperand() and
      succ = concat
    )
    or
    // Add flow through template literals
    exists(TemplateLiteral tl |
      pred = tl.getAStringPart() and
      succ = tl
    )
    or
    // Add flow through property access (for dynamic imports)
    exists(DataFlow::PropRead pr |
      pred = pr.getBase() and
      succ = pr
    )
  }

  predicate isBarrier(DataFlow::Node node) {
    // Sanitizers that validate or clean URLs/paths
    exists(DataFlow::CallNode call |
      node = call and
      (
        call.getCalleeName() = "path.resolve"
        or
        call.getCalleeName() = "path.join"
        or
        call.getCalleeName() = "url.parse"
        or
        call.getCalleeName() = "url.resolve"
        or
        call.getCalleeName() = "encodeURI"
        or
        call.getCalleeName() = "encodeURIComponent"
        or
        call.getCalleeName() = "decodeURI"
        or
        call.getCalleeName() = "decodeURIComponent"
      )
    )
  }
}

module BrokenLinksFlow = TaintTracking::Global<BrokenLinksConfig>;

from DataFlow::Node source, DataFlow::Node sink
where BrokenLinksFlow::flow(source, sink)
select sink, "Potentially broken link flows from $@ to $@", source, source.toString(), sink, sink.toString()
