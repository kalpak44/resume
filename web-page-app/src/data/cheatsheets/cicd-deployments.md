Continuous Integration and Continuous Delivery (CI/CD) automate the process of building, testing, and deploying
software. Modern cloud-native systems rely on safe deployment strategies and declarative infrastructure workflows to
reduce risk and improve reliability.

# CI/CD Overview

## Continuous Integration (CI)

Developers frequently merge code into a shared repository. Each merge triggers:

- Automated build
- Automated tests
- Static analysis
- Security scans

### CI Flow

```mermaid
flowchart LR
    Dev[Developer] -->|Push Code| Git[Git Repository]
    Git --> CI[CI Pipeline]
    CI --> Build[Build Artifact]
    CI --> Test[Run Tests]
    CI --> Scan[Security / Lint]
```

## Continuous Delivery / Deployment (CD)

After CI succeeds, the system:

- Packages artifacts (Docker image, binary, etc.)
- Deploys to staging
- Optionally deploys automatically to production

### CD Flow

```mermaid
flowchart LR
    Artifact[Artifact Registry] --> Staging[Deploy to Staging]
    Staging --> Approval{Manual Approval?}
    Approval -->|Yes| Prod[Deploy to Production]
    Approval -->|No| Prod
```

# Deployment Strategies

Deployment strategies reduce risk when releasing new versions.

# Blue-Green Deployment

Two identical environments:

- **Blue** → current production
- **Green** → new version

Traffic switches only after validation.

## Flow

```mermaid
flowchart LR
    Users --> LB[Load Balancer]
    LB --> Blue[Blue v1]
    LB -. switch .-> Green[Green v2]
```

## Process

1. Deploy a new version to Green
2. Test Green
3. Switch traffic from Blue → Green
4. Keep Blue as a rollback target

## Pros

- Instant rollback
- Minimal downtime
- Simple mental model

## Cons

- Doubles infrastructure cost
- Database migrations must be backward compatible

# Canary Deployment

Release to a small percentage of users first.

## Flow

```mermaid
flowchart LR
    Users --> LB[Load Balancer]
    LB -->|90%| v1[Version 1]
    LB -->|10%| v2[Version 2 - Canary]
```

Gradually increase traffic if metrics are healthy.

## Steps

1. Deploy v2
2. Route 5–10% traffic
3. Monitor:
   - Error rate
   - Latency
   - Business metrics

4. Gradually increase traffic

## Pros

- Low risk
- Real production testing
- Metric-driven rollout

## Cons

- More complex routing
- Requires observability

# Rolling Deployment

Incrementally replace pods/instances.

```mermaid
flowchart LR
    Old1[Pod v1] --> New1[Pod v2]
    Old2[Pod v1] --> New2[Pod v2]
    Old3[Pod v1] --> New3[Pod v2]
```

Common in Kubernetes using:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1
```

# Push vs. Pull-Based Pipelines

# Push-Based Deployment

The CI server pushes changes to the cluster.

## Flow

```mermaid
flowchart LR
    Dev --> Git
    Git --> CI
    CI -->|kubectl apply| Cluster
```

### Characteristics

- CI system needs cluster credentials
- Centralized control
- Traditional model

### Risks

- Credential leakage
- Harder to scale across clusters

# Pull-Based Deployment

The cluster pulls desired state from Git.

Used in **GitOps**.

## Flow

```mermaid
flowchart LR
    Dev --> Git
    Git --> Agent[GitOps Agent]
    Agent --> Cluster
```

Examples:

- ArgoCD
- Flux

### Characteristics

- Cluster has read-only access to Git
- Declarative desired state
- Self-healing

# Push vs Pull Comparison

| Aspect                   | Push           | Pull                  |
| :----------------------- | :------------- | :-------------------- |
| Who initiates deployment | CI server      | Cluster agent         |
| Credentials location     | CI             | Cluster               |
| Drift detection          | Manual         | Automatic             |
| Security model           | Broader access | Reduced CI privileges |
| Multi-cluster scaling    | Harder         | Easier                |

# GitOps

GitOps is an operational model where:

- Git is the single source of truth
- Desired state is declarative (YAML, Helm, Kustomize)
- Cluster continuously reconciles with Git

## GitOps Architecture

```mermaid
flowchart TD
    Dev[Developer] -->|Commit| GitRepo[Git Repository]
    GitRepo --> Agent[ArgoCD / Flux]
    Agent -->|Apply Desired State| Cluster[Kubernetes Cluster]
    Cluster -->|Report Status| Agent
```

## GitOps Principles

1. Declarative infrastructure
2. Version-controlled desired state
3. Automated reconciliation
4. Observable system state

## Reconciliation Loop

```mermaid
sequenceDiagram
    participant Agent
    participant Git
    participant Cluster

    Agent->>Git: Check desired state
    Agent->>Cluster: Compare actual state
    Agent->>Cluster: Apply changes if drift detected
```

# Safe Deployment Patterns in Kubernetes

## Progressive Delivery

Combines:

- Canary
- Feature flags
- Automated rollback

Often implemented with:

- Argo Rollouts
- Flagger
- Service Mesh (Istio, Linkerd)

## Feature Flags

Separate deployment from release.

```mermaid
flowchart LR
    Deploy[Deploy New Code] --> FeatureFlag{Feature Enabled?}
    FeatureFlag -->|Yes| NewFeature
    FeatureFlag -->|No| Hidden
```

Benefits:

- Instant enable/disable
- A/B testing
- Gradual feature exposure

# CI/CD Best Practices

- Trunk-based development
- Small frequent releases
- Immutable artifacts
- Automated testing
- Observability-first deployments
- Backward-compatible DB migrations
- Infrastructure as Code (IaC)

# End-to-End Example

```mermaid
flowchart LR
    Dev --> Git
    Git --> CI[Build & Test]
    CI --> Registry[Push Docker Image]
    Git --> ConfigRepo[Update Helm Chart]
    ConfigRepo --> ArgoCD
    ArgoCD --> Cluster
    Cluster --> Users
```
