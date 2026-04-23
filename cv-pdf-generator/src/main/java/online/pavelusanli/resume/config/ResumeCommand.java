package online.pavelusanli.resume.config;

import java.util.Locale;

/** CLI commands supported by the application. */
public enum ResumeCommand {
    BUILD,
    SERVE;

    /**
     * Resolves a command from its CLI name (case-insensitive).
     *
     * @throws IllegalArgumentException if {@code name} is not a known command
     */
    public static ResumeCommand fromCliName(String name) {
        return switch (name.toLowerCase(Locale.ROOT)) {
            case "build" -> BUILD;
            case "serve" -> SERVE;
            default -> throw new IllegalArgumentException(
                    "Unknown command '" + name + "'. Use 'build [outputPath]' or 'serve [port]'.");
        };
    }
}