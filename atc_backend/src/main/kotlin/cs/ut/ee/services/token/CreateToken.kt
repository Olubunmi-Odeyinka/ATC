package cs.ut.ee.services.token

data class CreateToken(
        val username: String? = "",
        val password: String? = "",
        val confirmPassword: String? = ""
)