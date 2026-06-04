<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pavel Usanli Resume</title>
    <style>
        @page {
            size: A4;
            margin: 12mm;
            @bottom-center {
                content: counter(page) " / " counter(pages);
                font-family: Helvetica, Arial, sans-serif;
                font-size: 9pt;
                color: #5a6670;
            }
        }

        * {
            box-sizing: border-box;
        }

        body,
        h1,
        h2,
        p,
        ul {
            margin: 0;
        }

        body {
            margin: 0;
            font-family: Helvetica, Arial, sans-serif;
            color: #172026;
            background: #ffffff;
            line-height: 1.45;
            font-size: 11.5pt;
        }

        main {
            width: 100%;
        }

        .header,
        .job-top {
            display: table;
            width: 100%;
        }

        .header {
            border-bottom: 2px solid #0f5c4d;
            padding-bottom: 16px;
            margin-bottom: 18px;
        }

        .header-copy {
            display: table-cell;
            vertical-align: middle;
        }

        .header-photo {
            display: table-cell;
            vertical-align: middle;
            width: 86px;
            text-align: right;
        }

        .avatar {
            width: 72px;
            height: 72px;
            border-radius: 16px;
            border: 1px solid #d8e0e5;
        }

        h1 {
            font-size: 24pt;
            margin-bottom: 4px;
            letter-spacing: 0.02em;
        }

        .role {
            color: #0f5c4d;
            font-weight: 700;
            font-size: 12pt;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .contacts {
            font-size: 10pt;
            color: #5a6670;
        }

        .contact-row {
            margin-top: 3px;
        }

        .contact-item {
            display: inline-block;
            margin-right: 18px;
            white-space: nowrap;
        }

        .contact-link {
            color: #5a6670;
            text-decoration: none;
        }

        .section + .section {
            margin-top: 18px;
        }

        .section-title {
            color: #0f5c4d;
            font-size: 10pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            margin-bottom: 10px;
        }

        .job {
            margin-bottom: 16px;
            page-break-inside: avoid;
        }

        .job-title,
        .job-meta {
            display: table-cell;
            vertical-align: top;
        }

        .job-title strong {
            font-size: 12pt;
        }

        .job-company {
            color: #0f5c4d;
            font-weight: 700;
        }

        .job-meta {
            text-align: right;
            color: #5a6670;
            width: 28%;
            font-size: 10pt;
            padding-left: 12px;
        }

        .job-period {
            display: block;
            font-weight: 700;
            color: #172026;
        }

        .job-location {
            display: block;
            margin-top: 2px;
        }

        ul {
            margin-top: 7px;
            margin-left: 18px;
            padding: 0;
        }

        li {
            margin-bottom: 4px;
        }

        .tags {
            margin-top: 8px;
            font-size: 9.5pt;
            color: #5a6670;
        }

        .edu {
            margin-bottom: 10px;
        }

        .edu strong {
            display: block;
            font-size: 11pt;
            margin-bottom: 2px;
        }

        .edu .degree {
            color: #0f5c4d;
            font-weight: 700;
            margin-bottom: 2px;
        }

        .muted {
            color: #5a6670;
        }
    </style>
</head>
<body>
<main>
    <header class="header">
        <div class="header-copy">
            <h1>Pavel Usanli</h1>
            <p class="role">Software Engineer Specializing in Java</p>
            <div class="contacts">
                <div class="contact-row">
                    <span class="contact-item">contact@pavel-usanli.online</span>
                    <span class="contact-item">+359 887 731 472</span>
                    <span class="contact-item">
                        <a class="contact-link" href="https://www.pavel-usanli.online">www.pavel-usanli.online</a>
                    </span>
                </div>
            </div>
        </div>
        <div class="header-photo">
            <img class="avatar" src="${avatarDataUri}" alt="Pavel Usanli" />
        </div>
    </header>

    <section class="section">
        <h2 class="section-title">Summary</h2>
        <p class="summary">
            I'm a Software Engineer with a focus on Java, passionate about automation and building complete, reliable
            systems. I enjoy developing and maintaining end-to-end solutions from backend services and APIs to frontend
            features, infrastructure, and CI/CD. While Java is my main language, I also like working with JavaScript
            and keep experimenting with practical tools that deliver real business value. Lately, I enjoy experimenting
            with AI, building agent flows and pipelines, and using and building MCP so development stays more
            productive, clean, and maintainable.
        </p>
    </section>

    <section class="section">
        <h2 class="section-title">Experience</h2>

        <article class="job">
            <div class="job-top">
                <div class="job-title">
                    <strong>Software Engineer</strong><br />
                    <span class="job-company">foryouandyourcustomers</span>
                </div>
                <div class="job-meta">
                    <span class="job-period">Jun 2020 - Present</span>
                    <span class="job-location">Sofia, Bulgaria | Full-time</span>
                </div>
            </div>
            <ul>
                <li>Designed, developed, and deployed microservices and data transformation applications using Java and
                    Kubernetes.
                </li>
                <li>Collaborated with Product Owners to refine PBIs, clarify scope, and ensure readiness and alignment
                    with product goals.
                </li>
                <li>Reviewed code and Pull Requests for quality, security, and adherence to engineering standards.</li>
                <li>Implemented unit tests and test cases to support stable releases and reliable production systems.
                </li>
                <li>Proposed and documented architectural improvements and engineering practices for a clean, scalable
                    codebase.
                </li>
            </ul>
            <div class="tags">Java, Spring Boot, React, Kubernetes, Azure, Jenkins, MongoDB, ETL, CI/CD</div>
        </article>

        <article class="job">
            <div class="job-top">
                <div class="job-title">
                    <strong>Software Engineer</strong><br />
                    <span class="job-company">Ispolink</span>
                </div>
                <div class="job-meta">
                    <span class="job-period">Jan 2022 - Present</span>
                    <span class="job-location">Remote | Part-time</span>
                </div>
            </div>
            <ul>
                <li>Designed, implemented, and maintained scalable cloud infrastructure with AWS and Terraform.</li>
                <li>Developed and deployed microservices integrated with databases and third-party APIs.</li>
                <li>Wrote and maintained CI/CD pipelines using GitLab CI/CD and Jenkins.</li>
                <li>Monitored and debugged cloud infrastructure and services across delivery environments.</li>
            </ul>
            <div class="tags">Java, Node.js, AWS, Terraform, Jenkins, GitLab CI/CD, Microservices, Solidity</div>
        </article>

        <article class="job">
            <div class="job-top">
                <div class="job-title">
                    <strong>Full Stack Developer</strong><br />
                    <span class="job-company">Intershop Communications AG</span>
                </div>
                <div class="job-meta">
                    <span class="job-period">Jun 2017 - Jun 2020</span>
                    <span class="job-location">Sofia, Bulgaria | Full-time</span>
                </div>
            </div>
            <ul>
                <li>Developed and maintained web applications using Java and Angular.</li>
                <li>Integrated web applications with the Intershop eCommerce platform.</li>
                <li>Designed and implemented REST APIs for platform integrations.</li>
            </ul>
            <div class="tags">Java, Angular, Intershop, REST APIs, SVN, Jira</div>
        </article>

        <article class="job">
            <div class="job-top">
                <div class="job-title">
                    <strong>Junior Java Developer</strong><br />
                    <span class="job-company">Methodia</span>
                </div>
                <div class="job-meta">
                    <span class="job-period">Oct 2015 - Jun 2017</span>
                    <span class="job-location">Sofia, Bulgaria | Full-time</span>
                </div>
            </div>
            <ul>
                <li>Built Java components for the Openbravo ERP platform.</li>
                <li>Debugged and fixed platform issues across feature and compatibility work.</li>
                <li>Developed and tested changes to maintain stable platform behavior.</li>
            </ul>
            <div class="tags">Java, Openbravo ERP, IntelliJ IDEA, Jira</div>
        </article>
    </section>

    <section class="section">
        <h2 class="section-title">Education</h2>
        <div class="edu">
            <strong>Technical University at Sofia</strong>
            <div class="degree">Bachelor's Degree in Computer Systems and Technologies · 2012 - 2016</div>
            <div class="muted">Faculty of Computer Systems and Technologies</div>
        </div>
    </section>
</main>
</body>
</html>
