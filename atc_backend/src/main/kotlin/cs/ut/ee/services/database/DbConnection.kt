package cs.ut.ee.services.database

import cs.ut.ee.services.configuration.Configuration
import org.apache.logging.log4j.LogManager
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.StdOutSqlLogger
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.addLogger
import org.jetbrains.exposed.sql.transactions.transaction
import kotlin.system.measureTimeMillis

object DbConnection {
    private val log = LogManager.getLogger(DbConnection::class.java)

    fun connect() {
        with(Configuration) {
            val source = getValue<String>("database:source")
            val driver = getValue<String>("database:driver")
            val userName = getValue<String>("database:user")
            val password = getValue<String>("database:password")

            log.debug("Setting up database connection => {} with driver => {}", source, driver)
            Database.connect(source, driver = driver, user = userName, password = password)
            log.debug("Finished database connection set up")
        }
    }

    fun <T : Table> createTable(vararg tables: T) {
        measureTimeMillis {
            log.debug("Started creation of tables => {}", tables)
            transaction {
                addLogger(StdOutSqlLogger)
                SchemaUtils.create(*tables)
            }
        }.apply {
            log.debug("Finished creation of tables in {} ms", this)
        }
    }
}