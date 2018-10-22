package cs.ut.ee.services.security.jwt

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.entity.User
import java.util.Date

object JWTConfig {
    private val secret by lazy { Configuration.getValue<String>("security:jwt:secret") }
    private val issuer by lazy { Configuration.getValue<String>("security:jwt:issuer") }
    private val validity by lazy { Configuration.getValue<Int>("security:jwt:validity") }
    private val algorithm = Algorithm.HMAC256(secret)

    const val CLAIM_ID = "id"

    val verifier: JWTVerifier = JWT
            .require(algorithm)
            .withIssuer(issuer)
            .build()

    fun makeToken(user: User): String = JWT.create()
            .withSubject("Authentication")
            .withClaim(CLAIM_ID, user.id.value)
            .withIssuer(issuer)
            .withExpiresAt(getExpiration())
            .sign(algorithm)

    private fun getExpiration() = Date(System.currentTimeMillis() + validity)
}