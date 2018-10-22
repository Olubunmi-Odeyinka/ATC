package cs.ut.ee.services.controllers

import cs.ut.ee.services.controllers.dto.UserDto
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users.role
import cs.ut.ee.services.exceptions.InvalidId
import cs.ut.ee.services.exceptions.NotPermitted
import cs.ut.ee.services.security.Admin
import org.jetbrains.exposed.sql.transactions.transaction

class UpdateRole(val id: Int, private val ctx: UserDto, private val principal: User?) : SingleStepOperation<UserDto>() {
    override fun work(): UserDto {
        if (principal == null || principal.role != Admin.role()) throw NotPermitted()

        return transaction {
            val user = User.findById(id) ?: throw InvalidId()
            user.role = ctx.role

            UserDto(
                    id = user.id.value,
                    username = user.username,
                    role = user.role
            )
        }
    }
}
