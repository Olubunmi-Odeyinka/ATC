package cs.ut.ee.services.controllers

import cs.ut.ee.services.controllers.dto.TimeTableDto
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.token.CreateTimetableToken

class CreateTimetable(val token: CreateTimetableToken, val principal: User?) : SingleStepOperation<TimeTableDto>() {
    override fun work(): TimeTableDto {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}