package cs.ut.ee.services

import cs.ut.ee.services.controllers.GetAllUsers
import cs.ut.ee.services.controllers.Login
import cs.ut.ee.services.controllers.NewUser
import cs.ut.ee.services.controllers.UpdateRole
import cs.ut.ee.services.controllers.dto.UserDto
import cs.ut.ee.services.database.DbConnection
import cs.ut.ee.services.entity.User
import cs.ut.ee.services.entity.Users
import cs.ut.ee.services.exceptions.CheckFail
import cs.ut.ee.services.exceptions.FailedAuthenticationException
import cs.ut.ee.services.exceptions.InvalidId
import cs.ut.ee.services.exceptions.NotPermitted
import cs.ut.ee.services.exceptions.PasswordsDoNotMatch
import cs.ut.ee.services.security.Admin
import cs.ut.ee.services.security.Operator
import cs.ut.ee.services.token.CreateToken
import cs.ut.ee.services.token.LoginToken
import org.hamcrest.CoreMatchers.isA
import org.hamcrest.MatcherAssert.assertThat
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.transactions.transaction
import kotlin.test.Test
import kotlin.test.assertEquals

class UserServiceTest : AbstractTest() {

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

    @Test(expected = CheckFail::class)
    fun createUserFailTest() {
        inject()

        transaction {
            DbConnection.createTable(Users)
            val createToken = CreateToken("john", "DoeDoeDoe1", "DoeDoeDoe1")
            val user = NewUser(createToken).work()
            val user2 = NewUser(createToken).work()

            assertEquals(createToken.username, user.username)
            assertEquals(createToken.password, user.password)
            assertEquals(createToken.username, user2.username)
            assertEquals(createToken.password, user2.password)

            rollback()
        }
    }

    @Test(expected = PasswordsDoNotMatch::class)
    fun createUserFailPasswordTest() {
        inject()
        // test with passwords different.
        transaction {
            DbConnection.createTable(Users)
            // password differ - first one ends with lowercase 1(one), second - with L
            val createToken = CreateToken("john", "DoeDoeDoe1", "DoeDoeDoel")
            val user = NewUser(createToken).work()

            assertEquals(createToken.username, user.username)
            assertEquals(createToken.password, user.password)

            rollback()
        }
    }

    @Test(expected = CheckFail::class)
    fun createUserFailPasswordCapitalizedTest() {
        inject()
        // test with passwords different.
        transaction {
            DbConnection.createTable(Users)
            // passwords match, but lack capitalization
            val createToken = CreateToken("john", "doedoedoe1", "doedoedoe1")
            val user = NewUser(createToken).work()

            assertEquals(createToken.username, user.username)
            assertEquals(createToken.password, user.password)

            rollback()
        }
    }

    @Test
    fun getUserTest() {
        inject()

        transaction {
            DbConnection.createTable(Users)
            val usr = createAdminUser()

            assertThat(GetAllUsers(usr).work(), isA(List::class.java))
            rollback()
        }
    }


    @Test
    fun updateRoleTest() {
        inject()

        transaction {
            DbConnection.createTable(Users)

            val createAdminUser = createAdminUser()
            val userDto = UserDto(role = "changed")
            val result = UpdateRole(createAdminUser.id.value, userDto, createAdminUser).work()

            assertEquals(result.role, userDto.role)
            rollback()
        }
    }

    @Test(expected = InvalidId::class)
    fun updateRoleIdFailTest() {
        inject()

        transaction {
            DbConnection.createTable(Users)

            val createAdminUser = createAdminUser()
            val userDto = UserDto(role = "changed")
            val result = UpdateRole(-1, userDto, createAdminUser).work()

            assertEquals(result.role, userDto.role)
            rollback()
        }
    }

    @Test(expected = NotPermitted::class)
    fun updateRolePermissionFailTest() {
        inject()

        transaction {
            DbConnection.createTable(Users)

            val user = createNormalUser()

            val createAdminUser = createAdminUser()
            val userDto = UserDto(role = "changed")
            //val result0 = UpdateRole(createAdminUser.id.value, userDto, createAdminUser).work()
            val result = UpdateRole(createAdminUser.id.value, userDto, user).work()

            assertEquals(result.role, userDto.role)
            rollback()
        }
    }

    private fun createAdminUser(): User {
        val createToken = CreateToken("john", "DoeDoeDoe1", "DoeDoeDoe1")
        NewUser(createToken).work()

        val usr = User.wrapRow(Users.select { Users.username eq createToken.username!! }.first())
        usr.role = Admin.role()
        return usr
    }

    private fun createNormalUser(): User {
        val createToken = CreateToken("johnny", "DoeDoeDoe1", "DoeDoeDoe1")
        NewUser(createToken).work()

        val usr = User.wrapRow(Users.select { Users.username eq createToken.username!! }.first())
        usr.role = Operator.role()
        return usr
    }
}