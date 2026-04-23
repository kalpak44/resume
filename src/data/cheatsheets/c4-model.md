The **C4 Model** is a simple way to describe software architecture.

It uses **4 levels of diagrams**, from high-level overview to detailed code.

C4 =

- **C1 - Context**
- **C2 - Container**
- **C3 - Component**
- **C4 - Code**

The idea:
Start simple → Add more detail step by step.

# Why Use C4?

- Makes architecture easy to understand
- Works for technical and non-technical people
- Avoids messy, unclear diagrams
- Focuses on clarity instead of tools

# C1 - Context Diagram (Big Picture)

### Question it answers:

What is this system and who uses it?

### Shows:

- Your system
- Users
- External systems
- High-level relationships

### Does NOT show:

- Databases
- Internal services
- Technical details

### Example:

User → E-Commerce System → Payment Provider

This diagram is for:

- Business stakeholders
- Product managers
- New team members

Keep it simple.

# C2 – Container Diagram (System Overview)

### Question it answers:

What are the main building blocks?

A **container** is:

- Web app
- Mobile app
- Backend service
- Database
- Message broker

### Shows:

- Major applications/services
- How they communicate
- Technologies used (optional but useful)

### Example:

- Web App (React)
- Backend API (Java Spring)
- Database (PostgreSQL)
- Redis Cache

This diagram is for:

- Engineers
- Architects
- DevOps

# C3 - Component Diagram (Inside a Container)

### Question it answers:

How is one container structured internally?

A **component** is:

- Service class
- Module
- Domain layer
- Controller
- Repository

### Shows:

- Internal structure
- Responsibilities
- Dependencies

Example inside Backend API:

- Auth Controller
- Order Service
- Payment Service
- Order Repository

This helps:

- Developers
- Code reviewers
- New team members

# C4 - Code Diagram (Detailed Level)

### Question it answers:

How is this component implemented?

This level may include:

- Classes
- Interfaces
- Methods
- Relationships

Often optional.
Usually only needed for complex parts.

# Summary Table

| Level | Name      | Focus                    | Audience        |
| ----- | --------- | ------------------------ | --------------- |
| C1    | Context   | System + external actors | Business + Tech |
| C2    | Container | Applications / services  | Engineers       |
| C3    | Component | Internal modules         | Developers      |
| C4    | Code      | Classes / implementation | Developers      |

# Key Principles of C4

## 1. One Diagram per Level

Don’t mix levels in one diagram.

Bad:

- Showing classes and users together

Good:

- Separate diagrams

## 2. Clear Naming

Every box should include:

- Name
- Short description
- Technology (optional)

Example:

Order API
Handles order processing
(Java + Spring Boot)

## 3. Focus on Relationships

Always show:

- Who calls whom
- How they communicate (HTTP, gRPC, events)

Architecture = relationships.

## 4. Keep It Simple

Avoid:

- Infrastructure overload
- Kubernetes internals (unless relevant)
- Too many arrows

Clarity > completeness.

# Typical C4 Flow

When documenting a system:

1. Start with C1 (big picture)
2. Create C2 (system structure)
3. Add C3 for important containers
4. Add C4 only if necessary

# Common Mistakes

- Mixing abstraction levels
- Adding too much detail
- Not updating diagrams
- Focusing on tools instead of clarity

# C4 vs Traditional UML

C4 is:

- Simpler
- More practical
- Easier to maintain
- Focused on real architecture

UML is:

- More formal
- Often too detailed
- Hard to read for non-engineers

# Tools for C4

You can create C4 diagrams using:

- Draw.io
- Miro
- Structurizr
- PlantUML
- Mermaid

Tool does not matter.
Clarity matters.

# When to Use C4

- New project architecture
- System redesign
- Onboarding documentation
- Technical design reviews
- Microservices overview

# Quick Checklist

Before sharing your C4 diagrams:

- [ ] Clear system boundary
- [ ] Clear external dependencies
- [ ] No mixed abstraction levels
- [ ] Simple, readable layout
- [ ] Consistent naming

# Key Takeaway

C4 is about communication.

It helps answer:

- What is this system?
- How is it structured?
- How do parts interact?
- Where should I look in the code?

Good architecture diagrams reduce confusion.
