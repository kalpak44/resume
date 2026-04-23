package online.pavelusanli.resume;

import java.util.Objects;
import online.pavelusanli.resume.config.ApplicationEnvironment;
import online.pavelusanli.resume.config.ResumeCommand;
import online.pavelusanli.resume.config.ResumeConfiguration;
import online.pavelusanli.resume.config.ResumeConfigurationResolver;
import online.pavelusanli.resume.pdf.PdfGenerator;
import online.pavelusanli.resume.pdf.ResumeRenderer;
import online.pavelusanli.resume.pdf.ResumeResources;
import online.pavelusanli.resume.pdf.ResumeService;
import online.pavelusanli.resume.preview.ResumePreviewServer;
import online.pavelusanli.resume.preview.TemplateFingerprintService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** Application entry point. Dispatches to the build or serve command. */
public final class ResumeApp {

    private static final Logger LOGGER = LoggerFactory.getLogger(ResumeApp.class);

    private ResumeApp() {}

    public static void main(String[] args) throws Exception {
        ApplicationEnvironment environment = ApplicationEnvironment.system();
        ResumeConfiguration configuration = new ResumeConfigurationResolver().resolve(args, environment);
        ResumeResources resources = ResumeResources.from(configuration.dataDir());
        ResumeService resumeService = new ResumeService(new ResumeRenderer(resources), new PdfGenerator());

        if (Objects.requireNonNull(configuration.command()) == ResumeCommand.BUILD) {
            resumeService.build(configuration.outputPath());
            LOGGER.info("Generated PDF at {}", configuration.outputPath());
        } else if (configuration.command() == ResumeCommand.SERVE) {
            ResumePreviewServer previewServer = new ResumePreviewServer(
                    resumeService,
                    new TemplateFingerprintService(resources),
                    resources,
                    configuration.outputPath());
            previewServer.start(configuration.previewPort());
        }
    }
}