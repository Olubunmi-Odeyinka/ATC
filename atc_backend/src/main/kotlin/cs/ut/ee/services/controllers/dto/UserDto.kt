package cs.ut.ee.services.controllers.dto

data class UserDto(
        val id: Int,
        val username: String,
        val password: String = "******",
        val role: String)