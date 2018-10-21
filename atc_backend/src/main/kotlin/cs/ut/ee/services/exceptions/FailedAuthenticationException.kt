package cs.ut.ee.services.exceptions

import io.ktor.http.HttpStatusCode

class FailedAuthenticationException : ATCException(HttpStatusCode.Unauthorized, "Invalid username or password")