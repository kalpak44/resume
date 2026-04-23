package online.pavelusanli.resume.pdf;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import java.io.IOException;
import java.io.StringWriter;
import java.util.Base64;
import java.util.Map;

/**
 * Renders the resume FreeMarker template to an HTML string.
 *
 * Template update delay is set to zero, so filesystem changes are picked up
 * immediately during live preview.
 */
public final class ResumeRenderer {

    private final Configuration configuration;
    private final ResumeResources resources;

    public ResumeRenderer(ResumeResources resources) {
        this.resources = resources;
        configuration = new Configuration(Configuration.VERSION_2_3_34);
        configuration.setTemplateLoader(resources.templateLoader());
        configuration.setDefaultEncoding("UTF-8");
        configuration.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        configuration.setLogTemplateExceptions(false);
        configuration.setWrapUncheckedExceptions(true);
        configuration.setFallbackOnNullLoopVariable(false);
        configuration.setTemplateUpdateDelayMilliseconds(0);
    }

    /** Renders the resume template and returns the resulting HTML. */
    public String renderHtml() throws IOException, TemplateException {
        Template template = configuration.getTemplate(resources.templateName());
        StringWriter writer = new StringWriter();
        template.process(Map.of("avatarDataUri", buildAvatarDataUri()), writer);
        return writer.toString();
    }

    private String buildAvatarDataUri() throws IOException {
        return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(resources.avatarBytes());
    }
}