package cs.ut.ee.services

import cs.ut.ee.services.controllers.CreateTimetable
import cs.ut.ee.services.controllers.NewUser
import cs.ut.ee.services.database.DbConnection
import cs.ut.ee.services.entity.Flights
import cs.ut.ee.services.entity.TimeTables
import cs.ut.ee.services.entity.Timetable
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.token.Company
import cs.ut.ee.services.token.CreateTimetableToken
import cs.ut.ee.services.token.CreateToken
import cs.ut.ee.services.token.FlightName
import cs.ut.ee.services.token.FlightToken
import cs.ut.ee.services.token.PlaneModel
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import org.joda.time.DateTime
import org.junit.Test
import java.util.Base64
import kotlin.random.Random
import kotlin.test.assertEquals

class TimetablesTest : AbstractTest() {

    @Test
    fun createTest() {
        inject()

        val limit = Random.nextInt(1, 10)
        val token = randomFlights(limit)
        transaction {
            DbConnection.createTable(Users, TimeTables, Flights)

            val createToken = CreateToken("john", "DoeDoeDoe1", "DoeDoeDoe1")
            val user = NewUser(createToken).work()

            val u = User.findById(user.id!!)
            val dto = CreateTimetable(token, u).work()

            assert(dto.creator == u!!.username)

            val timeTable = Timetable.findById(dto.id!!)!!
            val count = Flights.select {
                Flights.timeTable eq timeTable.id
            }.count()

            assertEquals(limit, count)
            rollback()
        }
    }

    private fun randomFlights(n: Int): CreateTimetableToken {
        val flights = (0 until n).map { it to dateGenerator(it) }.map(::randomFlight)
        return CreateTimetableToken(flights)
    }

    private fun randomFlight(pair: Pair<Int, DateTime>): FlightToken {
        val (seed, date) = pair
        val random = Random(seed)
        return FlightToken(
                FlightName(nextString(random)),
                PlaneModel(nextString(random)),
                Company(nextString(random)),
                random.nextInt(1, 15),
                date)
    }

    private fun nextString(random: Random): String {
        val bytes = random.nextBytes(256)
        return Base64.getEncoder().encodeToString(bytes)
    }

    private val initial: DateTime = DateTime()
    private fun dateGenerator(seed: Int): DateTime = initial.plusMinutes(30 * seed)

}