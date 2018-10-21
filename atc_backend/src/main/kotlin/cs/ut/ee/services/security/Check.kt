package cs.ut.ee.services.security

interface Check {

    fun pass(input: String): Boolean

    fun error(): String
}