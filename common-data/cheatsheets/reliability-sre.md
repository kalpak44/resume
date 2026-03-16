**Reliability** is the ability of a system to **work correctly and consistently over time**.

A reliable system:

* stays available for users
* handles failures gracefully
* recovers quickly from incidents

Reliability is a key part of **Site Reliability Engineering (SRE)**.

### Availability

**Availability** shows how often a system is operational and accessible.

```text
Availability = Uptime / Total Time
```

Typical availability levels:

| Availability | Downtime per year |
| ------------ | ----------------- |
| 99%          | ~3.65 days        |
| 99.9%        | ~8.76 hours       |
| 99.99%       | ~52 minutes       |
| 99.999%      | ~5 minutes        |

Higher availability means **less downtime**.

### MTTR – Mean Time To Repair

Average time needed to **recover from a failure**.

```text
MTTR = Total Repair Time / Number of Incidents
```

Lower MTTR means the system **recovers faster**.

### MTBF – Mean Time Between Failures

Average time a system **runs without failure**.

```text
MTBF = Total Uptime / Number of Failures
```

Higher MTBF means the system **fails less often**.

### Error Rate

Percentage of requests that **fail or return errors**.

```text
Error Rate = Failed Requests / Total Requests
```

Example:

* 1000 requests
* 5 failures
* error rate = **0.5%**

### Latency

**Latency** is the time it takes for the system to respond.

Common percentiles:

* **p50** – median response time
* **p95** – 95% of requests are faster than this
* **p99** – near worst-case latency

Example:

```
p50 = 40ms
p95 = 120ms
p99 = 400ms
```

### Golden Signals (Google SRE)

Google SRE recommends monitoring **four key signals**:

* **Latency** – how long requests take
* **Traffic** – number of requests
* **Errors** – failed requests
* **Saturation** - resource usage (CPU, memory, queues)

These signals help detect problems quickly.

### SLI, SLO, SLA

These concepts define **service reliability goals**.

**SLI (Service Level Indicator)**
A metric that measures service performance.

Examples:

* latency
* availability
* error rate

**SLO (Service Level Objective)**
A target value for an SLI.

Example:

```
99.9% of requests respond in < 200ms
```

**SLA (Service Level Agreement)**
A formal agreement with users or customers.

Example:

```
Service availability ≥ 99.95%
```

If the SLA is not met, compensation may apply.


### Error Budget

An **error budget** defines how much failure is acceptable.

```
Error Budget = 1 − SLO
```

Example:

```
SLO = 99.9%
Error Budget = 0.1%
```

Teams can use this budget to balance:

* reliability
* release speed

### Reliability Practices

Common practices to improve reliability:

**Monitoring**

* [Prometheus](https://prometheus.io/)
* [Grafana](https://grafana.com/)
* [Datadog](https://www.datadog.com/)

**Redundancy**

* [load balancing](https://pavel-usanli.online/cheat-sheets/apis-communication) (NGINX, HAProxy)
* [replication](https://pavel-usanli.online/cheat-sheets/db-transactions) (Read Replicas, Multi-Master)
* multi-zone deployment

**Fault Tolerance**

* retries (Exponential Backoff)
* [circuit breakers](https://pavel-usanli.online/cheat-sheets/microservices) (Resilience4j, Opossum)
* bulkhead pattern

**Incident Management**

* alerting (Opsgenie, PagerDuty)
* runbooks
* [postmortems](https://sre.google/sre-book/postmortem-culture/)

### Quick Summary

A reliable system should:

* stay available
* respond quickly
* minimize errors
* recover fast from failures

Core concepts:

* Availability
* MTTR / MTBF
* Latency & Error Rate
* Golden Signals
* SLI / SLO / SLA
* Error Budget
