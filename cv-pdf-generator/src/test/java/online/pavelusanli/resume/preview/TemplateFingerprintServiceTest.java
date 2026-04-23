package online.pavelusanli.resume.preview;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import online.pavelusanli.resume.pdf.ResumeResources;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class TemplateFingerprintServiceTest {

    @TempDir
    Path dataDir;

    @Test
    void fingerprintChangesWhenTemplateChanges() throws IOException {
        Files.writeString(dataDir.resolve("resume.ftl"), "template-a");
        Files.write(dataDir.resolve("profile.jpg"), new byte[] {1, 2, 3});

        TemplateFingerprintService service = new TemplateFingerprintService(ResumeResources.from(dataDir));
        String first = service.currentFingerprint();

        Files.writeString(dataDir.resolve("resume.ftl"), "template-b");

        assertNotEquals(first, service.currentFingerprint());
    }

    @Test
    void fingerprintStaysStableForSameContent() throws IOException {
        Files.writeString(dataDir.resolve("resume.ftl"), "template-a");
        Files.write(dataDir.resolve("profile.jpg"), new byte[] {1, 2, 3});

        TemplateFingerprintService service = new TemplateFingerprintService(ResumeResources.from(dataDir));

        assertEquals(service.currentFingerprint(), service.currentFingerprint());
    }
}