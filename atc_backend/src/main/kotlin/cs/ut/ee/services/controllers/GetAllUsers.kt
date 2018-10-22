package cs.ut.ee.services.controllers

import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.controllers.dto.UserDto
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.NotPermitted
import cs.ut.ee.services.security.Admin
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction

class GetAllUsers(val user: User?) : SingleStepOperation<List<UserDto>>() {
    override fun work(): List<UserDto> {
        if (user == null || user.role != Admin.role()) throw NotPermitted()

        return transaction {
            val query = Users.selectAll()
            val wrapped = User.wrapRows(query)
            wrapped.map {entity ->
                UserDto(
                        id = entity.id.value,
                        username = entity.username,
                        role = entity.role ?: Configuration.getValue("security:defaults:role")
                )
            }
        }
    }
}
