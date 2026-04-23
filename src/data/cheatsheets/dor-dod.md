These templates apply to:

- New endpoints
- API changes
- Schema updates
- Versioned releases
- Internal service-to-service contracts

# Definition of Ready (DoR)

An API task is **Ready** when:

## 1. Business clarity

- [ ] Clear problem statement
- [ ] Business value described
- [ ] Acceptance criteria defined
- [ ] Edge cases identified

## 2. Contract clarity

- [ ] Endpoint/method defined (REST / GraphQL / RPC)
- [ ] Request & response schema drafted
- [ ] Required vs. optional fields defined
- [ ] Validation rules specified
- [ ] Error cases listed
- [ ] Idempotency requirements defined (if applicable)

## 3. Data & consistency

- [ ] Data ownership defined
- [ ] Source of truth clarified
- [ ] Backward compatibility impact assessed
- [ ] Migration strategy (if breaking change)

## 4. Security & access

- [ ] Auth method defined (API key / OAuth / mTLS / etc.)
- [ ] Authorization model defined (roles/scopes/resource-level)
- [ ] Sensitive data classification reviewed

## 5. Operational concerns

- [ ] Rate limits defined
- [ ] Expected traffic/throughput estimated
- [ ] SLA/SLO expectations defined
- [ ] Observability requirements defined (metrics, logs, traces)

## 6. Documentation

- [ ] OpenAPI / GraphQL schema / Proto draft available
- [ ] Example requests/responses prepared
- [ ] Deprecation impact documented (if applicable)

Only when all relevant boxes are checked can development start.

# Definition of Done (DoD)

An API change is **Done** when:

## 1. Implementation

- [ ] Code implemented
- [ ] Input validation enforced
- [ ] Error handling standardized
- [ ] Idempotency implemented (if required)
- [ ] Rate limiting is enforced (if applicable)

## 2. Tests

- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Contract tests added
- [ ] Backward compatibility tests pass
- [ ] Edge cases tested
- [ ] Load/performance test executed (if needed)

## 3. Security

- [ ] Auth & authorization verified
- [ ] No sensitive data leakage in logs
- [ ] Security review performed (if required)

## 4. Observability

- [ ] Structured logs implemented
- [ ] Metrics exposed (latency, errors, throughput)
- [ ] Tracing enabled
- [ ] Alerts configured (if production-critical)

## 5. Documentation

- [ ] OpenAPI / schema updated
- [ ] Examples updated
- [ ] Changelog entry added
- [ ] Migration guide written (if breaking change)

## 6. Deployment & release

- [ ] Feature flags configured (if used)
- [ ] Version bump applied (if needed)
- [ ] Backward compatibility verified in staging
- [ ] Rollback plan documented
- [ ] Monitoring verified after deployment

## 7. Consumer validation

- [ ] API consumers are notified (if required)
- [ ] Client SDK updated (if applicable)
- [ ] Consumer integration tested

# Breaking Change Checklist (extra guardrail)

If the change is breaking:

- [ ] New version created
- [ ] Deprecation notice published
- [ ] Sunset timeline defined
- [ ] Migration path documented
- [ ] Monitoring added to track old version usage

# Lightweight DoR/DoD (for small internal changes)

For minor non-breaking changes:

**Ready**

- [ ] Change clearly described
- [ ] Schema impact understood
- [ ] Backward compatibility verified

**Done**

- [ ] Tests updated
- [ ] Docs updated
- [ ] Monitoring checked
