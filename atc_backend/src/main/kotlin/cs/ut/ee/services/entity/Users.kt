package cs.ut.ee.services.entity

import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

object Users: IntIdTable() {
    val username = varchar("username", 50).uniqueIndex()
    val password = varchar("password", 50)
    val role = varchar("role", 50).nullable()
}

data class User(val innerId: EntityID<Int>) : IntEntity(innerId) {
    val username by Users.username
    val password by Users.password
    val role by Users.role

    companion object : IntEntityClass<User>(Users)
}