package cs.ut.ee.services.controllers

import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.FailedAuthenticationException
import cs.ut.ee.services.token.UserToken
import org.apache.logging.log4j.LogManager
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

class Login(private val principal: UserToken) {
    private val log = LogManager.getLogger(Login::class.java)

    fun login(): User {
        log.debug("Querying user => ${principal.username}")

        return transaction {
            val res = Users.select {
                Users.username eq
                        (principal.username ?: throw FailedAuthenticationException()) and (Users.password eq (
                        principal.password ?: throw FailedAuthenticationException()))
            }

            val users = User.wrapRows(res)
            log.debug("Found ${users.count()} users matching principal ${principal.username}")

            users.firstOrNull() ?: throw FailedAuthenticationException()
        }
    }
}