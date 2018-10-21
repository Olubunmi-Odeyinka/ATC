package cs.ut.ee.services.exceptions

import io.ktor.http.HttpStatusCode

class CheckFail(msg: String) : ATCException(HttpStatusCode.Conflict, msg)