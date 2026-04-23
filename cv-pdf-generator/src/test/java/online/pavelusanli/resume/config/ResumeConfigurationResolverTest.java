package online.pavelusanli.resume.config;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.nio.file.Path;
import java.util.Map;
import org.junit.jupiter.api.Test;

class ResumeConfigurationResolverTest {

    private final ResumeConfigurationResolver resolver = new ResumeConfigurationResolver();

    @Test
    void buildArgumentsOverrideEnvironment() {
        ResumeConfiguration configuration = resolver.resolve(
                new String[] {"build", "builds/resume.pdf"},
                env(Map.of("RESUME_OUTPUT_PATH", "ignored.pdf")));

        assertEquals(ResumeCommand.BUILD, configuration.command());
        assertEquals(Path.of("builds/resume.pdf").toAbsolutePath().normalize(), configuration.outputPath());
    }

    @Test
    void buildFallsBackToEnvironmentOutputPath() {
        ResumeConfiguration configuration = resolver.resolve(
                new String[] {"build"},
                env(Map.of("RESUME_OUTPUT_PATH", "configured/resume.pdf")));

        assertEquals(Path.of("configured/resume.pdf").toAbsolutePath().normalize(), configuration.outputPath());
    }

    @Test
    void serveFallsBackToEnvironmentPort() {
        ResumeConfiguration configuration = resolver.resolve(
                new String[] {"serve"},
                env(Map.of("RESUME_PREVIEW_PORT", "9091")));

        assertEquals(ResumeCommand.SERVE, configuration.command());
        assertEquals(9091, configuration.previewPort());
    }

    @Test
    void dataDirFallsBackToEnvironmentVariable() {
        ResumeConfiguration configuration = resolver.resolve(
                new String[] {"build"},
                env(Map.of("RESUME_DATA_DIR", "custom/data")));

        assertEquals(Path.of("custom/data").toAbsolutePath().normalize(), configuration.dataDir());
    }

    @Test
    void dataDirDefaultsToDataFolder() {
        ResumeConfiguration configuration = resolver.resolve(new String[] {"build"}, env(Map.of()));

        assertEquals(Path.of("data").toAbsolutePath().normalize(), configuration.dataDir());
    }

    private static ApplicationEnvironment env(Map<String, String> values) {
        return new ApplicationEnvironment(values);
    }
}