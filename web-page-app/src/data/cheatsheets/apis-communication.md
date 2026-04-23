## When to use what (quick choice)

- **REST**: public-ish HTTP APIs, simple CRUD/resource modeling, caching, broad tooling support.
- **GraphQL**: many client types (web/mobile) need flexible fetching, avoid over/under-fetching.
- **RPC / gRPC**: service-to-service, high throughput/low latency, strict contracts, streaming.
- **SOAP**: enterprise/legacy ecosystems, strict WS-\* standards, XML tooling, formal contracts.

## Core API design principles

### Consistency

- Naming: consistent casing (`snake_case` or `camelCase`), predictable patterns.
- Response shape: stable envelopes / metadata patterns.
- Errors: one standard format across all endpoints.

### Contracts & compatibility

- Treat API as a **product**: stability, clear change policy, deprecation windows.
- Prefer **backward-compatible** changes:
  - Add fields (safe), add optional params (safe)
  - Avoid removing/renaming fields, changing meaning/types, changing default behavior

### Idempotency (especially for writes)

- `PUT` is typically idempotent, `POST` often not.
- For create/payment/order flows: support **Idempotency-Key** header (store key → result).
- If a request is retried, it must not duplicate side effects.

### Pagination & filtering

- Prefer **cursor pagination** for large/volatile datasets.
  - `?cursor=...&limit=50`
- Support filter/sort explicitly:
  - `?status=active&sort=-created_at`
- Always return “next cursor” when more results exist.

## Versioning strategies

### REST

- Prefer **URL versioning** only when needed: `/v1/...`
- Alternative: header-based (`Accept: application/vnd.company.v1+json`)
- Keep versions alive with:
  - documented **deprecation policy**
  - sunset headers / announcements
  - migration guides

### GraphQL

- Prefer **evolution without versions**:
  - add fields, mark deprecated, remove later
  - avoid breaking schema changes

### gRPC

- Evolve with protobuf rules:
  - never reuse field numbers
  - add optional fields
  - deprecate gradually

## Reliability patterns

### Timeouts

- Clients must set timeouts; servers should enforce max processing time.
- Avoid “infinite” timeouts; default to sane limits.

### Retries

- Use exponential backoff and jitter.
- Retry only on safe failures:
  - network timeouts
  - `429`, `503` (often)

- Never blindly retry non-idempotent operations without an idempotency key.

### Rate limiting

- Define quotas: per API key / user / IP.
- Return headers like:
  - `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` (or standard equivalents)

## REST cheat sheet

### Resource modeling

- Nouns for resources:
  - `GET /users/{id}`
  - `GET /users?status=active`

- Actions when needed:
  - `POST /orders/{id}/cancel`
  - `POST /users/{id}:activate` (some orgs prefer this style)

### Partial updates

- `PATCH /resource/{id}` with a clear patch format:
  - merge patch (simple)
  - JSON Patch (explicit operations)

### Caching

- For GET responses:
  - `ETag` + `If-None-Match`
  - `Cache-Control`

## GraphQL cheat sheet

### Strengths

- Client chooses fields → less over-fetching.
- One endpoint, a strong schema, good tooling.

## RPC / gRPC cheat sheet

### When it shines

- Low latency internal calls
- Strong contracts
- Streaming (client/server/bidirectional)

### API shape

- Methods are verbs:
  - `CreateOrder`, `CancelOrder`, `GetOrder`

- Map errors to a consistent set (gRPC status codes), include structured details.

### Compatibility rules (protobuf)

- Don’t change field types
- Don’t reuse field numbers
- Add new fields as optional
- Keep old fields for a deprecation window

## SOAP cheat sheet (legacy/interops)

- Contract-first via WSDL/XSD.
- Strong typing and WS-\* features (security, addressing, etc.).
- Heavy XML payloads; often slower to evolve.

## Observability & operations

### Logging and tracing

- Correlation id:
  - accept `X-Request-Id` / `traceparent`
  - return it back in responses

- Emit structured logs (JSON), avoid logging secrets.

## Documentation checklist

- Auth method + examples
- Error codes catalog
- Pagination/filter/sort rules
- Rate limits
- Idempotency + retry rules
- Versioning/deprecation policy
- Example requests/responses (copy-pasteable)

## Quick comparison table

| Style   | Contract          | Transport | Best for                 | Trade-offs                                       |
| ------- | ----------------- | --------- | ------------------------ | ------------------------------------------------ |
| REST    | OpenAPI optional  | HTTP/JSON | broad compatibility      | versioning + consistency effort                  |
| GraphQL | Strong schema     | HTTP      | flexible client queries  | query cost control, caching complexity           |
| gRPC    | Strong (protobuf) | HTTP/2    | internal high-perf calls | browser support constraints, tooling differences |
| SOAP    | Strong (WSDL)     | HTTP      | legacy enterprise        | verbosity, slower iteration                      |
