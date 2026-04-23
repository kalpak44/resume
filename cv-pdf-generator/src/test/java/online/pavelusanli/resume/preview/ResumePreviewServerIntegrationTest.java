package online.pavelusanli.resume.preview;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import online.pavelusanli.resume.pdf.PdfGenerator;
import online.pavelusanli.resume.pdf.ResumeRenderer;
import online.pavelusanli.resume.pdf.ResumeResources;
import online.pavelusanli.resume.pdf.ResumeService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

class ResumePreviewServerIntegrationTest {

    @TempDir
    Path tempDirectory;

    private ResumePreviewServer previewServer;

    @AfterEach
    void tearDown() {
        if (previewServer != null) {
            previewServer.stopServer();
        }
    }

    @Test
    void servesHtmlPdfAndVersion() throws Exception {
        ResumeResources resources = ResumeResources.from(
                Path.of("data").toAbsolutePath().normalize());
        ResumeService resumeService = new ResumeService(new ResumeRenderer(resources), new PdfGenerator());
        Path outputPath = tempDirectory.resolve("resume.pdf");
        previewServer = new ResumePreviewServer(
                resumeService,
                new TemplateFingerprintService(resources),
                resources,
                outputPath);

        int port = freePort();
        previewServer.start(port);

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpResponse<String> htmlResponse =
                httpClient.send(request(port, "/"), HttpResponse.BodyHandlers.ofString());
        HttpResponse<byte[]> pdfResponse =
                httpClient.send(request(port, "/resume.pdf"), HttpResponse.BodyHandlers.ofByteArray());
        HttpResponse<String> versionResponse =
                httpClient.send(request(port, "/__version"), HttpResponse.BodyHandlers.ofString());

        assertEquals(200, htmlResponse.statusCode());
        assertTrue(htmlResponse.body().contains("<title>Pavel Usanli Resume</title>"));
        assertTrue(htmlResponse.body().contains("Resume live reload failed"));

        assertEquals(200, pdfResponse.statusCode());
        assertTrue(pdfResponse.body().length > 4);
        assertArrayEquals(new byte[] {'%', 'P', 'D', 'F'}, slice(pdfResponse.body(), 4));
        assertTrue(Files.exists(outputPath));

        assertEquals(200, versionResponse.statusCode());
        assertTrue(versionResponse.body().matches("[0-9a-f]{64}"));
    }

    private static HttpRequest request(int port, String path) {
        return HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + port + path)).GET().build();
    }

    private static int freePort() throws IOException {
        try (ServerSocket socket = new ServerSocket(0)) {
            return socket.getLocalPort();
        }
    }

    private static byte[] slice(byte[] bytes, int length) {
        byte[] prefix = new byte[length];
        System.arraycopy(bytes, 0, prefix, 0, length);
        return prefix;
    }
}