package cs.ut.ee.services

import cs.ut.ee.services.configuration.Configuration
import cs.ut.ee.services.database.DbConnection

abstract class AbstractTest {
    protected fun inject() {
        System.setProperty(Configuration.CONFIG_PROPERTY, "env/dev.yaml")
        System.setProperty("log4j.configurationFile", "env/log4j2.yaml")

        Configuration.setUp()
        DbConnection.connect()
    }
}