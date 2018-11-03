package cs.ut.ee.services.entity

import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable
import org.jetbrains.exposed.sql.ReferenceOption

object Flights : IntIdTable() {
    val name = varchar("name", 2000)
    val plane = varchar("plane", 2000)
    val company = varchar("company", 2000)
    val lane = integer("lane")
    val time = datetime("time")
    val timeTable = reference("timetable", TimeTables, onDelete = ReferenceOption.CASCADE)
}

class Flight(id: EntityID<Int>) : IntEntity(id) {
    var name by Flights.name
    var plane by Flights.plane
    var company by Flights.company
    var lane by Flights.lane
    var time by Flights.time
    var timetable by Flights.timeTable

    companion object : IntEntityClass<Flight>(Flights)
}