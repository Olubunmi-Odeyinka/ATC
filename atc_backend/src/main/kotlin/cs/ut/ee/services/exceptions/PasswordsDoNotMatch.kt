package cs.ut.ee.services.exceptions

import io.ktor.http.HttpStatusCode

class PasswordsDoNotMatch : ATCException(HttpStatusCode.Conflict, "Provided password do not match.")