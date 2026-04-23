package online.pavelusanli.resume.pdf;

import freemarker.template.TemplateException;
import java.io.IOException;
import java.nio.file.Path;

/** Orchestrates HTML rendering and PDF generation. */
public final class ResumeService {

    private final ResumeRenderer renderer;
    private final PdfGenerator pdfGenerator;

    public ResumeService(ResumeRenderer renderer, PdfGenerator pdfGenerator) {
        this.renderer = renderer;
        this.pdfGenerator = pdfGenerator;
    }

    /** Renders the resume and writes the PDF to {@code outputPath}. */
    public void build(Path outputPath) throws IOException, TemplateException {
        pdfGenerator.writePdf(renderer.renderHtml(), outputPath);
    }

    /** Renders the resume template and returns the HTML string. */
    public String renderHtml() throws IOException, TemplateException {
        return renderer.renderHtml();
    }
}