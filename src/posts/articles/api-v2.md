PolicyEngine provides comprehensive microsimulation tools through multiple platforms: our web interface, Python packages, and API infrastructure. The API enables both our website and external applications such as [MyFriendBen](https://www.myfriendben.org/) and [Benefit Navigator](https://www.imaginela.org/benefit-navigator) to access PolicyEngine’s computational engine for precise benefit calculations and policy analysis.

To support our expanding user base and maintain robust performance, we have documented our architectural evolution and future development priorities. This technical specification will serve as a resource for current API users and potential contributors, detailing our infrastructure design decisions and planned enhancements.

## Overview

The purpose of this document is to give a brief overview of the current architecture and propose a new target architecture and high-level incremental steps to transition from one to the other for review

- Are we aligned on the problem statement?
  - Do we agree the target architecture addresses the problem statement
  - Does our incremental transition align with our priorities?

We expect the final architecture to

- Reduce the Google Cloud monthly costs by 90% (-$6,500 USD) reducing the amount and type of compute kept continuously “hot” and allocating more expensive hardware on an as-needed basis.
- Substantially reduce the code footprint and generally improve the maintainability of the API services we own.
- Substantially improve the observability of the services we run, providing detailed data for debugging and operations.

We do this by adjusting our API hosting environment and implementation frameworks.

For our hosting environment, we propose continuing to primarily use Google Cloud Platform for hosting our services, but leveraging Cloud Run, workflows, and metrics/logs/trace services to provide better cost, scalability, reliability and observability.

For our API stack we plan to combine our APIs (household and general) into a single, consistent API. For implementing our API we propose switching from Flask with SQLAlchemy to FastAPI and SQLModel with opentelemetry for trace/metric/log generation. We expect these changes to substantially reduce the code footprint and maintenance burden of our API code base.

As migrating from our current architecture to this improved version is non-trivial, we lay out an broad, incremental plan for transitioning from the current to target infrastructure below. This plan focuses on:

1. Reducing the standing cost of our existing application API
1. Improving the reliability and performance of our Household API
1. Generalizing the Household API to just the PolicyEngine API capable of supporting both the app and external client use cases.

Following review of this document, we plan to create a more detailed roadmap and implementation plan focusing the most detail on the near future and continuing to develop our plan as we implement.

## Scope

**In scope**

- Target architecture
  - Household and application API implementation
  - Associated services such as Auth0, AppEngine, etc.
  - Implementation stack (i.e. Flask/APIFlask/FastAPI/etc.)
- Observability
  - High-level path to incrementally replacing our current API
  - Are we making the right trade-offs/priority decisions?
  - What additional discussions/designs/investigations are required to actually implement our next steps?

**Out of scope**

- SPA application — this is currently being redesigned separately and should not block our API work.
- Testability/Deployment — Requires its own design
- Security — we need to do this, but as a separate document.
- The actual simulation code (policyengine.py, population data, etc) and associated stability/replicability/deployment/etc. issues — this is being covered separately in the linked reference below.
- Comparison of alternative stacks/hosting platforms — already done and included in references.
- Detailed tasking/scheduling — This document will be an input to that process.

## References

- [API Stack/hosting evaluation 2025](https://docs.google.com/document/d/1HdH59-8JWihJI7Apsx_tXYkL6yVZu6T8lY4OIWIIkdA/edit?tab=t.0#heading=h.vk2hnxs7lmu5) — details of what other hosting platforms/stack configurations we considered before landing on this target architecture.
- [policyengine.py package](https://docs.google.com/document/d/1YnevUaEarAl5-25veFlJP5amZHlraSSTbmAfoUTX3_o/edit?pli=1&tab=t.0) — moving all the “business logic” of running a simulation into a single package outside of the API.
- [FastAPI Demo](https://github.com/mikesmit/fastapi-demo) — repository demonstrating FAST API + integration with input/output and database model validation + observability + modularity.

## Current Architecture

### Flow Diagram (Simplified)

![](https://cdn-images-1.medium.com/max/2000/0*qJfIPrHyVyOszV7U)

- **PolicyEngine App** — React Single Page Application (SPA) providing a UIX for running simulations
- **External Clients**— MyFriendBen, Benefit Navigator, etc. external, paying customers of our API who build user experiences on top
- **API** — Flask-based API used to support the PolicyEngine app.
  - Runs on a single host because the service instance is stateful
  - Uses a local redis service to queue simulations
  - Uses a local worker process to run simulations
  - Uses a local sqlite database for storage of some data
- **Household API**— a completely separate API also implemented in flask and also running in app engine that only does household simulations
  - Used by external clients exclusively
- **Database** — Cloud SQL managed database for storing policies, households, user data, simulation results, etc.
- **Auth0**— external OAuth 2.0 provider used to authenticate external users

### Limitations

- **Scaling** — The current API scales by running more worker processes on a single, beefier container.
  - It is not currently possible to scale by adding more hosts because the API retains local state (SQLite database & redis task queue) which is not replicated across hosts.
- **Stability** — Because they all run on one host
  - Simulation workers can interfere with each other and bring down the API as a whole.
  - Bringing down one host brings down the whole service and loses state.
- **Cost** — The one container has to be scaled to support multiple workflows and stay up 100% of the time even though most of the time it is not running any workflows. This costs OOM 10K a month.
- **Observability** — The various components running in App Engine to not generate trace or metric information and provide limited logging.
- **Billing** — There is currently no automated mechanism to capture and bill for usage of the commercial API.
- **Maintenance**— Generally the system is hard to maintain.
  - Two completely separate services with separate code bases to do variations of the same thing
  - Use of Flask without any schema-based validation of inputs/outputs, Object Relational Mapper (ORM), standard traceability/logging, standard auth integration, etc. — more errors by default, more expensive to fix, harder to debug.

## Target Architecture

### Flow Diagram

![](https://cdn-images-1.medium.com/max/2000/0*W6Z9B7uHUKI-LlpV)

NOTE: Components only called out where new relative to current architecture

- **PolicyEngine API** — Instead of two completely separate APIs, one common API code base used to run multiple instances.
  - Auto-scaled using Cloud Run service across multiple containers
  - Using only the dedicated hardware required to run fast-api (minimal)
  - Integrated with GCP logging/metrics/trace for observability.
  - Uses GCP Cloud Workflow to delegate simulation tasks
- **GCP Workflow** — GCP-based orchestrator able to run a sequence of tasks, handle retries/errors, etc.
  - Supports running multiple parallel tasks to speed up economic simulations.
- **Simulation API** — FastAPI based Cloud Run TBD (job, service, function) used to actually execute simulation tasks on appropriate hardware.
  - Set up to auto-scale and use appropriate hardware for appropriate tasks.
- **Stripe** — Automated billing for API usage of paying customers.
- **logging/metrics/trace** — GCP observability integrations, automatically generated by all FastAPI-based services for all operations, SQL statements, and logs.

### Benefits

- **Scaling** - API is stateless and containers can be added/removed to support traffic
  - Compute-heavy tasks run in separate containers and can be separately scaled to support traffic
- **Stability** - Failure of a single container does not cause loss of state
  - Failure of a single container does not bring down the whole service
  - Retries and error state for simulation runs is managed by the GCP Cloud Workflow orchestrator
  - State is entirely maintained outside of any one container so loss of a container has limited impact on data loss.
- **Cost**
  - Compute tasks can be assigned to an appropriate container and be scaled appropriate to demand, reducing the need for and cost of “always on” hosts.
- **Observability** - All FastAPI-based services will be integrated with OpenTelemetry for metrics/logging/trace information providing good default observability for all services (latency, error rate, and log details for all operations and SQL queries by default)
- **Billing** — Addressed via Stripe integration.
- **Maintenance**
  - Unified code base — “Household API” vs. “API” is just a difference of configuration using a standard code base of standard API operations and options. All APIs support the same integrated features like database storage and observability.
  - FastAPI is used in combination with SQLModel, Auth0 security integration, opentelemetry integration, as well as pydantic validation of all input/output models to
  - Dramatically reduce errors
  - Dramatically reduce code

## Transition Plan

### Phase 1 — Reduce Cost of the main API

We initially tackle main API by removing the REDIS queue/worker setup and replacing it with a GCP workflow executed against a new Simulation API based on FastAPI and policyengine.py.

We then scale down the App Engine instance to just support running a Flask API, reducing the cost of the always-on host and configure the Simulation API to scale when used only, reducing that cost to the time to run actual simulation requests.

The main API otherwise remains the same and has many of the same limitations (local state, lack of easy observability, etc.)

Household API is unchanged.

### Flow Diagram

![](https://cdn-images-1.medium.com/max/2000/0*ckFoc6RAUJsqOQ7h)

### Benefits

- Cost reduction
- Demonstrate/vet technologies we propose for the main api
- Demonstrate integration with the Workflow service and GCP logging/metrics/trace
- Demonstrate FastAPI on Cloud Run with scaling

## Phase 2 — Implement Billing and Operations Improvements for Paying Customers

Household API is completely replaced by a new FastAPI-based implementation. This implementation is based on the full target architecture, but only implements the household simulation part of it.

Household simulations are executed using the same simulation API which is based on the new policyengine.py package.

### Flow Diagram

![](https://cdn-images-1.medium.com/max/2000/0*NirH7dEArZmw9CSZ)

### Benefits

- **Automated billing** — using Stripe, we can now automate metering and billing our API customers by usage.
- **Additional Flexibility** — the addition of the workflow and database mean the household API can be extended to operate like the main API (and this is the next step) will all the same features.
- **Improved observability/operability **— household API now generates traces/logging/metrics which will support robust alarming and debuggability.
- **Demonstrate/vet technologies**
  - Allows us to implement a small portion of the full API surface area (just household) using the full target architecture

## Phase 3+

We fully replace the web application with the new design currently being identified and implement it on top of the “Household API” by adding functionality until it is just the “PolicyEngine API”.

This will involve multiple phases and additional design work to flesh out.

- What data that customers re-use do we need to persist from the existing application/API?
- What links that customers may have saved/referenced do we need to persist from the existing application?
- What schema will we be using in our database to model users/policies/households/etc.?

## Cost Analysis

We estimate we could reduce our current monthly GCP compute bill from ~$7,000 a month to no more than $500 a month, net (based on very conservative assumptions). This should reduce our overall GCP cost by about 90%.

The primary driver of cost now is running AppEngine. The primary cost in the new system is running simulations as Cloud Run Functions.

In the target architecture the main river of cost is running our simulation (policyengine.py) in Cloud Run functions:

1. If running the simulation requires memory beyond 16G (doubles the cost from 16 to next increment of 32)
1. The number of simulations we run increases substantially
1. The average length of simulations increases substantially.

This analysis was done assuming substantially more traffic than what we currently receive all day, every day, all month.

### Current Major Drivers of Cost

AppEngine is by far the major driver of infrastructure costs on PolicyEngine comprising 90% of the GCP infrastructure cost.

![](https://cdn-images-1.medium.com/max/2000/1*yCLAHlhJYMKXkVIeYVYc0A.png)

### Estimated Compute Cost (Target Architecture)

Assuming we have transitioned both APIs to just do API and delegating all simulation to a workflow.

Cost was estimated using these usage estimates:

- Simulation API

  - Cloud Run function using 16GB and 2 CPUs — based on existing app engine configuration.
  - One minimum instance is hot at all times — reduce cold start time
  - 100 simulations a day every day all month averaging 15 minutes to run — WAG
  - Only one concurrent request per function at a time — currently safe limitation.

- API compute

  - 2 always active servers running the front end API and servicing 1M requests a month (roughly 1,000 requests and hour all month which is a very conservative WAG)
  - 2 CPU/1G RAM
  - 80 requests concurrent
  - 500 ms response

- Workflow (not in calculator despite documentation assertions. Pricing is here: [https://cloud.google.com/workflows/pricing)](https://cloud.google.com/workflows/pricing))
  - Assuming 2 internal steps per simulation workflow
  - Assuming 100 simulations a day every day for a month (100\*30 = 3000)

Total Cost: $538 a month ([calculator here](https://cloud.google.com/products/calculator?hl=en&dl=CjhDaVF4TmpnNFpEWmtNaTAwWTJSaUxUUTRPRGd0T0dSbFlTMHlNR0l6Tm1ZeE1HWTFPV1VRQVE9PRAcGiQ4RTAyNUQwMy02RENFLTQ5RjQtQTUxNi0xNEQ4NDFCNERDNEE))
