# GROQ Queries

This directory contains all GROQ queries used throughout the application for fetching data from Sanity.

## Usage

Import queries from this directory and use them with the `groq` function from `@/utilities/sanity`:

```typescript
import { groq } from "@/utilities/sanity";
import { HOME_PAGE_QUERY } from "@/groq/queries";
import type { HOME_PAGE_QUERYResult } from "@/types/sanity/groq";

// Fetch data with type safety
const homePage = await groq<HOME_PAGE_QUERYResult>(HOME_PAGE_QUERY);
```

## Type System

The types for these queries are defined in `@/types/sanity/groq.ts` and utilize the Sanity schema types that are automatically generated in `@/types/sanity/schema.ts`.

To update the schema types when your Sanity schema changes:

```bash
# Run from the frontend package
pnpm run update-types
```

## Naming Convention

Query constants follow this naming convention:

- All uppercase with underscores (`HOME_PAGE_QUERY`)
- Suffix `_QUERY` for all queries
- Corresponding type ends with `Result` (`HOME_PAGE_QUERYResult`)

## Design Principles

1. **Explicit Projections**: Always specify which fields to include rather than using `...` to avoid overfetching.
2. **Strong Typing**: All queries have corresponding TypeScript types.
3. **Reusability**: Queries are designed to be reusable across the application.
4. **Performance**: Use projections and filters to minimize data transfer.
