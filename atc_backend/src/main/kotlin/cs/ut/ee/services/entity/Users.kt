package cs.ut.ee.services.entity

import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

object Users: IntIdTable() {
    val username = varchar("username", 50)
    val password = varchar("password", 50)
    val role = varchar("role", 50).nullable()
}

class User(id: EntityID<Int>) : IntEntity(id) {
    val username by Users.username
    val password by Users.password
    val role by Users.role

    companion object : IntEntityClass<User>(Users)
}