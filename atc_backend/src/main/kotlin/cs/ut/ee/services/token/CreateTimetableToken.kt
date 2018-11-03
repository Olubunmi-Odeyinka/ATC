package cs.ut.ee.services.token

import org.joda.time.DateTime

inline class PlaneModel(val name: String)
inline class FlightName(val name: String)
inline class Company(val name: String)

data class CreateTimetableToken(val flights: List<FlightToken>?)

data class FlightToken(
        val name: FlightName,
        val plane: PlaneModel,
        val company: Company,
        val lane: Int,
        val time: DateTime)