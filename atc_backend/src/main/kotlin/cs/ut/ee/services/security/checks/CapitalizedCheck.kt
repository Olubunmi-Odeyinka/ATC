package cs.ut.ee.services.security.checks

import cs.ut.ee.services.security.Check

object CapitalizedCheck : Check {
    private val capitalized = "[A-ZÕÄÖÜ]".toRegex()

    override fun pass(input: String): Boolean = input.contains(capitalized)

    override fun error(): String = "Input does not contain capitalized letter"
}