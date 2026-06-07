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
          content: counter(page) ' / ' counter(pages);
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
        font-size: 15pt;
        margin-bottom: 4px;
        letter-spacing: 0.02em;
      }

      .role {
        color: #0f5c4d;
        font-weight: 700;
        font-size: 22pt;
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
          <p class="role">Software Engineer with Java</p>
          <div class="contacts">
            <div class="contact-row">
              <span class="contact-item">
                <a class="contact-link" href="https://www.pavel-usanli.online"
                  >www.pavel-usanli.online</a
                >
              </span>
              <span class="contact-item">contact@pavel-usanli.online</span>
              <span class="contact-item">+359 887 731 472</span>
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
          I'm a Software Engineer with a focus on Java, passionate about automation and
          building complete, reliable systems. I enjoy developing and maintaining
          end-to-end solutions from backend services and APIs to frontend features,
          infrastructure, and CI/CD. While Java is my main language, I also like working
          with JavaScript and keep experimenting with practical tools that deliver real
          business value. Lately, I enjoy experimenting with AI, building agent flows and
          pipelines, and using and building MCP so development stays more productive,
          clean, and maintainable.
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
            <li>
              <strong>Designed</strong> and deployed
              <strong>Java microservices</strong> and <strong>ETL</strong> pipelines on
              <strong>Kubernetes</strong> to modernize data
              <strong>transformation flows</strong>, enabling reliable processing across
              <strong>distributed systems</strong>.
            </li>
            <li>
              <strong>Collaborated</strong> with Product Owners to define and refine
              <strong>backlog</strong> items before <strong>sprints</strong>, reducing
              scope misalignment and keeping development aligned with product
              <strong>goals</strong>.
            </li>
            <li>
              Reviewed <strong>Pull Requests</strong> for quality and security across a
              <strong>cross-functional team</strong>, maintaining consistent engineering
              standards and <strong>catching defects</strong> early.
            </li>
            <li>
              Introduced unit and integration <strong>test coverage</strong> for critical
              services, supporting stable releases and
              <strong>reducing production incidents</strong>.
            </li>
            <li>
              Proposed and <strong>documented architectural improvements</strong> to
              address growing system complexity, resulting in a cleaner, more
              <strong>maintainable codebase</strong>.
            </li>
          </ul>
          <div class="tags">
            Java, Spring Boot, React, Kubernetes, Azure, Jenkins, MongoDB, ETL, CI/CD
          </div>
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
            <li>
              <strong>Designed</strong> and <strong>maintained</strong> scalable
              <strong>cloud infrastructure</strong> on <strong>AWS</strong>using
              <strong>Terraform</strong>, providing a reproducible,
              <strong>infrastructure-as-code</strong> foundation for all production
              services.
            </li>
            <li>
              <strong>Built</strong> and
              <strong>deployed backend microservices</strong> integrated with databases
              and <strong>third-party APIs</strong>, expanding platform capabilities and
              enabling new product features.
            </li>
            <li>
              <strong>Wrote</strong> and <strong>maintained CI/CD</strong> pipelines with
              <strong>GitLab CI/CD</strong> and <strong>Jenkins</strong>, automating
              delivery workflows and <strong>reducing manual release effort</strong>.
            </li>
            <li>
              <strong>Monitored</strong> and
              <strong>debugged cloud services</strong> across environments, proactively
              identifying and resolving issues to <strong>minimize downtime</strong>.
            </li>
          </ul>
          <div class="tags">
            Java, Node.js, AWS, Terraform, Jenkins, GitLab CI/CD, Microservices, Solidity
          </div>
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
            <li>
              <strong>Developed</strong> and <strong>maintained Java</strong> and
              <strong>Angular</strong> web applications integrated with the Intershop
              <strong>eCommerce</strong> platform, delivering stable client-facing
              features on schedule.
            </li>
            <li>
              <strong>Designed and implemented REST APIs</strong> for platform
              integrations, providing a stable and well-defined interface for
              <strong>third-party connectivity</strong>.
            </li>
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
            <li>
              <strong>Built Java components</strong> for the Openbravo
              <strong>ERP</strong> platform to extend core functionality and meet new
              business requirements.
            </li>
            <li>
              <strong>Debugged</strong> and
              <strong>resolved platform issues</strong> across feature and compatibility
              work, restoring stable behavior and preventing regression.
            </li>
            <li>
              Developed and <strong>tested platform</strong> changes with a focus on
              stability, ensuring consistent behavior across releases.
            </li>
          </ul>
          <div class="tags">Java, Openbravo ERP, IntelliJ IDEA, Jira</div>
        </article>
      </section>

      <section class="section">
        <h2 class="section-title">Education</h2>
        <div class="edu">
          <strong>Technical University at Sofia</strong>
          <div class="degree">
            Bachelor's Degree in Computer Systems and Technologies · 2012 - 2016
          </div>
          <div class="muted">Faculty of Computer Systems and Technologies</div>
        </div>
      </section>
    </main>
  </body>
</html>
