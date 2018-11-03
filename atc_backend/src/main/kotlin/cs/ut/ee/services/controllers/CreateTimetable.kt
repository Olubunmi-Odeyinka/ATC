package cs.ut.ee.services.controllers

import cs.ut.ee.services.entity.User
import cs.ut.ee.services.token.CreateTimetableToken

class CreateTimetable(val token: CreateTimetableToken, val principal: User?) : SingleStepOperation<Unit>() {
    override fun work() {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }
}