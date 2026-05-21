---
id: STORY-001
prd: PRD-004
slug: agent-setup
title: Pydantic AI Agent Setup
type: technical
priority: high
complexity: medium
phase: 1
status: done
labels: [backend, ai]
epic_branch: epic/PRD-004-backend-agent
plan: .agents/plans/PRD-004-backend-agent/completed/STORY-001-agent-setup.plan.md
report: .agents/reports/PRD-004-backend-agent/STORY-001-agent-setup.report.md
commit: 8065e3628c02c69b83bf87fee6c24bb79955d16e
depends_on: []
blocks: [STORY-002, STORY-003]
skills: [building-pydantic-ai-agents]
created: 2026-05-21
updated: 2026-05-21
---

# STORY-001: Pydantic AI Agent Setup

## Description

As a developer, I want to configure the `pydantic-ai` agent with the correct system prompt and dependency types so that it can receive database connections and conversation history.

## Acceptance Criteria

- [ ] Given the backend project, when I define the `Agent`, then it includes a detailed system prompt explaining its role as a database analyst.
- [ ] Given the agent configuration, when I define `Deps`, then it includes fields for the SQLite session and the analytical database engine.
- [ ] Given a test run, when I execute the agent without tools, then it responds using the defined LLM (GPT-4o/mini).

## Technical Notes

- File to create: `app/services/agent.py`.
- Define `Agent(model='openai:gpt-4o-mini', deps_type=AgentDeps)`.
- System prompt should instruct the agent to use tools to discover schema.

## Dependencies

- **Blocked by**: None
- **Blocks**: STORY-002, STORY-003

## PRD Reference

Source: [`PRD-004/PRD.md`](../../PRDs/PRD-004-backend-agent/PRD.md) — section 12 (Phase 1)
