package cs.ut.ee.services.controllers

import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.FailedAuthenticationException
import org.apache.logging.log4j.LogManager
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

class Login(private val principal: User) {
    private val log = LogManager.getLogger(Login::class.java)

    fun login(): User {
        log.debug("Querying user => ${principal.username}")

        val res = transaction {
            Users.select {
                Users.username eq principal.username and (Users.password eq principal.password)
            }
        }

        val users = User.wrapRows(res)
        log.debug("Found ${users.count()} users matching principal ${principal.username}")

        return users.firstOrNull() ?: throw FailedAuthenticationException()
    }
}