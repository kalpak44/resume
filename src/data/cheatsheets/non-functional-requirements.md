Non-Functional Requirements describe **how well a system works**, not what it does.

* **Functional requirement** → What the system does
* **Non-functional requirement** → How well it does it

Example:

* Functional: *User can log in*
* Non-functional: *Login works in under 1 second for 95% of users*

# 1. Why NFRs Matter

NFRs:

* Define system quality
* Drive architecture decisions
* Prevent production issues
* Force clear expectations
* Help manage trade-offs

Without NFRs, "good" is undefined.

# 2. Core Quality Attributes

## 2.1 Performance

How fast the system responds.

**Examples:**

* Response time < 200ms
* p95 latency < 300ms
* 10,000 requests per second

**Key questions:**

* How fast must it be?
* What is peak traffic?

## 2.2 Scalability (Growth Handling)

Can the system handle more users or traffic?

**Examples:**

* Supports 1M users
* Auto-scales when CPU > 70%
* Handles traffic spikes

**Typical solutions:**

* Stateless services
* Load balancer
* Caching
* Horizontal scaling

## 2.3 Availability (Uptime)

How often the system is running.

| Availability | Downtime per Year |
| ------------ | ----------------- |
| 99%          | ~3.6 days         |
| 99.9%        | ~8.7 hours        |
| 99.99%       | ~52 minutes       |

**Key question:**
How much downtime is acceptable?

## 2.4 Reliability (Stability)

How often the system fails and how fast it recovers.

**Good practices:**

* Retries
* Circuit breakers
* Health checks
* Backups
* Redundancy

## 2.5 Security (Protection)

How well the system protects data and access.

**Examples:**

* HTTPS everywhere
* OAuth2 authentication
* Role-based access control
* Encryption at rest

**Key question:**
What data is sensitive?

## 2.6 Maintainability (Ease of Change)

How easy it is to update or fix the system.

**Good signs:**

* Clean code
* Tests
* CI/CD
* Documentation
* Modular architecture

## 2.7 Observability (Visibility)

Can we understand what is happening inside the system?

**Three pillars:**

* Logs
* Metrics
* Traces

Good systems are easy to debug.


# 3. SLA, SLO, SLI (Clear Structure)

## SLI - Service Level Indicator

A metric we measure.

Examples:

* Uptime
* Latency
* Error rate

## SLO - Service Level Objective

The target value for an SLI.

Examples:

* 99.9% uptime
* p95 latency < 300ms

## SLA – Service Level Agreement

A contract with customers.

* Includes guarantees
* May include penalties

### Simple Relationship

SLI → What we measure
SLO → Target we want
SLA → Promise we sign

# 4. Important Technical Abbreviations

## MTBF – Mean Time Between Failures

Average time the system runs before breaking.

## MTTR – Mean Time To Recovery

How fast we fix it.

## RPS – Requests Per Second

How many requests per second the system handles.

## RTO - Recovery Time Objective

Maximum acceptable downtime after disaster.

## RPO – Recovery Point Objective

Maximum acceptable data loss.

Example:

* RTO = 1 hour
* RPO = 5 minutes

## CAP Theorem (Basic)

You can only choose 2 of:

* **Consistency** – Data is always correct
* **Availability** – System always responds
* **Partition Tolerance** – Works during network issues

Trade-offs are unavoidable.

# 5. Writing Good NFRs

##  Bad

* "System should be fast"
* "System must be secure"

##  Good

* "p95 response time < 200ms under 5,000 RPS"
* "99.9% uptime monthly"
* "All APIs require authentication"

Rule:
NFRs must be:

* Specific
* Measurable
* Testable
* Clear

# 6. Trade-Off Examples

Improving one thing often worsens another.

* More security → More latency
* Higher availability → Higher cost
* Strong consistency → Lower availability

Architecture = managing trade-offs.

# 7. NFR Checklist (Before Development)

* [ ] Defined performance targets
* [ ] Defined peak traffic
* [ ] Defined availability target
* [ ] Defined recovery strategy (RTO/RPO)
* [ ] Defined security requirements
* [ ] Defined monitoring strategy
* [ ] Defined scaling approach