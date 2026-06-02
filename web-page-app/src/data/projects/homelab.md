A production-grade homelab where everything — from bare-metal VM provisioning to app deployment — is fully automated
through code.

**Proxmox VE** is the hypervisor layer.

**Terraform** provisions all VMs and LXC containers, manages every Cloudflare
DNS record, WAF rule, and stores state in **Cloudflare R2**.

**Ansible** handles OS-level configuration across all nodes. A multi-node **k3s** cluster runs on top, continuously
reconciled by **FluxCD** GitOps.

Traffic flows through **Cloudflare → HAProxy → Traefik**. Secrets live in **HashiCorp Vault** and sync into Kubernetes
via **External Secrets Operator**. A **self-hosted GitHub Actions runner** on the LAN drives all `deploy` and `destroy`
pipelines with direct Proxmox API access — no ports exposed to the internet.

![Homelab Architecture](/assets/overview_dark.png)

### Infrastructure Layers

- **Hypervisor**: **Proxmox VE** – all services run as VMs or LXC containers on bare metal
- **IaC**: **Terraform** provisions Proxmox VMs/LXCs, manages all Cloudflare DNS records, WAF rules, and uses
  **Cloudflare R2** as a remote state backend
- **Config Management**: **Ansible** automates OS setup, package installs, and service configuration across all nodes
- **Kubernetes**: Multi-node **k3s** cluster running on Proxmox VMs
- **GitOps**: **FluxCD** continuously reconciles cluster state from GitHub
- **CI/CD**: Self-hosted **GitHub Actions runner** on the LAN - runs Terraform + Ansible pipelines with direct Proxmox
  API access

### Networking & Traffic

- **External LB**: **HAProxy** fronts all incoming traffic before it reaches the k3s cluster
- **Ingress**: **Traefik** with public (Cloudflare-proxied) and private (LAN-only) entrypoints
- **Internal LB**: **MetalLB** provides stable virtual IPs for Traefik inside k3s
- **DNS**: **AdGuard Home** handles ad-blocking and internal DNS resolution for all home devices (distributed via DHCP)
- **TLS**: **cert-manager** + **Cloudflare DNS-01 challenge** for automatic Let's Encrypt certificate issuance and
  renewal

### Security & Secrets

- **Intrusion Detection**: **CrowdSec** IDS/IPS engine with a **Traefik plugin (bouncer)** for real-time request
  blocking and AppSec middleware
- **Secrets Manager**: **HashiCorp Vault** (KV-v2) as the single source of truth for all secrets
- **Secret Sync**: **External Secrets Operator** pulls from Vault into Kubernetes Secrets
- **Cloudflare WAF**: Protects all public-facing services at the edge

### Storage & Supporting Services

- **Persistent Storage**: **NFS server** (Proxmox VM) with dynamic provisioning via NFS StorageClass for k3s PVCs
- **Databases**: **PostgreSQL** and **Redis** running as LXC containers on Proxmox
- **Container Management**: **Portainer** manages Docker stacks for non-k8s infra tooling

**Purpose:** Build a production-grade homelab from scratch – fully automated from bare metal to running apps, with no
manual steps after initial Proxmox installation.

> Everything is reproducible: Terraform provisions the infra, Ansible configures it, Flux deploys the workloads.
