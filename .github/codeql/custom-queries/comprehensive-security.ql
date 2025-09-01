/**
 * @name Comprehensive Security Analysis
 * @description Comprehensive security analysis combining multiple vulnerability checks
 * @kind problem
 * @id js/comprehensive-security
 * @problem.severity warning
 * @precision medium
 * @tags security
 *       external/cwe/cwe-079
 *       external/cwe/cwe-089
 *       external/cwe/cwe-078
 *       external/cwe/cwe-022
 *       external/cwe/cwe-601
 *       external/cwe/cwe-918
 */

import javascript

/**
 * Configuration for comprehensive security analysis using taint tracking
 */
module ComprehensiveSecurityConfig implements DataFlow::ConfigSig {
  predicate isSource(DataFlow::Node source) {
    // Remote flow sources
    exists(RemoteFlowSource rfs |
      source.asExpr() = rfs
    )
    or
    // HTTP request sources
    exists(HTTP::RequestInputAccess ria |
      source.asExpr() = ria
    )
    or
    // File system sources
    exists(FileNameSource fns |
      source.asExpr() = fns
    )
    or
    // Environment variables
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "process.env" and
      source = call
    )
  }

  predicate isSink(DataFlow::Node sink) {
    // Code injection sinks
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      (call.getCalleeName() = "eval" or
       call.getCalleeName() = "Function" or
       call.getCalleeName() = "setTimeout" or
       call.getCalleeName() = "setInterval")
    )
    or
    // SQL injection sinks
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      (call.getCalleeName() = "query" or
       call.getCalleeName() = "execute" or
       call.getCalleeName() = "run")
    )
    or
    // Command injection sinks
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      (call.getCalleeName() = "exec" or
       call.getCalleeName() = "spawn" or
       call.getCalleeName() = "execSync")
    )
    or
    // Path traversal sinks
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      (call.getCalleeName() = "readFile" or
       call.getCalleeName() = "readFileSync" or
       call.getCalleeName() = "writeFile" or
       call.getCalleeName() = "writeFileSync")
    )
    or
    // XSS sinks
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      call.getCalleeName() = "dangerouslySetInnerHTML"
    )
    or
    // Open redirect sinks
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      (call.getCalleeName() = "redirect" or
       call.getCalleeName() = "permanentRedirect")
    )
    or
    // SSRF sinks
    exists(DataFlow::CallNode call |
      sink = call.getArgument(0) and
      (call.getCalleeName() = "fetch" or
       call.getCalleeName() = "get" or
       call.getCalleeName() = "post")
    )
  }

  predicate isAdditionalFlowStep(DataFlow::Node pred, DataFlow::Node succ) {
    // String operations
    exists(StringOps::Concatenation concat |
      pred = concat.getAnOperand() and
      succ = concat
    )
    or
    // Template literals
    exists(TemplateLiteral tl |
      pred = tl.getAStringPart() and
      succ = tl
    )
    or
    // Property access
    exists(DataFlow::PropRead pr |
      pred = pr.getBase() and
      succ = pr
    )
    or
    // Array operations
    exists(DataFlow::ArrayLiteralNode aln |
      pred = aln.getElement() and
      succ = aln
    )
  }

  predicate isBarrier(DataFlow::Node node) {
    // Sanitization functions
    exists(DataFlow::CallNode call |
      node = call and
      (call.getCalleeName() = "encodeURIComponent" or
       call.getCalleeName() = "encodeURI" or
       call.getCalleeName() = "escape" or
       call.getCalleeName() = "path.resolve" or
       call.getCalleeName() = "path.join" or
       call.getCalleeName() = "url.parse" or
       call.getCalleeName() = "url.resolve")
    )
    or
    // Validation functions
    exists(DataFlow::CallNode call |
      node = call and
      (call.getCalleeName() = "zod" or
       call.getCalleeName() = "joi" or
       call.getCalleeName() = "yup" or
       call.getCalleeName() = "validator")
    )
  }
}

module ComprehensiveSecurityFlow = TaintTracking::Global<ComprehensiveSecurityConfig>;

/**
 * Detects potential security vulnerabilities using taint tracking
 */
class SecurityVulnerability extends DataFlow::Node {
  SecurityVulnerability() {
    exists(DataFlow::Node source, DataFlow::Node sink |
      ComprehensiveSecurityFlow::flow(source, sink) and
      this = sink
    )
  }
}

/**
 * Detects hardcoded secrets and sensitive information
 */
class HardcodedSecret extends DataFlow::Node {
  HardcodedSecret() {
    exists(ConstantString str |
      this.asExpr() = str and
      (str.getStringValue().regexpMatch(".*password.*") or
       str.getStringValue().regexpMatch(".*secret.*") or
       str.getStringValue().regexpMatch(".*key.*") or
       str.getStringValue().regexpMatch(".*token.*") or
       str.getStringValue().regexpMatch(".*api_key.*") or
       str.getStringValue().regexpMatch(".*private_key.*") or
       str.getStringValue().regexpMatch(".*access_token.*") or
       str.getStringValue().regexpMatch(".*refresh_token.*"))
    )
  }
}

/**
 * Detects missing security headers
 */
class MissingSecurityHeaders extends DataFlow::Node {
  MissingSecurityHeaders() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "setHeader" and
      this = call.getArgument(0) and
      not call.getArgument(0).asExpr().getStringValue().regexpMatch("(X-Content-Type-Options|X-Frame-Options|X-XSS-Protection|Strict-Transport-Security|Content-Security-Policy)")
    )
  }
}

/**
 * Detects unsafe CORS configuration
 */
class UnsafeCORS extends DataFlow::Node {
  UnsafeCORS() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "cors" and
      this = call.getArgument(0)
    )
  }
}

/**
 * Detects missing CSRF protection
 */
class MissingCSRF extends DataFlow::Node {
  MissingCSRF() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "post" and
      this = call
    )
  }
}

/**
 * Detects potential prototype pollution
 */
class PrototypePollution extends DataFlow::Node {
  PrototypePollution() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "Object.assign" and
      this = call.getArgument(0)
    )
  }
}

from SecurityVulnerability vuln, DataFlow::Node source, DataFlow::Node sink
where ComprehensiveSecurityFlow::flow(source, sink) and
      vuln = sink
select vuln, "Potential security vulnerability: user-controlled data flows from $@ to $@", source, source.toString(), sink, sink.toString()

from HardcodedSecret secret
select secret, "Hardcoded secret detected: $@", secret.asExpr(), secret.asExpr().getStringValue()

from MissingSecurityHeaders header, DataFlow::CallNode call
where call.getCalleeName() = "setHeader" and
      header = call.getArgument(0)
select header, "Missing security header: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().getStringValue()

from UnsafeCORS cors, DataFlow::CallNode call
where call.getCalleeName() = "cors" and
      cors = call.getArgument(0)
select cors, "Potentially unsafe CORS configuration: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().toString()

from MissingCSRF csrf, DataFlow::CallNode call
where call.getCalleeName() = "post" and
      csrf = call
select csrf, "Missing CSRF protection in POST request: $@", call, call.toString()

from PrototypePollution pollution, DataFlow::CallNode call
where call.getCalleeName() = "Object.assign" and
      pollution = call.getArgument(0)
select pollution, "Potential prototype pollution: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().toString()
