package online.pavelusanli.resume.preview;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import online.pavelusanli.resume.pdf.ResumeResources;

/**
 * Computes a SHA-256 fingerprint of the resume template and avatar to detect source changes.
 */
public final class TemplateFingerprintService {

    private final ResumeResources resources;

    public TemplateFingerprintService(ResumeResources resources) {
        this.resources = resources;
    }

    /** Returns a lowercase hex SHA-256 digest of the current template and avatar bytes. */
    public String currentFingerprint() throws IOException {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.update(resources.templateBytes());
            digest.update(resources.avatarBytes());
            return HexFormat.of().formatHex(digest.digest());
        } catch (NoSuchAlgorithmException e) {
            // SHA-256 is mandated by the Java SE specification - this can never happen
            throw new AssertionError("SHA-256 unavailable", e);
        }
    }
}