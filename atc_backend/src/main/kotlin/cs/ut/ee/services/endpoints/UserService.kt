package cs.ut.ee.services.endpoints

import cs.ut.ee.services.controllers.GetAllUsers
import cs.ut.ee.services.controllers.Login
import cs.ut.ee.services.controllers.NewUser
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.security.jwt.JWTConfig
import cs.ut.ee.services.token.CreateToken
import cs.ut.ee.services.token.LoginToken
import io.ktor.application.call
import io.ktor.auth.authenticate
import io.ktor.auth.authentication
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.response.respondText
import io.ktor.routing.Route
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.route

fun Route.userService() {

    route("/users") {
        post("/login") {
            val ctx = call.receive<LoginToken>()
            val principal = Login(ctx).work()
            call.respondText { JWTConfig.makeToken(principal) }
        }

        post {
            val ctx = call.receive<CreateToken>()
            call.respond(HttpStatusCode.Created, NewUser(ctx).work())
        }

        authenticate("jwt") {
            get {
                val user = call.authentication.principal as User?
                call.respond(HttpStatusCode.OK, GetAllUsers(user).work())
            }
        }
    }

}