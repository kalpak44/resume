A small set of **utility container images** meant to be dropped into Kubernetes **CronJobs** and **Jobs** for common ops tasks:

- **postgres-awscli** - PostgreSQL backups/restores to S3 (plus retention)
- **kubectl-awscli** - `kubectl` + AWS CLI toolbox image for cluster automation

Both images are published to **GitHub Container Registry (GHCR)**.  
The easiest way to see **all available tags/versions** is to open the **package page**:

- postgres-awscli package: **[GHCR package page](https://github.com/kalpak44/postgres-awscli/pkgs/container/postgres-awscli)**
- kubectl-awscli package: **[GHCR package page](https://github.com/kalpak44/kubectl-awscli/pkgs/container/kubectl-awscli)**

On those pages you’ll typically find:

- `latest` (moving tag)
- version tags (e.g. `9d4d16a`)

### For full usage docs and configuration options, check:

- postgres-awscli README: **[README](https://github.com/kalpak44/postgres-awscli/blob/main/README.md)**
- kubectl-awscli README: **[README](https://github.com/kalpak44/kubectl-awscli/blob/main/README.md)**

## What each image is for

**1. postgres-awscli**

**Purpose:** run database backups on a schedule (CronJob), and restores as an on-demand Job.

Typical capabilities (see README for the authoritative list):

- `pg_dump` + `psql` (PostgreSQL client tools)
- `aws-cli`
- Backup mode (default): dump → compress → upload to S3 → retention
- Restore mode: download from S3 → restore into PostgreSQL (optionally recreate DB)

**Docs:** see the latest **[postgres-awscli README](https://github.com/kalpak44/postgres-awscli/blob/main/README.md)** for

- required env vars (DB connection, S3 bucket/prefix, AWS region/creds/IAM role)
- restore parameters (which key to restore, optional recreate behavior)
- Kubernetes CronJob and Job manifests

#### Quick example (local backup run)

> Variables and exact names can change - double check the README before copy/paste.

```bash
docker run --rm \
  -e PGHOST=localhost \
  -e PGPORT=5432 \
  -e PGDATABASE=mydb \
  -e PGUSER=myuser \
  -e PGPASSWORD=mypassword \
  -e AWS_ACCESS_KEY_ID=xxx \
  -e AWS_SECRET_ACCESS_KEY=yyy \
  -e AWS_DEFAULT_REGION=eu-central-1 \
  -e S3_BUCKET=my-backups \
  -e S3_PREFIX=pg/mydb \
  ghcr.io/kalpak44/postgres-awscli:latest
```

#### Quick example (local restore run)

```bash
docker run --rm \
  -e MODE=restore \
  -e PGHOST=localhost \
  -e PGPORT=5432 \
  -e PGDATABASE=mydb \
  -e PGUSER=myuser \
  -e PGPASSWORD=mypassword \
  -e AWS_ACCESS_KEY_ID=xxx \
  -e AWS_SECRET_ACCESS_KEY=yyy \
  -e AWS_DEFAULT_REGION=eu-central-1 \
  -e S3_BUCKET=my-backups \
  -e RESTORE_S3_KEY=pg/mydb/mydb_YYYYMMDDThhmmssZ.sql.gz \
  ghcr.io/kalpak44/postgres-awscli:latest
```

**2. kubectl-awscli**

**Purpose:** a tiny ops image to run Kubernetes + AWS automation inside a Job/CronJob, such as:

- refreshing ECR pull secrets (`regcred`)
- cluster maintenance scripts
- CI/CD helper tasks inside Kubernetes

**Docs:** see the latest **[kubectl-awscli README](https://github.com/kalpak44/kubectl-awscli/blob/main/README.md)** for:

#### Quick example (sanity check locally)

```bash
docker run --rm ghcr.io/kalpak44/kubectl-awscli:latest aws --version
docker run --rm ghcr.io/kalpak44/kubectl-awscli:latest kubectl version --client
```

#### Kubernetes snippet (Job/CronJob-style container)

> Use a pinned image tag for repeatable runs, and check the README for the latest recommended pattern.

```yaml
containers:
  - name: ops
    image: ghcr.io/kalpak44/kubectl-awscli:latest
    command:
      - /bin/bash
      - -lc
      - |
        set -euo pipefail
        aws --version
        kubectl version --client
        # your script here
```

## Links

- **[https://github.com/kalpak44/postgres-awscli/blob/main/README.md](https://github.com/kalpak44/postgres-awscli/blob/main/README.md)**
- **[https://github.com/kalpak44/postgres-awscli/pkgs/container/postgres-awscli](https://github.com/kalpak44/postgres-awscli/pkgs/container/postgres-awscli)**
- **[https://github.com/kalpak44/kubectl-awscli/blob/main/README.md](https://github.com/kalpak44/kubectl-awscli/blob/main/README.md)**
- **[https://github.com/kalpak44/kubectl-awscli/pkgs/container/kubectl-awscli](https://github.com/kalpak44/kubectl-awscli/pkgs/container/kubectl-awscli)**
