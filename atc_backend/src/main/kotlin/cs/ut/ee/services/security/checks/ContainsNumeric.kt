package cs.ut.ee.services.security.checks

import cs.ut.ee.services.security.Check

object ContainsNumeric : Check {
    private val numeric = "[1234567890]".toRegex()

    override fun pass(input: String): Boolean = input.contains(numeric)

    override fun error(): String = "Input does not contain a number"
}