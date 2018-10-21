package cs.ut.ee.services

import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.configuration.Configuration.CONFIG_PROPERTY
import cs.ut.ee.services.controllers.Login
import cs.ut.ee.services.controllers.NewUser
import cs.ut.ee.services.database.DbConnection
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.FailedAuthenticationException
import cs.ut.ee.services.token.CreateToken
import cs.ut.ee.services.token.LoginToken
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import kotlin.test.Test
import kotlin.test.assertEquals

class UserServiceTest {

    @Test
    fun loginTest() {
        inject()

        val usrName = "john"
        val usrPwd = "doe"
        val usrRole = "admin"

        transaction {
            SchemaUtils.create(Users)

            Users.insert {
                it[username] = usrName
                it[password] = usrPwd
                it[role] = usrRole
            }

            val token = LoginToken(username = usrName, password = usrPwd)
            val usr = Login(token).work()

            assertEquals(usrName, usr.username)
            assertEquals(usrPwd, usr.password)
            assertEquals(usrRole, usr.role)

            rollback()
        }

    }

    @Test(expected = FailedAuthenticationException::class)
    fun loginFailTest() {
        inject()

        val usrName = "john"
        val usrPwd = "doe"

        val token = LoginToken(username = usrName, password = usrPwd)
        Login(token).work()
    }

    @Test
    fun createUserTest() {
        inject()

        transaction {
            DbConnection.createTable(Users)
            val createToken = CreateToken("john", "DoeDoeDoe1", "DoeDoeDoe1")
            val user = NewUser(createToken).work()

            assertEquals(createToken.username, user.username)
            assertEquals(createToken.password, user.password)

            rollback()
        }
    }

    private fun inject() {
        System.setProperty(CONFIG_PROPERTY, "env/dev.yaml")
        System.setProperty("log4j.configurationFile", "env/log4j2.yaml")

        Configuration.setUp()
        DbConnection.connect()
    }
}