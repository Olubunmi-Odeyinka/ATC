package cs.ut.ee.services.token

data class LoginToken(
        val id: Int? = null,
        val username: String? = null,
        val password: String? = null,
        val role: String? = null)