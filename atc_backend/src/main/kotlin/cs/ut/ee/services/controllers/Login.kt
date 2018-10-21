package cs.ut.ee.services.controllers

import cs.ut.ee.services.controllers.dto.UserDto
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.FailedAuthenticationException
import cs.ut.ee.services.token.LoginToken
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction

class Login(private val principal: LoginToken) : SingleStepOperation<UserDto>() {

    override fun work(): UserDto {
        log.debug("Querying user => ${principal.username}")

        return transaction {
            val res = Users.select {
                Users.username eq
                        (principal.username ?: throw FailedAuthenticationException()) and (Users.password eq (
                        principal.password ?: throw FailedAuthenticationException()))
            }

            val users = User.wrapRows(res)
            log.debug("Found ${users.count()} users matching principal ${principal.username}")

            val user = users.firstOrNull() ?: throw FailedAuthenticationException()
            UserDto(
                    id = user.id.value,
                    username = user.username,
                    password = user.password,
                    role = user.role ?: ""
            )
        }
    }
}