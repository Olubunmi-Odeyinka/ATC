package cs.ut.ee

import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.joda.JodaModule
import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.database.DbConnection
import cs.ut.ee.services.endpoints.timetables
import cs.ut.ee.services.endpoints.userService
import cs.ut.ee.services.entity.Flights
import cs.ut.ee.services.entity.TimeTables
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.ATCException
import cs.ut.ee.services.security.jwt.JWTCache
import cs.ut.ee.services.security.jwt.JWTConfig
import cs.ut.ee.services.security.jwt.JWTConfig.CLAIM_ID
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.auth.Authentication
import io.ktor.auth.AuthenticationPipeline
import io.ktor.auth.HttpAuthHeader
import io.ktor.auth.authentication
import io.ktor.auth.jwt.jwt
import io.ktor.auth.parseAuthorizationHeader
import io.ktor.features.CORS
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.jackson.jackson
import io.ktor.pipeline.PipelinePhase
import io.ktor.response.respond
import io.ktor.routing.route
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.tomcat.Tomcat
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.Duration

object Server {
    @JvmStatic
    fun main(args: Array<String>) {
        Configuration.setUp()
        DbConnection.connect()
        DbConnection.createTable(Users, TimeTables, Flights)

        val port = Configuration.getValue<Int>("server:port")

        embeddedServer(Tomcat, port) {
            install(ContentNegotiation) {
                jackson {
                    enable(SerializationFeature.INDENT_OUTPUT)
                    disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                    registerModule(JodaModule())
                }
            }

            install(CORS) {
                method(HttpMethod.Options)
                header(HttpHeaders.XForwardedProto)
                anyHost()
                allowCredentials = true
                maxAge = Duration.ofDays(1)
            }

            install(Authentication) {
                jwt("jwt") {
                    realm = Configuration.getValue("security:jwt:realm")
                    verifier(JWTConfig.verifier)
                    validate {
                        val authHeader = request.parseAuthorizationHeader()
                        if (authHeader != null
                                && authHeader.authScheme == "Bearer"
                                && authHeader is HttpAuthHeader.Single
                                && !JWTCache.isValid(authHeader.blob)) {
                            null
                        } else {
                            it.payload.getClaim(CLAIM_ID).asInt()?.let { id ->
                                transaction { User.findById(id) }
                            }
                        }
                    }
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
                    timetables()
                }
            }
        }.start(wait = true)
    }
}
