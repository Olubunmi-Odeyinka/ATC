package cs.ut.ee.services.entity

import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntIdTable

object TimeTables: IntIdTable() {
    val creator = varchar("creator", 50)
}

class Timetable(id: EntityID<Int>): IntEntity(id) {
    var creator by TimeTables.creator
}