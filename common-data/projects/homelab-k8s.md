* **Platform**: **MicroK8s** Kubernetes cluster running inside a private LAN
* **GitOps**: **FluxCD** continuously syncs cluster state from GitHub
* **Ingress & Routing**: **Traefik Ingress** exposes 2 main entrypoints:
  * `websecure` → **Public HTTPS Entry** (Cloudflare-facing)
  * `privatewebsecure` → **Private LAN/VPN Secure Entry** (internal-only)
* **TLS Automation**: **Cloudflare DNS + ACME (Let's Encrypt)** for automatic certificate issuance/renewal
* **Load Balancing**: **MetalLB LoadBalancer** provides stable LAN IPs and fronts all Traefik entrypoints
* **Storage**: **NFS server** provides persistent volumes (**PVCs**) for stateful workloads
* **Security**: **Trivy Operator** performs vulnerability + misconfiguration scanning across workloads
* **Monitoring**: **Grafana** dashboards for cluster/hardware metrics and Trivy reports
* **DNS Control**: **AdGuard DNS** distributes ad-blocking + internal DNS across all home devices via router DHCP
* **Internal Services**: **NGINX landing page**, **pgAdmin**, router proxies, and other personal tools
* **Custom Apps**: Self-hosted deployments for games (**Bunker**, **Spy**, **Battleship**) + personal **Resume**
* **External Private Servers**: Dedicated **PostgreSQL**, private DNS records, **NFS storage**, and other LAN services
* **Roadmap**: **SSO**, **RAID**, cluster hardening and access policy improvements

```mermaid
graph TD
  Internet((Internet)) --> Cloudflare[Cloudflare DNS]
  Cloudflare --> Edge[Home Router / Firewall + VPN Server]

  Edge -->|DHCP assigns DNS| Devices[Home Devices]
  Devices -->|DNS queries| AdGuard[AdGuard DNS]

  Edge -->|LAN/VPN Access| WebSecure[Public HTTPS Entry]
  Edge -->|LAN/VPN Access| PrivateWebSecure[Private LAN/VPN Secure Entry]

  Cluster[MicroK8s Cluster] --> MetalLB[MetalLB LoadBalancer]
  MetalLB --> Traefik[Traefik Ingress]

  Traefik -->|websecure| WebSecure
  Traefik -->|privatewebsecure| PrivateWebSecure

  AdGuard -->|LAN DNS -> privatewebsecure| PrivateWebSecure

  Cluster --> Flux[FluxCD GitOps]
  GitHub[GitHub Repo] --> Flux

  Cluster --> Trivy[Trivy Operator]
  Cluster --> Grafana[Grafana Dashboards]

  NFS[NFS Server] -->|PV/PVC| Cluster
  Postgres[(PostgreSQL Server)] --> Cluster
```

**Purpose:** Build a real home lab from scratch to learn Kubernetes, GitOps workflows, reverse proxy routing, and secure LAN-first service exposure.

**Bonus:** With AdGuard distributed via DHCP, every device automatically gets centralized DNS filtering and internal routing without manual configuration per device.

> **Note:** Most internal services are reachable only through `privatewebsecure` (LAN/VPN). Public-facing apps use `websecure` with Cloudflare-managed DNS + automated TLS.