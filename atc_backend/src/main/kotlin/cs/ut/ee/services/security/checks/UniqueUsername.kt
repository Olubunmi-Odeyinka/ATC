package cs.ut.ee.services.security.checks

import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.security.Check
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

object UniqueUsername : Check {

    override fun pass(input: String): Boolean {
        return transaction {
            Users.select {
                Users.username eq input
            }.firstOrNull() == null
        }
    }

    override fun error(): String = "User with such username already exists"

}