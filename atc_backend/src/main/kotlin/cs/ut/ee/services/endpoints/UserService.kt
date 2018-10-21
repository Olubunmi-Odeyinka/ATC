package cs.ut.ee.services.endpoints

import cs.ut.ee.services.controllers.Login
import cs.ut.ee.services.controllers.NewUser
import cs.ut.ee.services.token.CreateToken
import cs.ut.ee.services.token.LoginToken
import io.ktor.application.call
import io.ktor.request.receive
import io.ktor.routing.Route
import io.ktor.routing.post
import io.ktor.routing.route

fun Route.userService() {

    route("/users") {
        post("/login") {
            val ctx = call.receive<LoginToken>()
            Login(ctx).work()
        }

        post {
            val ctx = call.receive<CreateToken>()
            NewUser(ctx).work()
        }
    }

}