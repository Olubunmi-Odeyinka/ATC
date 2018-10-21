package cs.ut.ee.services

import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.configuration.Configuration.CONFIG_PROPERTY
import cs.ut.ee.services.controllers.Login
import cs.ut.ee.services.database.DbConnection
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import kotlin.test.Test
import kotlin.test.assertEquals

class UserServiceTest {

    @Test fun loginTest() {
        System.setProperty(CONFIG_PROPERTY, System.getProperty("user.dir") + "/src/main/resources/env/dev.yaml")
        System.setProperty("log4j.configurationFile", System.getProperty("user.dir") + "/src/main/resources/env/log4j2.yaml")

        Configuration.setUp()
        DbConnection.connect()
        Database

        val usrName = "john"
        val usrPwd = "doe"
        val usrRole = "admin"

        transaction {
            SchemaUtils.create(Users)

            val id = Users.insert {
                it[username] = usrName
                it[password] = usrPwd
                it[role] = usrRole
            } get Users.id ?: throw NullPointerException()

            val user = User.findById(id) ?: throw NullPointerException()

            val usr = Login(user).login()

            assertEquals(usrName, usr.username)
            assertEquals(usrPwd, usr.password)
            assertEquals(usrRole, usr.role)

            rollback()
        }

    }
}