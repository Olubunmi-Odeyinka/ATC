package cs.ut.ee.services.controllers

import org.apache.logging.log4j.LogManager

abstract class SingleStepOperation<T> {
    protected val log = LogManager.getLogger(javaClass)

    abstract fun work() : T
}