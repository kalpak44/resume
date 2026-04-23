# CV PDF Generator

Java app that renders the CV template and generates the PDF used by the website.

## Run

Build the jar/classes:

```bash
mvn -Dmaven.repo.local=../.mvn/repository -DskipTests package
```

Generate a PDF to an explicit location:

```bash
mvn -Dmaven.repo.local=../.mvn/repository -DskipTests package exec:java -Dexec.mainClass=online.pavelusanli.resume.ResumeApp -Dexec.args="build ../web-page-app/public/assets/resume.pdf"
```

Start the live preview server:

```bash
mvn -Dmaven.repo.local=../.mvn/repository exec:java -Dexec.mainClass=online.pavelusanli.resume.ResumeApp -Dexec.args="serve"
```

Run the unit and integration tests:

```bash
mvn -Dmaven.repo.local=../.mvn/repository test
```

The template and profile image are loaded from classpath resources. The build output path is passed explicitly, so the generator stays independent from the website layout.
Optional overrides can live in `.env` via `RESUME_OUTPUT_PATH` and `RESUME_PREVIEW_PORT`, with CLI args taking priority.
