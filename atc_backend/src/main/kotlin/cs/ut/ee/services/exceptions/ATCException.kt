package cs.ut.ee.services.exceptions

import io.ktor.http.HttpStatusCode

abstract class ATCException(val status: HttpStatusCode, val msg: String) : Exception()