export const cloudCourseContent:Record<string,string>={
"Cloud Computing Architecture":`## Learning objectives
You will learn the major building blocks of cloud infrastructure and how regions, compute, storage, networking and managed services fit together.

## Cloud is programmable infrastructure
Cloud computing provides infrastructure and platforms through APIs and web consoles. Instead of buying every server in advance, teams can provision capacity when needed and pay according to the provider's model.

## Regions and availability
Providers divide infrastructure into regions and availability zones or similar fault domains. A region is a geographic area. Multiple zones within a region can help reduce the impact of a single data-center failure.

Choosing a region affects latency, regulatory requirements, service availability and cost.

## Compute
Compute services run application workloads. Options can include virtual machines, containers, serverless functions and managed application platforms.

Virtual machines provide more operating-system control. Serverless platforms reduce infrastructure management but impose runtime and execution constraints.

## Storage
Object storage is useful for files and large binary objects. Block storage attaches to compute instances. Managed databases provide structured data services.

## Networking
Virtual networks, subnets, routes, firewalls and load balancers control how services communicate.

## Managed services
Cloud providers offer managed databases, queues, monitoring, identity and other services. Managed services can reduce operational burden but create provider-specific dependencies.

## Architecture thinking
Do not choose services because they are popular. Start from requirements: traffic, security, availability, data type, latency, recovery objectives and team capability.

## Check your understanding
Design a high-level architecture for a small web application with a front end, API, database and uploaded images. Identify which parts need compute, storage, networking and identity.

## Key takeaways
Cloud architecture is the arrangement of compute, storage, networking and managed services across failure domains. Good design begins with requirements rather than product names.`,

"Linux Command Line Essentials":`## Learning objectives
You will learn how to navigate a Linux filesystem, inspect files and create basic resources from the command line.

## Why Linux matters
Linux runs a large portion of cloud infrastructure, containers and servers. You do not need to memorize every command, but you should understand the filesystem and know how to inspect an unfamiliar environment.

## Navigation
pwd prints the current directory. ls lists entries. cd changes directory.

Use absolute paths when location must be unambiguous and relative paths when working within a known project.

## Files and directories
mkdir creates directories. touch can create an empty file. cp copies, mv moves or renames and rm removes.

Deletion at the command line may not have a recycle bin, so review destructive commands carefully.

## Reading files
cat prints small files. less is better for longer files because it supports navigation. head and tail show the beginning or end of a file.

## Hidden files
Names beginning with a dot are usually hidden from normal ls output. Use ls -a when you need to see them.

## Practical task
Print your current directory, list files, create a directory called sawa-lab, enter it and create a notes.txt file. Then move back to the parent directory and confirm the structure.

## Check your understanding
Explain the difference between an absolute and relative path. Describe why rm -rf should never be copied from a tutorial without understanding the target path.

## Key takeaways
Command-line confidence comes from inspection before action. Know where you are, understand the path and verify before destructive operations.`,

"Users, Permissions and Processes":`## Learning objectives
You will learn how Linux identifies users and groups, how file permissions work and how to inspect running processes.

## Users and groups
Linux systems separate users and groups to control access. Services may run under dedicated accounts instead of powerful administrator accounts.

## Permissions
Files have read, write and execute permissions for owner, group and others. ls -l displays them.

Avoid solving every permissions error with chmod 777. That grants broad access and can create security problems.

## Ownership
chown changes ownership when you have appropriate privileges. Ownership and permission should reflect which user or service genuinely needs access.

## sudo
sudo executes commands with elevated privileges according to policy. Use it deliberately. Administrative access increases the impact of mistakes.

## Processes
A process is a running program. ps shows process information. top or similar tools show active resource usage. kill sends signals to processes.

## Services
Modern Linux servers often use a service manager such as systemd. Services can start at boot and have logs and restart policies.

## Example
A web server cannot read a configuration file. Before changing permissions globally, inspect the file owner, group, service account and intended access.

## Check your understanding
A file should be readable by its owner and a service group but not by other users. Describe the principle you would apply before selecting exact permissions.

## Key takeaways
Linux security depends heavily on identity and permissions. Grant only necessary access and inspect the responsible process before making broad changes.`,

"IP, DNS, Ports and HTTP":`## Learning objectives
You will understand the networking concepts needed to reason about cloud applications and diagnose common connection failures.

## IP addresses
An IP address identifies a network interface. Private addresses are commonly used inside internal networks; public addresses can be reachable from the internet when routing and firewall rules allow it.

## DNS
DNS maps names to network records. When an application cannot reach api.example.com, the problem may occur before any HTTP request if DNS resolution fails.

## Ports
A single host can run many network services. Ports distinguish them. HTTPS commonly uses TCP port 443, but applications may listen on other internal ports.

## HTTP
HTTP runs at the application layer. A successful TCP connection does not guarantee the application returns a healthy HTTP response.

## Network path
A request may pass through DNS, internet routing, firewalls, a load balancer, reverse proxy and application service before reaching code.

## Layered troubleshooting
Test from lower assumptions upward: can the name resolve, is the route reachable, is the port open, is TLS valid, does the HTTP endpoint respond and is the application healthy?

## Check your understanding
A browser reports "server not found." Compare likely causes with a case where the server responds HTTP 500.

## Key takeaways
DNS answers where, ports identify services and HTTP describes application messages. Effective troubleshooting isolates the layer where communication fails.`,

"Diagnose a Connectivity Problem":`## Learning objectives
You will apply a structured troubleshooting method instead of randomly changing cloud settings.

## Start with scope
Ask who is affected. One user, one network, one region or everyone? Scope narrows the possible fault domain.

## Confirm the target
Verify the correct hostname, protocol and port. Many incidents come from incorrect configuration rather than infrastructure failure.

## DNS
Check whether the hostname resolves to the expected address. A recent DNS change may still be propagating or cached.

## Network reachability
Determine whether the route and firewall rules permit traffic. In cloud environments, several controls may apply: subnet routes, security groups, network ACLs and host firewalls.

## Service health
Confirm the process is running and listening on the expected interface and port. A service bound only to localhost will not accept external connections.

## Application health
If the connection succeeds but HTTP returns an error, inspect application logs and dependencies.

## Practical task
Use the lab notes to create a troubleshooting record with evidence for DNS, port, service and application health. Do not write "network issue" without evidence.

## Incident discipline
Change one thing at a time where possible and record it. Multiple simultaneous changes can hide the original cause.

## Key takeaways
Troubleshooting is hypothesis testing. Define scope, verify assumptions and move through the network path systematically.`,

"Firewalls and Secure Connectivity":`## Learning objectives
You will learn how network controls reduce exposure and how to apply least privilege to connectivity.

## Firewalls
A firewall evaluates traffic against rules. Rules commonly consider source, destination, protocol and port.

## Inbound and outbound
Inbound rules control traffic entering a resource. Outbound rules control traffic leaving it. Both can matter when applications call external services.

## Least privilege
Do not expose every port to every address because it is convenient. A public web service may need 443 from the internet while its database should accept connections only from the application network.

## Administrative access
Restrict administrative interfaces and remote-management ports. Prefer identity-aware access, VPNs or bastion designs where appropriate rather than broad public exposure.

## TLS
TLS protects data in transit and authenticates server identity through certificates. Firewalls and TLS solve different problems; use both when appropriate.

## Example
A database on a private subnet should not receive public internet traffic. The application connects internally while administrators use a controlled management path.

## Check your understanding
Design a simple connectivity policy for a public web application, internal API and database. State which component should be public and why.

## Key takeaways
Secure connectivity exposes only what users and systems need. Network controls should reflect application architecture, not convenience.`,

"Images, Containers and Registries":`## Learning objectives
You will understand the difference between container images and running containers and how registries distribute images.

## Image
A container image is an immutable package containing application files, dependencies and metadata needed to start the process.

## Container
A container is a running instance of an image with runtime configuration such as environment variables, mounted storage and network settings.

## Layers
Images are built in layers. Stable dependency layers can be cached, reducing rebuild time.

## Registries
A registry stores images and tags. Production systems should use deliberate versioning rather than relying only on a mutable latest tag.

## Containers versus virtual machines
Containers share the host kernel and usually start quickly. Virtual machines include a guest operating system and provide a stronger isolation boundary in many architectures.

## Reproducibility
A good image build should produce predictable results from source. Pin important dependencies and avoid downloading arbitrary latest versions during production builds.

## Security
Use minimal trusted base images, avoid running as root when unnecessary and do not bake secrets into image layers.

## Check your understanding
Explain why changing an environment variable usually does not require rebuilding the image, while changing application source code does.

## Key takeaways
Images package software; containers run it; registries distribute it. Reproducible builds and careful secret handling are central to safe container use.`,

"Write a Container Build Plan":`## Learning objectives
You will design a container build before writing a Dockerfile or equivalent configuration.

## Identify runtime requirements
Start with the application runtime and version. List operating-system libraries, package dependencies and the command that starts the service.

## Build versus runtime
Many applications need compilers or build tools only during build. Multi-stage builds can keep these tools out of the final runtime image.

## Copy intentionally
Use a .dockerignore or equivalent to exclude source-control metadata, local secrets, dependency directories and other unnecessary files.

## Environment configuration
Do not hardcode production secrets in the image. Inject runtime secrets through the deployment environment.

## User and filesystem
Determine whether the application can run as a non-root user and which directories require write access.

## Health
Plan how the platform can determine whether the container is healthy.

## Practical task
Write a build plan with headings: Base Image, Dependencies, Source, Build Step, Runtime Command, Excluded Files, User, Ports and Health Check.

## Review
Ask whether someone else could build and run the container from the plan without guessing hidden requirements.

## Key takeaways
A container build is an operational contract. Separate build tools from runtime, exclude secrets and define startup and health behavior explicitly.`,

"Container Operations and Debugging":`## Learning objectives
You will learn a practical sequence for diagnosing a container that starts incorrectly or becomes unhealthy.

## Inspect lifecycle
First determine whether the container is running, restarting or exited. Exit status provides clues.

## Logs
Read application stdout and stderr logs. Containers work best when applications write logs to standard streams rather than hidden local files.

## Configuration
Inspect environment variables, mounted files and runtime arguments. A correct image can fail because configuration is missing.

## Ports
Distinguish the port the process listens on inside the container from the port exposed by the host or platform.

## Bind address
A server listening only on 127.0.0.1 inside a container may not accept traffic through the container network. Many services should bind to 0.0.0.0 inside the container.

## Resource limits
Memory or CPU limits can terminate or throttle workloads. Check platform events when logs stop unexpectedly.

## Filesystem
Container filesystems are often ephemeral. Persistent data should live in an appropriate external volume or managed service.

## Check your understanding
A container is running but the service is unreachable. List five checks in order before rebuilding the image.

## Key takeaways
Debug containers by separating image, configuration, network and resource problems. Rebuilding is not the first answer to every failure.`,

"Continuous Integration and Delivery":`## Learning objectives
You will understand how CI/CD turns source changes into tested, repeatable software delivery.

## Continuous integration
CI automatically validates changes. Common steps include installing dependencies, static analysis, type checking, tests and a production build.

CI should run from a clean environment so hidden developer-machine state does not mask problems.

## Continuous delivery
Continuous delivery keeps software in a deployable state. Deployment may still require approval.

Continuous deployment goes further by automatically releasing changes after required checks.

## Artifacts
A build may produce an artifact such as a container image or compiled bundle. Promote the same verified artifact between environments when possible.

## Secrets
CI systems need controlled access to deployment credentials. Store them in protected secret systems, not repository files.

## Branch protection
Teams can require reviews and checks before merging to protected branches.

## Failure handling
A failed pipeline should stop unsafe deployment. It should also provide enough logs to diagnose the failing step.

## Check your understanding
Explain why running tests after deployment is too late as the only quality control. Then explain why pre-deployment CI still does not replace production verification.

## Key takeaways
CI/CD creates repeatability and evidence. Build once, validate consistently, protect credentials and verify the live system after release.`,

"Design a CI/CD Pipeline":`## Learning objectives
You will design a pipeline that moves from source code to deployment with explicit quality gates.

## Trigger
Decide when the pipeline runs: every pull request, pushes to main, releases or manual dispatch.

## Install
Use a reproducible dependency method. Lockfile consistency matters.

## Quality checks
Run type checks, linting where useful, unit/integration tests and security checks appropriate to the project.

## Build
Create the production artifact using production-compatible settings. A development server starting successfully is not a build test.

## Deployment
Authenticate using short-lived or protected credentials when possible. Deploy only from trusted branches or approved releases.

## Verification
After deployment, run smoke tests against a health endpoint and critical user flows.

## Rollback
Know which previous artifact or platform version can be restored.

## Practical task
Write a pipeline for Sawa Academy with checkout, Node setup, dependency installation, typecheck, production build, Cloudflare deployment and health verification.

## Key takeaways
A pipeline is an automated release policy. Each step should have a reason, and a failed safety check should prevent promotion.`,

"Infrastructure as Code":`## Learning objectives
You will understand declarative infrastructure, state and why infrastructure changes should be reviewed like application code.

## Declarative configuration
Infrastructure as Code describes desired resources in files. A tool compares desired configuration with actual state and plans changes.

## Benefits
Configuration can be reviewed, versioned and recreated. Teams gain an audit trail instead of relying entirely on manual console clicks.

## State
Some IaC tools maintain state describing managed resources. Protect state because it may contain sensitive information and is essential for correct planning.

## Modules
Reusable modules reduce duplication but should not hide important behavior.

## Drift
Manual changes outside the IaC workflow can create drift. Detect and reconcile drift rather than assuming code always matches reality.

## Plan before apply
Review planned changes carefully, especially deletions, replacements and network changes.

## Secrets
Do not store secret values in plain-text IaC files. Reference secret stores or protected variables.

## Check your understanding
Explain why changing a production firewall manually may create problems even if the change fixes an incident.

## Key takeaways
Infrastructure as Code makes infrastructure reviewable and repeatable. State, drift and destructive plans require careful operational discipline.`,

"Monitoring, Logs and Alerts":`## Learning objectives
You will learn how metrics, logs and alerts provide visibility into production systems.

## Metrics
Metrics are numerical measurements over time: request rate, error rate, latency, CPU and memory.

## Logs
Logs record discrete events with context. Structured logs are easier to search than unstructured sentences.

## Traces
Distributed tracing follows a request across multiple services and helps locate latency or failure.

## Health versus correctness
A server can be running while an important business function is broken. Monitor both infrastructure and user-relevant behavior.

## Alerts
Alerts should point to conditions requiring action. Too many noisy alerts train teams to ignore them.

## Context
Include request identifiers and useful metadata in logs, but never log passwords, tokens or sensitive personal data unnecessarily.

## Example
An academy health endpoint is 200, but enrollment requests suddenly fail. A business metric on enrollment errors can detect what CPU monitoring cannot.

## Check your understanding
Choose one web application and define two infrastructure metrics, two application metrics and one alert that should wake an operator.

## Key takeaways
Observability helps you ask what is happening and why. Use multiple signals and design alerts around meaningful impact.`,

"Incident Response Basics":`## Learning objectives
You will learn a disciplined process for handling production incidents without making the situation harder to understand.

## Confirm impact
Describe what users cannot do and when the problem began. Avoid vague statements such as "site broken."

## Stabilize
Protect users and data first. Options may include rollback, disabling a failing feature or reducing traffic to an unhealthy component.

## Preserve evidence
Record timestamps, errors, recent deployments and actions taken. Do not erase logs or change many variables simultaneously.

## Communicate
State what is known, what is uncertain and when the next update will occur. Avoid guessing causes publicly.

## Recover
Restore normal service and verify the user journey, not just the infrastructure dashboard.

## Learn
Afterward, document contributing factors and corrective actions. Focus on system improvement rather than blame.

## Practical task
Write an incident note for a deployment that causes student login failures. Include impact, timeline, containment, recovery and follow-up.

## Key takeaways
Incident response prioritizes impact, evidence, controlled recovery and learning. Clear communication is part of technical operations.`,

"Production Readiness Review":`## Learning objectives
You will use a structured checklist to decide whether a service is ready for real users.

## Reliability
Identify critical dependencies, health checks, restart behavior and capacity assumptions.

## Security
Review authentication, authorization, secrets, network exposure, input validation and dependency risk.

## Data
Confirm schema changes are reproducible, backups are appropriate and destructive migrations have recovery plans.

## Observability
Ensure meaningful logs, metrics and alerts exist for critical flows.

## Deployment
Confirm CI is green, runtime configuration is present and rollback is possible.

## User flows
Test registration, login, permissions, core transactions and failure paths in the production environment.

## Documentation
Operational procedures should identify who can deploy, how secrets are managed and what to do during common failures.

## Final exercise
Perform a readiness review of Sawa Academy. Do not mark an item complete because code exists. Require evidence from the live environment.

## Key takeaways
Production readiness is evidence-based. A successful build is one checkpoint; security, data integrity, operations and real user journeys complete the picture.`
};
