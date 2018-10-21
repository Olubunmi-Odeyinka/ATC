package cs.ut.ee.services

import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.joda.JodaModule
import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.database.DbConnection
import cs.ut.ee.services.endpoints.userService
import cs.ut.ee.services.exceptions.ATCException
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.jackson.jackson
import io.ktor.response.respond
import io.ktor.routing.route
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.tomcat.Tomcat

object Server {
    @JvmStatic
    fun main(args: Array<String>) {
        Configuration.setUp()
        DbConnection.connect()

        val port = Configuration.getValue<Int>("server:port")

        embeddedServer(Tomcat, port) {
            install(ContentNegotiation) {
                jackson {
                    enable(SerializationFeature.INDENT_OUTPUT)
                    disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                    registerModule(JodaModule())
                }
            }

            install(StatusPages) {
                exception<ATCException> {
                    call.respond(it.status, it.msg)
                }
            }

            routing {
                route("api") {
                    userService()
                }
            }
        }.start(wait = true)
    }
}
