package cs.ut.ee.services.token

data class UserToken(
        val id: Int? = null,
        val username: String? = null,
        val password: String? = null,
        val role: String? = null)