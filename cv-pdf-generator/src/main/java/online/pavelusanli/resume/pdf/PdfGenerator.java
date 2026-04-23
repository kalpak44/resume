package online.pavelusanli.resume.pdf;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;

/** Converts an HTML string to a PDF file using OpenHTML-to-PDF. */
public final class PdfGenerator {

    /** Renders {@code html} to a PDF and writes it to {@code outputPath}, creating parent directories as needed. */
    public void writePdf(String html, Path outputPath) throws IOException {
        Files.createDirectories(outputPath.getParent());

        try (OutputStream outputStream = Files.newOutputStream(outputPath)) {
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, outputPath.getParent().toUri().toString());
            builder.toStream(outputStream);
            builder.run();
        }
    }
}