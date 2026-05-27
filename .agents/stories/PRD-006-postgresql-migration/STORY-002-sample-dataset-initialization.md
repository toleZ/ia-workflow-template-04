---
id: STORY-002
prd: PRD-006
slug: sample-dataset-initialization
title: Sample Dataset Initialization
type: feature
priority: medium
complexity: small
phase: 1
status: todo
labels: [database, data]
epic_branch: epic/PRD-006-postgres-migration
plan: null
report: null
commit: null
depends_on: [STORY-001]
blocks: [STORY-004]
skills: []
created: 2026-05-27
updated: 2026-05-27
---

# STORY-002: Sample Dataset Initialization

## Description

As a Developer, I want to populate the PostgreSQL instance with a "Sales & Analytics" dataset, so that the agent has meaningful data to query and analyze.

## Acceptance Criteria

- [ ] An `init.sql` script is created with the schema for `products`, `customers`, `orders`, and `order_items`.
- [ ] The script is automatically executed on container startup via Docker `initdb.d`.
- [ ] Sample data (at least 10 rows per table) is populated.
- [ ] Relationships (Foreign Keys) are correctly defined between tables.

## Technical Notes

- Schema should include diverse data types (INT, VARCHAR, DECIMAL, TIMESTAMP).
- Use realistic synthetic data.

## Dependencies

- **Blocked by**: STORY-001
- **Blocks**: STORY-004

## PRD Reference

Source: [PRD-006/PRD.md](../../PRDs/PRD-006-postgresql-migration/PRD.md) — Section 11, Phase 1
