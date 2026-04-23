import cicdMd from './cheatsheets/cicd-deployments.md?raw'
import microservicesMd from './cheatsheets/microservices.md?raw'
import s2sMd from './cheatsheets/service-to-service-communication.md?raw'
import kubernetesMd from './cheatsheets/kubernetes.md?raw'
import sdlcMd from './cheatsheets/sdlc.md?raw'
import semverMd from './cheatsheets/semver.md?raw'
import dorDodMd from './cheatsheets/dor-dod.md?raw'
import apisMd from './cheatsheets/apis-communication.md?raw'
import dbMd from './cheatsheets/db-transactions.md?raw'
import nfrMd from './cheatsheets/non-functional-requirements.md?raw'
import c4Md from './cheatsheets/c4-model.md?raw'
import reliabilityMd from './cheatsheets/reliability-sre.md?raw'
import maintainabilityMd from './cheatsheets/maintainability.md?raw'

export const cheatsheets = [
  {
    id: 'cicd-deployments',
    title: 'CI/CD & Deployment Strategies',
    summary: 'Continuous Integration and Continuous Delivery (CI/CD) practices including blue-green and canary deployments, pull-based vs push-based pipelines, and GitOps workflows for automated, reliable releases.',
    details: cicdMd,
  },
  {
    id: 'microservices',
    title: 'Microservice Patterns',
    summary: 'Distributed architecture patterns including API Gateway, Strangler Fig, CQRS, Outbox, and Idempotency. Covers database-per-service, service discovery, and resilience strategies for building scalable microservices.',
    details: microservicesMd,
  },
  {
    id: 'service-to-service-communication',
    title: 'Service-to-Service Communication (Sync vs Async)',
    summary: 'Guide to service-to-service communication: synchronous request/response (REST, gRPC, SOAP) vs. asynchronous messaging and streaming (RabbitMQ, ActiveMQ, Kafka). Covers when to use each approach, trade-offs, reliability patterns, and common pitfalls.',
    details: s2sMd,
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes Management',
    summary: 'Essential kubectl commands, k9s terminal UI, and YAML manifest examples for managing Kubernetes resources including Pods, Deployments, Services, ConfigMaps, Secrets, Jobs, and CronJobs.',
    details: kubernetesMd,
  },
  {
    id: 'sdlc',
    title: 'Software Development Life Cycle (SDLC)',
    summary: 'Structured process for designing, developing, and testing high-quality software. Covers the six phases (Planning, Analysis, Design, Implementation, Testing, Maintenance) and common methodologies (Waterfall, Agile, Scrum, Kanban, DevOps, Spiral).',
    details: sdlcMd,
  },
  {
    id: 'semver',
    title: 'Semantic Versioning (SemVer)',
    summary: 'Versioning scheme using MAJOR.MINOR.PATCH format to communicate the nature of changes. Covers incrementing rules, pre-release versions, build metadata, and dependency management best practices.',
    details: semverMd,
  },
  {
    id: 'dor-dod',
    title: 'Definition of Ready (DoR) & Definition of Done (DoD)',
    summary: 'Practical templates and checklists for API and engineering work covering readiness criteria, implementation standards, testing, security, observability, deployment, and breaking change management.',
    details: dorDodMd,
  },
  {
    id: 'apis-communication',
    title: 'APIs & Communication Protocols',
    summary: 'API design principles and communication styles including REST, GraphQL, RPC (gRPC), and SOAP. Covers resource modeling, versioning, authentication, idempotency, error handling, and best practices for scalable service-to-service and client-server communication.',
    details: apisMd,
  },
  {
    id: 'db-transactions',
    title: 'Database Transactions',
    summary: 'Database transactions ensure data integrity using ACID properties, commit/rollback mechanisms, and connection pooling.',
    details: dbMd,
  },
  {
    id: 'non-functional-requirements',
    title: 'Non-Functional Requirements (NFR)',
    summary: 'Quality attributes that define how a system operates, including performance, scalability, availability, security, reliability, maintainability, and observability. Covers SLAs, SLOs, SLIs, capacity planning, and trade-off analysis.',
    details: nfrMd,
  },
  {
    id: 'c4-model',
    title: 'C4 Model (Architecture Description)',
    summary: 'A hierarchical approach to documenting software architecture using Context, Container, Component, and Code diagrams. Focuses on clarity, abstraction levels, system boundaries, and stakeholder communication.',
    details: c4Md,
  },
  {
    id: 'reliability-sre',
    title: 'Reliability & SRE Metrics',
    summary: 'Reliability practices for building stable systems including availability, MTTR, MTBF, error rates, latency percentiles, and Google SRE concepts such as SLI, SLO, SLA, error budgets, and the four golden signals used in production monitoring.',
    details: reliabilityMd,
  },
  {
    id: 'maintainability',
    title: 'Maintainability',
    summary: 'Software maintainability principles for building systems that are easy to understand, modify, and extend. Covers modular design, separation of concerns, low coupling, high cohesion, code readability, refactoring practices, automated testing, and common maintainability metrics.',
    details: maintainabilityMd,
  },
]