package cs.ut.ee.services

import cs.ut.ee.services.endpoints.userService
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.tomcat.Tomcat

object Server {
    @JvmStatic
    fun main(args: Array<String>) {
        embeddedServer(Tomcat, 8080) {
            routing {
                userService()
            }
        }.start(wait = true)
    }
}
