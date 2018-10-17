package cs.ut.ee

import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.tomcat.Tomcat

object Server {
    @JvmStatic
    fun main(args: Array<String>) {
        embeddedServer(Tomcat, 8080) {
            routing {
                get("/hello/{name}") {
                    context.respond("Hello, ${context.parameters["name"] ?: "world!"}")
                }
            }
        }.start(wait = true)
    }
}
