package cs.ut.ee.services.endpoints

import cs.ut.ee.services.controllers.Login
import cs.ut.ee.services.token.UserToken
import io.ktor.application.call
import io.ktor.request.receive
import io.ktor.routing.Routing
import io.ktor.routing.post
import io.ktor.routing.route

fun Routing.userService() {

    route("/users") {
        post("/login") {
            val ctx = call.receive<UserToken>()
            Login(ctx).login()
        }
    }

}