package cs.ut.ee.services.controllers

import cs.ut.ee.services.controllers.dto.TimeTableDto
import cs.ut.ee.services.entity.Flight
import cs.ut.ee.services.entity.Timetable
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.exceptions.BadPayload
import cs.ut.ee.services.token.CreateTimetableToken
import org.jetbrains.exposed.sql.transactions.transaction

class CreateTimetable(private val token: CreateTimetableToken, private val principal: User?) : SingleStepOperation<TimeTableDto>() {

    override fun work(): TimeTableDto {
        val user = principal ?: throw BadPayload()
        val flights = token.flights ?: throw BadPayload()

        return transaction {
            val tt = Timetable.new {
                creator = user.username
            }

            flights.forEach { flight ->
                Flight.new {
                    name = flight.name.name
                    plane = flight.plane.name
                    company= flight.company.name
                    lane = flight.lane
                    time = flight.time
                    timetable = tt.id
                }
            }

            TimeTableDto(
                    id = tt.id.value,
                    creator = tt.creator)
        }
    }


}