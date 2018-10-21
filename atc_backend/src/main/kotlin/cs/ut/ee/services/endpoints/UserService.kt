package cs.ut.ee.services.endpoints

import cs.ut.ee.services.controllers.Login
import cs.ut.ee.services.token.UserToken
import io.ktor.application.call
import io.ktor.request.receive
import io.ktor.routing.Route
import io.ktor.routing.post
import io.ktor.routing.route

fun Route.userService() {

    route("/users") {
        post("/login") {
            val ctx = call.receive<UserToken>()
            Login(ctx).login()
        }
    }

}