package cs.ut.ee.services.controllers

import cs.ut.ee.services.controllers.dto.UserDto
import cs.ut.ee.services.entity.User

class UpdateRole(val id: Int, val ctx: UserDto, val principal: User?) : SingleStepOperation<UserDto>() {
    override fun work(): UserDto {
        TODO("Implement me")
    }
}
