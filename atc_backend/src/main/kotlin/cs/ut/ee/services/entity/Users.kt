package cs.ut.ee.services.entity

import io.ktor.auth.Principal
import org.jetbrains.exposed.dao.EntityID
import org.jetbrains.exposed.dao.IntEntity
import org.jetbrains.exposed.dao.IntEntityClass
import org.jetbrains.exposed.dao.IntIdTable

object Users: IntIdTable() {
    val username = varchar("username", 50).uniqueIndex()
    val password = varchar("password", 50)
    val role = varchar("role", 50).nullable()
}


class User(id: EntityID<Int>) : IntEntity(id), Principal {
    var username by Users.username
    var password by Users.password
    var role by Users.role

    companion object : IntEntityClass<User>(Users)
}