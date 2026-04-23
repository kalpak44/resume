package online.pavelusanli.resume.config;

import java.nio.file.Path;

/** Resolved runtime configuration for a single command invocation. */
public record ResumeConfiguration(ResumeCommand command, Path outputPath, int previewPort, Path dataDir) {}