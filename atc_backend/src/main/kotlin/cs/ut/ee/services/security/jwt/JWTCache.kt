package cs.ut.ee.services.security.jwt

import cs.ut.ee.services.entity.User
import org.apache.logging.log4j.LogManager

object JWTCache {
    private val log = LogManager.getLogger(JWTCache::class.java)
    private val cache = mutableMapOf<Int, String>()

    fun add(user: User, token: String) {
        cache[user.id.value] = token
        log.debug("Added token {} token to cache", token)
    }

    fun invalidate(user: User) {
        val removed = cache.remove(user.id.value)
        log.debug("Invalidated token => {}", removed)
    }

    fun isValid(token: String) = cache.values.contains(token)
}