package cs.ut.ee.services.security

sealed class Role {
    abstract fun role(): String
}

object Admin : Role() {
    override fun role(): String = "admin"
}

object Operator : Role() {
    override fun role(): String = "operator"
}