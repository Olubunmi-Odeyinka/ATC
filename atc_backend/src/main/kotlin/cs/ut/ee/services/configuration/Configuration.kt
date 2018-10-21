package cs.ut.ee.services.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.util.Supplier
import java.io.File

object Configuration {
    const val CONFIG_PROPERTY = "env.config"

    private val log = LogManager.getLogger(Configuration::class.java)
    private val map = mutableMapOf<String, Any>()
    private val mapper by lazy { ObjectMapper(YAMLFactory()) }

    fun setUp() {
        val start = System.currentTimeMillis()

        map.clear()
        log.debug("Cleared configuration map")

        log.debug("Looking for system property => {}", CONFIG_PROPERTY)
        val configFile = System.getProperty(CONFIG_PROPERTY)
        log.debug("Configuration file => {}", configFile)

        val m: Map<*, *> = mapper.readValue(File(configFile), Map::class.java)
        m.forEach { k, v ->
            if (k is String && v != null) {
                map[k] = v
                log.debug("Set map property {} => {}", k, v)
            }
        }

        val end = System.currentTimeMillis()
        log.debug("Finished configuration set up in {} ms.", Supplier { end - start })
    }

    fun <T> getValue(path: String, separator: String = ":"): T {
        log.debug("Property for path {} requested", path)

        val keys = path.split(separator)
        var m: Any = map
        for (key in keys) {
            if (m is Map<*, *>) {
                m = m[key] ?: RuntimeException(path).apply {
                    log.warn("Could not find configuration property for {}", path)
                }
            } else {
                log.debug("Found property for path => {} => {}", path, m)
                @Suppress("UNCHECKED_CAST")
                m as T
            }
        }

        log.debug("Found property for path => {} => {}", path, m)
        @Suppress("UNCHECKED_CAST")
        return m as T
    }
}