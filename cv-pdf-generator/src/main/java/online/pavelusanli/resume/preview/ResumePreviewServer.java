package online.pavelusanli.resume.preview;

import static spark.Spark.awaitInitialization;
import static spark.Spark.awaitStop;
import static spark.Spark.get;
import static spark.Spark.init;
import static spark.Spark.port;
import static spark.Spark.stop;

import freemarker.template.TemplateException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import online.pavelusanli.resume.pdf.ResumeResources;
import online.pavelusanli.resume.pdf.ResumeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Spark-based HTTP server for live resume preview.
 *
 * Routes:
 *   {@code GET /}           — live HTML with injected reload script
 *   {@code GET /resume.pdf} — current generated PDF
 *   {@code GET /__version}  — SHA-256 fingerprint used by the client reload script
 */
public final class ResumePreviewServer {

    private static final Logger LOGGER = LoggerFactory.getLogger(ResumePreviewServer.class);

    private final ResumeService resumeService;
    private final TemplateFingerprintService fingerprintService;
    private final ResumeResources resources;
    private final Path outputPath;

    /** Starts as null; first request triggers initial build and sets the fingerprint. */
    private String fingerprint;

    public ResumePreviewServer(
            ResumeService resumeService,
            TemplateFingerprintService fingerprintService,
            ResumeResources resources,
            Path outputPath) {
        this.resumeService = resumeService;
        this.fingerprintService = fingerprintService;
        this.resources = resources;
        this.outputPath = outputPath;
    }

    /** Starts the server on {@code serverPort} and blocks until stopped. */
    public void start(int serverPort) throws IOException, TemplateException {
        port(serverPort);
        ensurePdfUpToDate();

        get("/", (request, response) -> {
            response.type("text/html; charset=UTF-8");
            ensurePdfUpToDate();
            return injectLiveReload(resumeService.renderHtml());
        });

        get("/resume.pdf", (request, response) -> {
            ensurePdfUpToDate();
            response.type("application/pdf");
            response.header("Content-Disposition", "inline; filename=\"resume.pdf\"");
            return Files.readAllBytes(outputPath);
        });

        get("/__version", (request, response) -> {
            response.type("text/plain; charset=UTF-8");
            return currentFingerprint();
        });

        init();
        awaitInitialization();
        LOGGER.info("Resume preview: http://localhost:{}/", serverPort);
        LOGGER.info("PDF route: http://localhost:{}/resume.pdf", serverPort);
        LOGGER.info("Template live reload watches {}", resources.dataDir());
    }

    public void stopServer() {
        stop();
        awaitStop();
    }

    public synchronized String currentFingerprint() throws IOException, TemplateException {
        return ensurePdfUpToDate();
    }

    private synchronized String ensurePdfUpToDate() throws IOException, TemplateException {
        String nextFingerprint = fingerprintService.currentFingerprint();
        if (!nextFingerprint.equals(fingerprint)) {
            resumeService.build(outputPath);
            fingerprint = nextFingerprint;
            LOGGER.info("Rebuilt PDF for template fingerprint {}", fingerprint);
        }
        return fingerprint;
    }

    private static String injectLiveReload(String html) {
        String script = """
                <script>
                (() => {
                  let knownVersion = null;
                  async function checkVersion() {
                    try {
                      const response = await fetch('/__version', { cache: 'no-store' });
                      const nextVersion = (await response.text()).trim();
                      if (knownVersion === null) {
                        knownVersion = nextVersion;
                        return;
                      }
                      if (knownVersion !== nextVersion) {
                        window.location.reload();
                      }
                    } catch (error) {
                      console.error('Resume live reload failed', error);
                    }
                  }
                  checkVersion();
                  window.setInterval(checkVersion, 1000);
                })();
                </script>
                """;
        return html.replace("</body>", script + "\n</body>");
    }
}