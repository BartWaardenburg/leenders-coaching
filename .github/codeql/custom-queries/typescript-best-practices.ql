/**
 * @name TypeScript Best Practices
 * @description Detects TypeScript anti-patterns and code quality issues
 * @kind problem
 * @id js/typescript-best-practices
 * @problem.severity warning
 * @precision medium
 * @tags maintainability
 *       external/cwe/cwe-398
 */

import javascript

/**
 * Detects usage of 'any' type which defeats TypeScript's type safety
 */
class AnyTypeUsage extends DataFlow::Node {
  AnyTypeUsage() {
    exists(TypeAnnotation type |
      type.getTypeExpr().toString() = "any" and
      this = type.getAnnotatedNode()
    )
  }
}

/**
 * Detects unused imports that should be removed
 */
class UnusedImport extends DataFlow::Node {
  UnusedImport() {
    exists(ImportDeclaration import |
      this = import and
      not exists(import.getASpecifier().getLocalName().getAUse())
    )
  }
}

/**
 * Detects unused variables that should be removed
 */
class UnusedVariable extends DataFlow::Node {
  UnusedVariable() {
    exists(VariableDeclarator var |
      this = var and
      not exists(var.getAnId().getAUse()) and
      not var.getAnId().getName().regexpMatch("^_")
    )
  }
}

/**
 * Detects non-null assertions that might be unsafe
 */
class UnsafeNonNullAssertion extends DataFlow::Node {
  UnsafeNonNullAssertion() {
    exists(NonNullAssertion assertion |
      this = assertion.getOperand()
    )
  }
}

/**
 * Detects type assertions that might be unsafe
 */
class UnsafeTypeAssertion extends DataFlow::Node {
  UnsafeTypeAssertion() {
    exists(TypeAssertion assertion |
      this = assertion.getExpr()
    )
  }
}

/**
 * Detects console.log statements in production code
 */
class ConsoleLogInProduction extends DataFlow::Node {
  ConsoleLogInProduction() {
    exists(DataFlow::CallNode call |
      call.getCalleeName() = "console.log" and
      this = call
    )
  }
}

/**
 * Detects missing return types on functions
 */
class MissingReturnType extends DataFlow::Node {
  MissingReturnType() {
    exists(FunctionDeclaration func |
      this = func and
      not exists(func.getReturnTypeAnnotation())
    )
  }
}

/**
 * Detects missing parameter types
 */
class MissingParameterType extends DataFlow::Node {
  MissingParameterType() {
    exists(Parameter param |
      this = param and
      not exists(param.getTypeAnnotation())
    )
  }
}

/**
 * Detects potential memory leaks with event listeners
 */
class PotentialMemoryLeak extends DataFlow::Node {
  PotentialMemoryLeak() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "addEventListener" or
       call.getCalleeName() = "on") and
      this = call
    )
  }
}

/**
 * Detects synchronous file operations that could block the event loop
 */
class SynchronousFileOperation extends DataFlow::Node {
  SynchronousFileOperation() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "readFileSync" or
       call.getCalleeName() = "writeFileSync" or
       call.getCalleeName() = "existsSync" or
       call.getCalleeName() = "statSync") and
      this = call
    )
  }
}

/**
 * Detects potential race conditions with async operations
 */
class PotentialRaceCondition extends DataFlow::Node {
  PotentialRaceCondition() {
    exists(DataFlow::CallNode call |
      (call.getCalleeName() = "Promise.all" or
       call.getCalleeName() = "Promise.race") and
      this = call
    )
  }
}

/**
 * Detects hardcoded magic numbers
 */
class MagicNumber extends DataFlow::Node {
  MagicNumber() {
    exists(ConstantNumber num |
      this.asExpr() = num and
      num.getNumberValue() > 1000 and
      not exists(num.getParent().getParent().getParent().getParent().getParent().getParent().getParent().getParent().getParent().getParent())
    )
  }
}

/**
 * Detects potential null pointer dereferences
 */
class PotentialNullDereference extends DataFlow::Node {
  PotentialNullDereference() {
    exists(DataFlow::PropRead prop |
      this = prop and
      not exists(prop.getBase().getType().hasUnderlyingType("string"))
    )
  }
}

from AnyTypeUsage anyType
select anyType, "Avoid using 'any' type: $@", anyType.asExpr(), anyType.asExpr().toString()

from UnusedImport unusedImport
select unusedImport, "Unused import detected: $@", unusedImport.asExpr(), unusedImport.asExpr().toString()

from UnusedVariable unusedVar
select unusedVar, "Unused variable detected: $@", unusedVar.asExpr(), unusedVar.asExpr().toString()

from UnsafeNonNullAssertion unsafeAssertion
select unsafeAssertion, "Unsafe non-null assertion: $@", unsafeAssertion.asExpr(), unsafeAssertion.asExpr().toString()

from UnsafeTypeAssertion unsafeType
select unsafeType, "Unsafe type assertion: $@", unsafeType.asExpr(), unsafeType.asExpr().toString()

from ConsoleLogInProduction consoleLog
select consoleLog, "Console.log detected in production code: $@", consoleLog.asExpr(), consoleLog.asExpr().toString()

from MissingReturnType missingReturn
select missingReturn, "Function missing return type annotation: $@", missingReturn.asExpr(), missingReturn.asExpr().toString()

from MissingParameterType missingParam
select missingParam, "Parameter missing type annotation: $@", missingParam.asExpr(), missingParam.asExpr().toString()

from PotentialMemoryLeak memoryLeak
select memoryLeak, "Potential memory leak with event listener: $@", memoryLeak.asExpr(), memoryLeak.asExpr().toString()

from SynchronousFileOperation syncFile
select syncFile, "Synchronous file operation detected: $@", syncFile.asExpr(), syncFile.asExpr().toString()

from PotentialRaceCondition raceCondition
select raceCondition, "Potential race condition with async operations: $@", raceCondition.asExpr(), raceCondition.asExpr().toString()

from MagicNumber magicNum
select magicNum, "Magic number detected: $@", magicNum.asExpr(), magicNum.asExpr().toString()

from PotentialNullDereference nullDeref
select nullDeref, "Potential null pointer dereference: $@", nullDeref.asExpr(), nullDeref.asExpr().toString()
