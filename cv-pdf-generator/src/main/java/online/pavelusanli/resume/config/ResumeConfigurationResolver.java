package online.pavelusanli.resume.config;

import java.nio.file.Path;

/**
 * Resolves {@link ResumeConfiguration} from CLI arguments and environment variables.
 *
 * Priority order: CLI arg > system env > default.
 */
public final class ResumeConfigurationResolver {

    private static final String OUTPUT_ENV_VAR = "RESUME_OUTPUT_PATH";
    private static final String PREVIEW_PORT_ENV_VAR = "RESUME_PREVIEW_PORT";
    private static final String DATA_DIR_ENV_VAR = "RESUME_DATA_DIR";
    private static final int DEFAULT_PREVIEW_PORT = 4567;

    public ResumeConfiguration resolve(String[] args, ApplicationEnvironment environment) {
        ResumeCommand command = ResumeCommand.fromCliName(args.length == 0 ? "build" : args[0]);
        Path dataDir = resolveDataDir(environment);

        return switch (command) {
            case BUILD -> new ResumeConfiguration(
                    ResumeCommand.BUILD,
                    resolveBuildOutputPath(args, environment),
                    DEFAULT_PREVIEW_PORT,
                    dataDir);
            case SERVE -> new ResumeConfiguration(
                    ResumeCommand.SERVE,
                    defaultPreviewOutputPath(),
                    resolvePreviewPort(args, environment),
                    dataDir);
        };
    }

    private Path resolveDataDir(ApplicationEnvironment environment) {
        return environment.value(DATA_DIR_ENV_VAR)
                .map(Path::of)
                .map(path -> path.toAbsolutePath().normalize())
                .orElseGet(() -> Path.of("data").toAbsolutePath().normalize());
    }

    private Path resolveBuildOutputPath(String[] args, ApplicationEnvironment environment) {
        if (args.length >= 2 && !args[1].isBlank()) {
            return Path.of(args[1]).toAbsolutePath().normalize();
        }

        return environment.value(OUTPUT_ENV_VAR)
                .map(Path::of)
                .map(path -> path.toAbsolutePath().normalize())
                .orElseGet(() -> Path.of("target/resume.pdf").toAbsolutePath().normalize());
    }

    private int resolvePreviewPort(String[] args, ApplicationEnvironment environment) {
        if (args.length >= 2 && !args[1].isBlank()) {
            return Integer.parseInt(args[1]);
        }

        return environment.value(PREVIEW_PORT_ENV_VAR)
                .map(Integer::parseInt)
                .orElse(DEFAULT_PREVIEW_PORT);
    }

    private static Path defaultPreviewOutputPath() {
        return Path.of(System.getProperty("java.io.tmpdir"), "resume-preview", "resume.pdf")
                .toAbsolutePath()
                .normalize();
    }
}