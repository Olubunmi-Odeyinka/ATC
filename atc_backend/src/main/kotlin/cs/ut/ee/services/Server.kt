package cs.ut.ee.services

import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.joda.JodaModule
import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.database.DbConnection
import cs.ut.ee.services.endpoints.userService
import io.ktor.application.install
import io.ktor.features.ContentNegotiation
import io.ktor.jackson.jackson
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

            routing {
                userService()
            }
        }.start(wait = true)
    }
}