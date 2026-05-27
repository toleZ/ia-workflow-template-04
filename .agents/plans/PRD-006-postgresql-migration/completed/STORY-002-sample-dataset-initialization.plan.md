---
story: STORY-002
prd: PRD-006
slug: sample-dataset-initialization
title: Sample Dataset Initialization
type: FEATURE
complexity: LOW
epic_branch: epic/PRD-006-postgres-migration
created: 2026-05-27
---

# Plan: Sample Dataset Initialization

## Summary

This plan outlines the creation of an initialization script (`init.sql`) to populate the newly created PostgreSQL analytical database with a sample "Sales & Analytics" dataset. The script will define the schema for four tables (`customers`, `products`, `orders`, and `order_items`) and insert synthetic data. The script will be placed in `backend/alembic/analytics_init/` so it is automatically executed by the PostgreSQL container on startup via the `docker-entrypoint-initdb.d` volume mapping.

## User Story

As a Developer
I want to populate the PostgreSQL instance with a "Sales & Analytics" dataset
So that the agent has meaningful data to query and analyze

## Story Reference

- Story file: `.agents/stories/PRD-006-postgresql-migration/STORY-002-sample-dataset-initialization.md`
- PRD: `.agents/PRDs/PRD-006-postgresql-migration/PRD.md`

## Metadata

| Field | Value |
|-------|-------|
| Type | FEATURE |
| Complexity | LOW |
| Systems Affected | Database |
| Story | STORY-002 |
| PRD | PRD-006 |
| Epic Branch | `epic/PRD-006-postgres-migration` |

---

## Skills In Use

| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| None specifically | Standard SQL script | Task 1 |

---

## Patterns to Follow

### Database Schema
We will create a standard relational schema suitable for analytical queries.
- `customers`: id, name, email, country, signup_date
- `products`: id, name, category, price
- `orders`: id, customer_id, order_date, status
- `order_items`: id, order_id, product_id, quantity, unit_price

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/alembic/analytics_init/init.sql` | CREATE | Defines schema and inserts sample data. |

---

## Tasks

Execute in order. Each task is atomic + verifiable.

### Task 1: Create SQL Initialization Script

- **File**: `backend/alembic/analytics_init/init.sql`
- **Action**: CREATE
- **Implement**: 
  - Create the `customers` table.
  - Create the `products` table.
  - Create the `orders` table (with FK to `customers`).
  - Create the `order_items` table (with FKs to `orders` and `products`).
  - Insert at least 10 rows of realistic sample data into each table.
- **Validate**: File is syntactically valid SQL.

### Task 2: Apply Initialization

- **Action**: COMMAND
- **Implement**: Restart the docker container to trigger `initdb.d` execution, or manually execute the SQL script inside the running container if the volume mapping didn't trigger an auto-init (since the container was already created in STORY-001).
- **Validate**: Connect to the DB and verify tables exist.

---

## End-to-End Tests

- [ ] Connect to `localhost:5435` with `agent_user`.
- [ ] Run `\dt` (or equivalent) to see `customers`, `products`, `orders`, `order_items`.
- [ ] Run `SELECT count(*) FROM customers;` and verify it returns >= 10.

---

## Validation

```bash
docker exec -i analytics-db psql -U agent_user -d analytics_db -c "SELECT count(*) FROM customers;"
```

---

## Acceptance Criteria

- [ ] An `init.sql` script is created with the schema for `products`, `customers`, `orders`, and `order_items`.
- [ ] The script is automatically executed on container startup via Docker `initdb.d` (or manually applied).
- [ ] Sample data (at least 10 rows per table) is populated.
- [ ] Relationships (Foreign Keys) are correctly defined between tables.
- [ ] All tasks completed
