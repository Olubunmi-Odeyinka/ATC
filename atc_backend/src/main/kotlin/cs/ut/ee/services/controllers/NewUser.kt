package cs.ut.ee.services.controllers

import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.controllers.dto.UserDto
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.CheckFail
import cs.ut.ee.services.exceptions.PasswordsDoNotMatch
import cs.ut.ee.services.security.checks.CapitalizedCheck
import cs.ut.ee.services.security.checks.ContainsNumeric
import cs.ut.ee.services.security.checks.LengthCheck
import cs.ut.ee.services.security.checks.UniqueUsername
import cs.ut.ee.services.token.CreateToken
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import java.lang.NullPointerException

class NewUser(private val token: CreateToken) : SingleStepOperation<UserDto>() {
    private val checks = listOf(
            CapitalizedCheck,
            ContainsNumeric,
            LengthCheck,
            UniqueUsername)

    override fun work(): UserDto {
        log.debug("Request to create new principal => $token")
        if (token.password == null || token.confirmPassword == null) {
            throw PasswordsDoNotMatch()
        }

        log.debug("Both passwords are not null")
        if (token.password != token.confirmPassword) {
            throw PasswordsDoNotMatch()
        }

        log.debug("Passwords are the same, applying ${checks.size} checks => $token")
        val checksApplied = checks.map { it to it.pass(token.password) }
        checksApplied.forEach { (k, v) ->
            log.debug("Check $k => ${if (v) "OK" else "FAIL"}")
            if (!v) throw CheckFail(k.error())
        }

        log.debug("Password checks passed,  checking username")
        if (token.username == null) {
            throw CheckFail("username cannot be empty")
        }
        if (!UniqueUsername.pass(token.username)) {
            throw CheckFail(UniqueUsername.error())
        }

        log.debug("Checks passed, creating user => $token")
        return transaction {
            val id = Users.insert {
                it[username] = token.username
                it[password] = token.password
                it[role] = Configuration.getValue("security:defaults:role")
            } get Users.id

            val user: User = User.findById(id!!) ?: throw NullPointerException()
            UserDto(
                    id = user.id.value,
                    username = user.username,
                    password = user.password,
                    role = user.role ?: "")
        }
    }

}