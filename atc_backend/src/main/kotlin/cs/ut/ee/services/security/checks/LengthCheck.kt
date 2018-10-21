package cs.ut.ee.services.security.checks

import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.security.Check

object LengthCheck : Check {
    private val length by lazy { Configuration.getValue<Int>("security:password:length") }

    override fun pass(input: String): Boolean = input.length > length

    override fun error(): String = "Provided input is too short"
}