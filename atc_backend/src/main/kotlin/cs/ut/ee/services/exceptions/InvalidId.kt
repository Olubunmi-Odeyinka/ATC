package cs.ut.ee.services.exceptions

import io.ktor.http.HttpStatusCode

class InvalidId : ATCException(HttpStatusCode.Conflict, "Invalid id")