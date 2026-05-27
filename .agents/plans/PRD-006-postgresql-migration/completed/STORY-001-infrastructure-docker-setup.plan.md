---
story: STORY-001
prd: PRD-006
slug: infrastructure-docker-setup
title: PostgreSQL Infrastructure Setup
type: REFACTOR
complexity: LOW
epic_branch: epic/PRD-006-postgres-migration
created: 2026-05-27
---

# Plan: PostgreSQL Infrastructure Setup

## Summary

This plan covers the creation of a `docker-compose.yml` file to spin up a local PostgreSQL 16 instance. This instance will act as our Analytical Database. We will configure it with standard environment variables for user, password, and database name, and mount a volume to persist data. We will also prepare the `initdb.d` folder mapping, which will be used in STORY-002 to populate the schema.

## User Story

As a Developer
I want to set up a local PostgreSQL instance using Docker Compose
So that I have a reliable and isolated environment for data analysis

## Story Reference

- Story file: `.agents/stories/PRD-006-postgresql-migration/STORY-001-infrastructure-docker-setup.md`
- PRD: `.agents/PRDs/PRD-006-postgresql-migration/PRD.md`

## Metadata

| Field | Value |
|-------|-------|
| Type | REFACTOR |
| Complexity | LOW |
| Systems Affected | Infrastructure, Docker |
| Story | STORY-001 |
| PRD | PRD-006 |
| Epic Branch | `epic/PRD-006-postgres-migration` (commit directly on this branch) |

---

## Skills In Use

| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| None specifically | Standard Docker Compose setup | Task 1 |

---

## Patterns to Follow

### Infrastructure Configuration
We will place `docker-compose.yml` in the root of the project to allow easy startup (`docker-compose up -d`) across the entire repository. We will use the official `postgres:16-alpine` image to keep the footprint small.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `docker-compose.yml` | CREATE | Defines the PostgreSQL service, network, and volumes. |
| `.gitignore` | UPDATE | Ignore the local PostgreSQL data volume directory. |

---

## Tasks

Execute in order. Each task is atomic + verifiable.

### Task 1: Create docker-compose.yml

- **File**: `docker-compose.yml`
- **Action**: CREATE
- **Implement**: 
  - Define `version: '3.8'`
  - Define service `analytics-db`
  - Use image `postgres:16-alpine`
  - Set ports `5432:5432`
  - Set environment variables:
    - `POSTGRES_USER=agent_user`
    - `POSTGRES_PASSWORD=agent_password`
    - `POSTGRES_DB=analytics_db`
  - Mount volume `./postgres-data:/var/lib/postgresql/data`
  - Mount volume `./backend/alembic/analytics_init:/docker-entrypoint-initdb.d` (We will use this in STORY-002, but we declare the bind mount now).
  - Add a healthcheck (pg_isready).
- **Validate**: File is syntactically valid YAML.

### Task 2: Update .gitignore

- **File**: `.gitignore`
- **Action**: UPDATE
- **Implement**: Add `postgres-data/` to the ignore list to ensure database files are not committed to source control.
- **Validate**: `git status` does not show `postgres-data/` as an untracked directory if it is created.

---

## End-to-End Tests

- [ ] `docker-compose up -d` starts the container successfully.
- [ ] `docker-compose ps` shows the `analytics-db` container as healthy.
- [ ] Connecting to `localhost:5432` with user `agent_user` and database `analytics_db` succeeds.

---

## Validation

```bash
docker-compose config -q
```

---

## Acceptance Criteria

- [ ] A `docker-compose.yml` file is created at the root or a dedicated folder.
- [ ] PostgreSQL 16 image is used with a health check.
- [ ] Data is persisted via a Docker volume.
- [ ] Container starts correctly with `docker-compose up -d`.
- [ ] Database is accessible from the host on port 5432 (or configurable).
- [ ] All tasks completed
