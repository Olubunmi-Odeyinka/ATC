package cs.ut.ee.services.controllers

import cs.ut.ee.services.controllers.dto.TimeTableDto
import cs.ut.ee.services.entity.Timetable
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.exceptions.BadPayload
import cs.ut.ee.services.token.CreateTimetableToken
import org.jetbrains.exposed.sql.transactions.transaction

class CreateTimetable(private val token: CreateTimetableToken, private val principal: User?) : SingleStepOperation<TimeTableDto>() {

    override fun work(): TimeTableDto {
        val user = principal ?: throw BadPayload()

        return transaction {
            val timetable = Timetable.new {
                creator = user.username
            }

            TimeTableDto(
                    id = timetable.id.value,
                    creator = timetable.creator)
        }
    }


}