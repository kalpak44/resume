package online.pavelusanli.resume.pdf;

import freemarker.cache.FileTemplateLoader;
import freemarker.cache.TemplateLoader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Resolves the resume template and avatar image from a {@code dataDir} on the filesystem.
 *
 * Expected layout:
 *   {@code <dataDir>/resume.ftl}   — FreeMarker template
 *   {@code <dataDir>/profile.jpg}  — avatar image
 */
public final class ResumeResources {

    static final String TEMPLATE_NAME = "resume.ftl";
    private static final String AVATAR_NAME = "profile.jpg";

    private final Path dataDir;

    private ResumeResources(Path dataDir) {
        this.dataDir = dataDir;
    }

    /** Creates resources backed by {@code dataDir}. The directory must already exist. */
    public static ResumeResources from(Path dataDir) {
        return new ResumeResources(dataDir.toAbsolutePath().normalize());
    }

    /** Returns a FreeMarker {@link TemplateLoader} pointing at {@code dataDir}. */
    public TemplateLoader templateLoader() {
        try {
            return new FileTemplateLoader(dataDir.toFile());
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to load template directory " + dataDir, exception);
        }
    }

    /** Reads and returns the avatar image bytes. Re-read on each call to reflect filesystem changes. */
    public byte[] avatarBytes() throws IOException {
        return Files.readAllBytes(dataDir.resolve(AVATAR_NAME));
    }

    /** Reads and returns the template bytes. Re-read on each call to reflect filesystem changes. */
    public byte[] templateBytes() throws IOException {
        return Files.readAllBytes(dataDir.resolve(TEMPLATE_NAME));
    }

    public Path dataDir() {
        return dataDir;
    }

    public String templateName() {
        return TEMPLATE_NAME;
    }
}