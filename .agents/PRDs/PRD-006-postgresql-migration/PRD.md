---
id: PRD-006
slug: postgresql-migration
title: PostgreSQL Analysis Integration
status: draft
base_branch: main
epic_branch: epic/PRD-006-postgres-migration
created: 2026-05-27
updated: 2026-05-27
---

# PRD-006: PostgreSQL Analysis Integration

## 1. Executive Summary
The goal of this project is to enable the AI agent to perform real-time data analysis on a PostgreSQL database. While the application uses SQLite for session management and chat history, it requires a robust, scalable environment for analytical queries. This PRD outlines the setup of a local PostgreSQL instance using Docker, the integration of a sample "Sales & Global Analytics" dataset, and the implementation of backend tools that allow the Pydantic AI agent to explore and query this data safely.

## 2. Mission
To provide a seamless "Talk to your Data" experience by bridging natural language processing with structured SQL execution, ensuring high performance and data safety.
- **Safety First**: Strict `SELECT`-only execution.
- **Developer Experience**: Easy local setup with Docker.
- **Insightful**: Agent must be able to discover schemas autonomously.

## 3. Target Users
- **Data Analysts**: Who want to query data without writing SQL.
- **Business Users**: Who need quick answers from historical sales data.
- **Developers**: Who need a template for multi-DB AI applications.

## 4. MVP Scope

### In Scope
- [ ] Docker Compose setup for a local PostgreSQL 16 instance.
- [ ] SQL initialization script with a "Sales & Analytics" dataset (Tables: `products`, `orders`, `customers`, `order_items`).
- [ ] Backend configuration for a secondary database connection (PostgreSQL).
- [ ] Pydantic AI Tools:
    - `list_tables`: Lists available tables in the analytical DB.
    - `get_table_schema`: Retrieves columns and types for a specific table.
    - `execute_analytical_query`: Executes a `SELECT` query and returns structured results.
- [ ] System Prompt update to guide the agent on analytical behavior.

### Out of Scope
- [ ] Migration of SQLite session data to PostgreSQL (Sessions stay in SQLite for now).
- [ ] External PostgreSQL hosting (e.g., RDS/Supabase).
- [ ] Data visualization (charts/graphs) in this phase.
- [ ] Complex multi-statement transactions.

## 5. User Stories
- **As a User**, I want the agent to tell me what tables are available, so I know what data I can ask about.
- **As a User**, I want to ask "Who was our top customer last month?" and get a correct answer based on PostgreSQL data.
- **As a Developer**, I want to start the analytical DB with a single command (`docker-compose up`).
- **As a System**, I want to block any `INSERT`, `UPDATE`, or `DELETE` attempts to keep the analytical data intact.

## 6. Core Architecture & Patterns
- **Dual Database Pattern**: 
    - `SessionDB`: SQLite (Current) via SQLAlchemy.
    - `AnalysisDB`: PostgreSQL via `psycopg` (async) or `asyncpg`.
- **Repository Pattern**: Separate repository for Analytical queries to isolate logic from Session management.
- **Agentic Workflow**: Follows `building-pydantic-ai-agents` skill patterns for tool definition and dependency injection.

## 7. Tools/Features
### Execute Analytical Query Tool
- **Input**: A single SQL string.
- **Validation**: Check for `SELECT` keyword at the start. Reject anything else.
- **Output**: List of dictionaries (rows) or an error message.

## 8. Technology Stack
- **Backend**: FastAPI, Pydantic AI.
- **Database**: PostgreSQL 16 (Docker).
- **Driver**: `asyncpg` or `psycopg[binary]`.
- **Infrastructure**: Docker Compose.

## 9. Security & Configuration
- **Environment Variables**:
    - `ANALYTICS_DB_URL`: Connection string for PostgreSQL.
- **Read-Only Access**: The database user for the agent should ideally have `GRANT SELECT` only on the public schema.
- **Validation**: Backend-level regex check to ensure queries are read-only.

## 10. Success Criteria
- [ ] PostgreSQL container starts and stays healthy.
- [ ] Agent correctly identifies the schema of the `products` table.
- [ ] Agent returns accurate results for a `JOIN` query between `orders` and `customers`.
- [ ] Any `DROP TABLE` or `INSERT` query from the user is rejected by the agent or the tool validation.

## 11. Implementation Phases
### Phase 1: Infrastructure
- Create `docker-compose.yml`.
- Write `init.sql` with sample data.
- Verify connection via external tool (e.g., DBeaver or `psql`).

### Phase 2: Backend Integration
- Update `config.py` to handle Postgres credentials.
- Create `analytics_db.py` for the second engine/sessionmaker.
- Implement the `AnalysisRepository`.

### Phase 3: Agent Capabilities
- Define Pydantic AI tools in `app/services/agent.py`.
- Update system prompt with "Data Analyst" instructions.
- Test E2E via Chat.

## 12. Risks & Mitigations
- **SQL Injection**: Mitigated by using a read-only user and strict `SELECT` validation.
- **Environment Conflicts**: Mitigated by using standard Docker ports (5432) but allowing overrides via `.env`.
- **Large Result Sets**: Mitigation: Tool should implicitly add `LIMIT 100` if not present.

## 13. Appendix
- **Skills referenced**: `building-pydantic-ai-agents`, `fastapi-python`.
- **Dataset Source**: Synthetic "Sales Analytics" schema.
