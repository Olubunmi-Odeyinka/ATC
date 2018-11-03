package cs.ut.ee.services.endpoints

import cs.ut.ee.services.controllers.CreateTimetable
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.token.CreateTimetableToken
import io.ktor.application.call
import io.ktor.auth.authentication
import io.ktor.http.HttpStatusCode
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.Route
import io.ktor.routing.post
import io.ktor.routing.route

fun Route.timetables() {
    route("timetables") {
        post {
            val user = call.authentication.principal as User?
            val token = call.receive<CreateTimetableToken>()
            CreateTimetable(token, user).work()
            call.respond(HttpStatusCode.Created)
        }
    }
}