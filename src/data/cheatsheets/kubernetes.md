A few main commands to interact with clusters:

- **Create resources**: `kubectl create secret generic <name> --from-literal=key=val`, `kubectl create configmap <name> --from-literal=key=val`
- **Get resources**: `kubectl get pods`, `kubectl get services`, `kubectl get deployments`
- **Describe resources**: `kubectl describe pod <pod-name>` (shows detailed events and state)
- **Logs**: `kubectl logs <pod-name> -f` (follow logs)
- **Execute command**: `kubectl exec -it <pod-name> -- /bin/bash`
- **Apply manifest**: `kubectl apply -f <filename>.yaml`
- **Delete resource**: `kubectl delete -f <filename>.yaml` or `kubectl delete pod <pod-name>`
- **Context/Namespace**: `kubectl config get-contexts`, `kubectl config use-context <name>`,
  `kubectl get pods -n <namespace>`

### k9s: Terminal UI for Kubernetes

For a more productive experience, I highly recommend using **[k9s](https://k9scli.io/)**. It provides a terminal-based
UI to manage your clusters, view logs, shell into pods, and more, without typing long kubectl commands.

### Manifest Examples

#### Secret

Used to store sensitive data like passwords or tokens.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username: YWRtaW4= # base64 for "admin"
  password: bXlwYXNzd29yZA== # base64 for "mypassword"
```

#### ConfigMap

Used for non-sensitive configuration data.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_COLOR: 'blue'
  API_URL: 'https://api.example.com'
```

#### Pod

The smallest deployable unit. Usually managed by Deployments.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: nginx:latest
      ports:
        - containerPort: 80
```

#### Deployment

Manages a set of identical Pods, providing declarative updates and scaling.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.21
          ports:
            - containerPort: 80
```

#### Service (ClusterIP)

Exposes the Pods on an internal IP within the cluster.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-internal
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

#### Service (LoadBalancer)

Exposes the Service externally using a cloud provider's load balancer.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-external
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

#### Job

Creates one or more Pods and ensures that a specified number of them successfully terminate.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: hello-job
spec:
  template:
    spec:
      containers:
        - name: hello
          image: busybox
          command: ['echo', 'Hello Kubernetes Job!']
      restartPolicy: Never
  backoffLimit: 4
```

#### CronJob

Runs Jobs on a time-based schedule.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello-cronjob
spec:
  schedule: '*/1 * * * *'
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: hello
              image: busybox
              command: ['echo', 'Hello from CronJob!']
          restartPolicy: OnFailure
```
