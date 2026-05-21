import re
from dataclasses import dataclass
from sqlalchemy.orm import Session
from sqlalchemy import Engine, inspect, text
from pydantic_ai import Agent, RunContext, ModelRetry


@dataclass
class AgentDeps:
    """Dependencies for the Database Analyst Agent."""

    db: Session  # SQLite session for state/history
    analytics_db: Engine  # PostgreSQL engine for read-only queries


# Define the agent
db_analyst_agent = Agent(
    "openai:gpt-4o-mini",
    deps_type=AgentDeps,
    system_prompt=(
        "You are an expert AI Database Analyst. Your goal is to answer user questions "
        "by querying the analytical database.\n\n"
        "CRITICAL RULES:\n"
        "1. You must ONLY run SELECT queries. Any attempt to modify data (INSERT, UPDATE, DELETE, etc.) is strictly forbidden.\n"
        "2. Before writing a query, you MUST use your tools to discover the schema: \n"
        "   - Use `list_tables` to see what tables are available.\n"
        "   - Use `get_table_metadata` to see column names and types for specific tables.\n"
        "3. Never guess column names. Always verify them using the metadata tool.\n"
        "4. If a query fails, explain why and try to correct it based on the schema.\n"
        "5. Provide the final answer in natural language, but you may also include the SQL query you ran if it helps the user."
    ),
)


@db_analyst_agent.tool
def list_tables(ctx: RunContext[AgentDeps]) -> list[str]:
    """List all tables available in the database."""
    inspector = inspect(ctx.deps.analytics_db)
    return inspector.get_table_names()


@db_analyst_agent.tool
def get_table_metadata(ctx: RunContext[AgentDeps], table_name: str) -> str:
    """Get column names and types for a specific table."""
    try:
        inspector = inspect(ctx.deps.analytics_db)
        columns = inspector.get_columns(table_name)
        if not columns:
            raise ModelRetry(f"Table '{table_name}' not found or has no columns.")

        metadata = [f"{col['name']} ({col['type']})" for col in columns]
        return f"Table '{table_name}' columns: " + ", ".join(metadata)
    except Exception as e:
        raise ModelRetry(f"Error getting metadata for '{table_name}': {str(e)}")


@db_analyst_agent.tool
def execute_query(ctx: RunContext[AgentDeps], query: str) -> str:
    """Execute a raw SQL query and return the results as a string list of dictionaries."""
    # Safety check: Only SELECT queries are allowed
    clean_query = query.strip().upper()
    if not clean_query.startswith("SELECT"):
        raise ModelRetry("Query rejected: Only SELECT queries are allowed for security reasons.")

    # Prevent common mutation keywords even if they are inside a SELECT (e.g. subqueries)
    forbidden_keywords = r"\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|GRANT|REVOKE|TRUNCATE)\b"
    if re.search(forbidden_keywords, clean_query):
        raise ModelRetry("Query rejected: Potentially harmful keywords detected. Only read-only SELECT is permitted.")

    try:
        with ctx.deps.analytics_db.connect() as conn:
            result = conn.execute(text(query))
            # Limit results to 50 rows for token efficiency
            rows = [dict(row._mapping) for row in result.fetchmany(50)]
            if not rows:
                return "Query executed successfully but returned no results."
            return str(rows)
    except Exception as e:
        raise ModelRetry(f"SQL Execution Error: {str(e)}. Please correct the SQL query and try again.")

