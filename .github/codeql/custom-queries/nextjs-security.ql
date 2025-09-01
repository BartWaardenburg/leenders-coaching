/**
 * @name Next.js Security Vulnerabilities
 * @description Detects common security vulnerabilities in Next.js applications
 * @kind problem
 * @id js/nextjs-security
 * @problem.severity warning
 * @precision medium
 * @tags security
 *       external/cwe/cwe-79
 *       external/cwe/cwe-89
 *       external/cwe/cwe-78
 */

import javascript

/**
 * Detects XSS vulnerabilities through dangerouslySetInnerHTML
 */
class XSSDangerouslySetInnerHTML extends DataFlow::Node {
  XSSDangerouslySetInnerHTML() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "dangerouslySetInnerHTML" and
      this = call.getArgument(0)
    )
  }
}

/**
 * Detects SQL injection vulnerabilities in database queries
 */
class SQLInjection extends DataFlow::Node {
  SQLInjection() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "query" or
       call.getCalleeName() = "execute" or
       call.getCalleeName() = "run") and
      this = call.getArgument(0)
    )
  }
}

/**
 * Detects command injection vulnerabilities
 */
class CommandInjection extends DataFlow::Node {
  CommandInjection() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "exec" or
       call.getCalleeName() = "spawn" or
       call.getCalleeName() = "execSync") and
      this = call.getArgument(0)
    )
  }
}

/**
 * Detects path traversal vulnerabilities
 */
class PathTraversal extends DataFlow::Node {
  PathTraversal() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "readFile" or
       call.getCalleeName() = "readFileSync" or
       call.getCalleeName() = "writeFile" or
       call.getCalleeName() = "writeFileSync") and
      this = call.getArgument(0)
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
       str.getStringValue().regexpMatch(".*private_key.*"))
    )
  }
}

/**
 * Detects unsafe environment variable usage
 */
class UnsafeEnvVar extends DataFlow::Node {
  UnsafeEnvVar() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "process.env" and
      this = call.getArgument(0) and
      not call.getArgument(0).asExpr().getStringValue().regexpMatch("NEXT_PUBLIC_.*")
    )
  }
}

/**
 * Detects unsafe redirects
 */
class UnsafeRedirect extends DataFlow::Node {
  UnsafeRedirect() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "redirect" or
       call.getCalleeName() = "permanentRedirect") and
      this = call.getArgument(0)
    )
  }
}

/**
 * Detects unsafe headers
 */
class UnsafeHeader extends DataFlow::Node {
  UnsafeHeader() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "setHeader" and
      this = call.getArgument(1)
    )
  }
}

/**
 * Detects unsafe cookies
 */
class UnsafeCookie extends DataFlow::Node {
  UnsafeCookie() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "setCookie" or
       call.getCalleeName() = "cookies.set") and
      this = call.getArgument(1)
    )
  }
}

/**
 * Detects unsafe file uploads
 */
class UnsafeFileUpload extends DataFlow::Node {
  UnsafeFileUpload() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "upload" or
       call.getCalleeName() = "multer") and
      this = call.getArgument(0)
    )
  }
}

from XSSDangerouslySetInnerHTML xss, DataFlow::CallNode call
where call.getCalleeName() = "dangerouslySetInnerHTML" and
      xss = call.getArgument(0)
select xss, "Potential XSS vulnerability: dangerouslySetInnerHTML with user-controlled content"

from SQLInjection sql, DataFlow::CallNode call
where (call.getCalleeName() = "query" or
       call.getCalleeName() = "execute" or
       call.getCalleeName() = "run") and
      sql = call.getArgument(0)
select sql, "Potential SQL injection: user-controlled input in database query"

from CommandInjection cmd, DataFlow::CallNode call
where (call.getCalleeName() = "exec" or
       call.getCalleeName() = "spawn" or
       call.getCalleeName() = "execSync") and
      cmd = call.getArgument(0)
select cmd, "Potential command injection: user-controlled input in command execution"

from PathTraversal path, DataFlow::CallNode call
where (call.getCalleeName() = "readFile" or
       call.getCalleeName() = "readFileSync" or
       call.getCalleeName() = "writeFile" or
       call.getCalleeName() = "writeFileSync") and
      path = call.getArgument(0)
select path, "Potential path traversal: user-controlled input in file operation"

from HardcodedSecret secret
select secret, "Hardcoded secret detected: $@", secret.asExpr(), secret.asExpr().getStringValue()

from UnsafeEnvVar env, DataFlow::CallNode call
where call.getCalleeName() = "process.env" and
      env = call.getArgument(0)
select env, "Unsafe environment variable usage: $@", call.getArgument(0).asExpr(), call.getArgument(0).asExpr().getStringValue()

from UnsafeRedirect redirect, DataFlow::CallNode call
where (call.getCalleeName() = "redirect" or
       call.getCalleeName() = "permanentRedirect") and
      redirect = call.getArgument(0)
select redirect, "Potential open redirect: user-controlled input in redirect"

from UnsafeHeader header, DataFlow::CallNode call
where call.getCalleeName() = "setHeader" and
      header = call.getArgument(1)
select header, "Potential header injection: user-controlled input in header value"

from UnsafeCookie cookie, DataFlow::CallNode call
where (call.getCalleeName() = "setCookie" or
       call.getCalleeName() = "cookies.set") and
      cookie = call.getArgument(1)
select cookie, "Potential cookie injection: user-controlled input in cookie value"

from UnsafeFileUpload upload, DataFlow::CallNode call
where (call.getCalleeName() = "upload" or
       call.getCalleeName() = "multer") and
      upload = call.getArgument(0)
select upload, "Potential unsafe file upload: user-controlled file input"
