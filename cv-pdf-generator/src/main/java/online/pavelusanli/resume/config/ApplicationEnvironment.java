package online.pavelusanli.resume.config;

import java.util.Map;
import java.util.Optional;

/**
 * Thin wrapper around environment variable lookup.
 *
 * Uses system environment by default; accepts an injectable map for testing.
 */
public final class ApplicationEnvironment {

    private final Map<String, String> values;

    public ApplicationEnvironment(Map<String, String> values) {
        this.values = values;
    }

    /** Returns an environment backed by {@link System#getenv()}. */
    public static ApplicationEnvironment system() {
        return new ApplicationEnvironment(System.getenv());
    }

    /** Returns the value for {@code key}, or empty if absent or blank. */
    public Optional<String> value(String key) {
        String value = values.get(key);
        return (value == null || value.isBlank()) ? Optional.empty() : Optional.of(value);
    }
}