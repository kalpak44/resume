A small experimental Kubernetes Operator built to understand how operators work internally and how custom controllers extend Kubernetes. The project includes a basic Custom Resource Definition (CRD) and a controller that reconciles resource state inside a cluster. While intentionally lightweight and used mainly for learning, it provided hands-on experience with operator scaffolding, manifests, and the full build → deploy → apply cycle on a real Kubernetes environment.

### Key Features & Details

* Built a Hello World Kubernetes Operator in **Go** with a minimal reconciliation loop
* Created and applied custom **CRDs** and controller manifests to a Kubernetes cluster
* Practiced the full operator workflow: **scaffold → build → deploy → apply manifests → reconcile**
* Learned practical Go fundamentals relevant to Kubernetes tooling and controllers
* Improved understanding of Kubernetes internals: controllers, desired state, and reconciliation patterns

**Purpose:** Learn operator fundamentals and Kubernetes extensibility by building a real controller + CRD.

**Bonus:** Solidified the operator mental model and built confidence to implement more advanced operators with stronger Go skills when needed.