package cs.ut.ee.services.exceptions

import io.ktor.http.HttpStatusCode

class BadPayload: ATCException(HttpStatusCode.BadRequest, "Man, this payload is really messy")