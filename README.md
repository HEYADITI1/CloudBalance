# CloudBalance – FinOps Application

## Introduction

CloudBalance is a FinOps-based cloud cost management application developed for educational purposes. It implements Role-Based Access Control (RBAC) to manage user permissions and provides multiple dashboards to explore and manage cloud financial and service data.

The platform allows administrators to manage users, onboard cloud accounts, and assign accounts to customers. Users can view simulated and real-time cloud data through dashboards such as User Management, Onboarding, Cost Explorer, and AWS Services.

---

## Project Scope

CloudBalance allows users to:

- Log in securely based on their role (Admin, Read-Only, or Customer).
- Access dashboards according to role-based permissions.
- View simulated and real-time cloud data.
- Access dashboards like User Management, Onboarding, Cost Explorer, and AWS Services.
- Admin users have full access, while Read-Only and Customer users have restricted access.
- Admin users can assign cloud accounts to Customer users.

---

## Functional Impementations

### Login

**Description:**  
Users log in to CloudBalance based on their assigned role.

**Requirements:**

- Users log in with a username and password.
- No signup, password recovery, or two-factor authentication is required.
- Users are automatically logged out after 15 minutes of inactivity.
- Users are redirected to dashboards based on their assigned role.

**Acceptance Criteria:**

- Users can log in with valid credentials.
- Users are logged out after inactivity.
- Users are directed to the correct dashboard according to role.

---

### RBAC (Role-Based Access Control)

CloudBalance supports three roles: Admin, Read-Only, and Customer.

#### Admin Role
- Full access to all dashboards (read-write).
- Can onboard cloud accounts.
- Can manage users and assign roles.
- Can assign multiple cloud accounts.
- User deletion is not allowed.

#### Read-Only Role
- View access to all dashboards.
- Cannot modify any data.

#### Customer Role
- Access only to Cost Explorer and AWS Services dashboards.
- Can view only assigned cloud accounts.
- Cannot modify any data.

**Acceptance Criteria:**

- Admin has full control.
- Read-Only users have view-only access.
- Customer users can view only assigned accounts.

---

## Dashboards

### User Management Dashboard (Admin / Read-Only)

- Admin can create and edit users.
- Admin can assign roles.
- Admin can assign orphan and already assigned cloud accounts.
- Multiple accounts can be assigned to a single customer.
- Orphan accounts remain unassigned until linked.

---

### Onboarding Dashboard (Admin Only)

- Admin can onboard multiple cloud accounts.
- Admin can assign cloud accounts to Customer users.
- Assigned accounts appear in Cost Explorer and AWS Services dashboards.

---

### Cost Explorer Dashboard (Admin / Read-Only / Customer)

- Displays simulated cloud cost data.
- Data source: Snowflake or dummy data.
- Customer users can select assigned accounts.
- Admin and Read-Only users can view all accounts.
- Cost visualization is implemented using FusionCharts.

---

### AWS Services Dashboard

- Displays cloud service-related data.
- Access is role-based.
- Customer users can view only assigned accounts.

---

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- FusionCharts

### Backend
- Java
- Spring Boot
- REST APIs
- JWT Authentication

### Database
- Snowflake
- Dummy Data (for testing)
 
---

## Key Features

- Role-Based Access Control
- Secure session handling
- Cloud account onboarding
- Cost visualization dashboards
- Multi-account assignment
- FinOps learning-based design

---

## Purpose

This project is developed for educational and learning purposes to understand:

- FinOps concepts
- RBAC implementation
- Cloud cost management
- Full-stack development 


