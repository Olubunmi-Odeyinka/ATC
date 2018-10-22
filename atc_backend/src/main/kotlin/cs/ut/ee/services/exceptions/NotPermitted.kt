package cs.ut.ee.services.exceptions

import io.ktor.http.HttpStatusCode

class NotPermitted : ATCException(HttpStatusCode.Unauthorized, "Not enough permissions")