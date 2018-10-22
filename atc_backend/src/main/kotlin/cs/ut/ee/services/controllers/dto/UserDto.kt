package cs.ut.ee.services.controllers.dto

data class UserDto(
        val id: Int? = -1,
        val username: String? = "",
        val password: String? = "******",
        val role: String? = "")