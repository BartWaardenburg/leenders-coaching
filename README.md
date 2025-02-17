# Leenders Coaching Website

A modern, type-safe website built with Next.js and Sanity.io.

## Architecture Overview

### Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **CMS**: Sanity.io
- **Data Layer**: GraphQL
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Component Development**: Storybook
- **Form Handling**: react-hook-form + zod
- **Animation**: motion/react
- **Email Integration**: Resend

### Project Structure

```
packages/
├── leenders-coaching-nl/        # Next.js frontend
│   ├── src/
│   │   ├── app/                # Next.js app router pages
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Base UI components
│   │   │   ├── sections/      # Page section components
│   │   │   ├── providers/     # React context providers
│   │   │   └── layouts/       # Layout components
│   │   ├── graphql/           # GraphQL queries and types
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utilities/         # Utility functions
│   │   ├── types/             # Global TypeScript types
│   │   ├── config/            # Configuration files
│   │   ├── assets/            # Static assets
│   │   └── test/              # Test utilities
│   │
└── studio-leenders-coaching-nl/ # Sanity Studio
    └── schemaTypes/            # Sanity schema definitions
        ├── documents/          # Document type definitions
        ├── objects/           # Reusable object types
        ├── sections/          # Section type definitions
        ├── settings/          # Site settings schemas
        ├── footer/            # Footer configuration
        └── navigation/        # Navigation schemas
```

### Sanity Schema Pattern

Each section has a corresponding Sanity schema:

```
studio-leenders-coaching-nl/schemaTypes/sections/
├── baseSectionFields.ts  # Shared fields for all sections
└── sectionName.ts       # Section-specific schema
```

Example base section fields:

```typescript
export const baseSectionFields = [
  {
    name: "title",
    type: "string",
    title: "Internal Title",
  },
  {
    name: "displayTitle",
    type: "string",
    title: "Display Title",
  },
  {
    name: "background",
    type: "string",
    options: {
      list: ["blue", "purple", "green", "pink", "yellow", "teal"],
    },
  },
  {
    name: "maxWidth",
    type: "string",
    options: {
      list: ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"],
    },
  },
  {
    name: "showBorder",
    type: "boolean",
  },
];
```

### Type Generation Flow

1. **Sanity Schema → GraphQL Schema**

   - Sanity automatically generates a GraphQL API
   - Each section schema becomes a GraphQL type

2. **GraphQL → TypeScript Types**

   ```bash
   pnpm run codegen
   ```

   - Generates types in `src/graphql/generated/`
   - These types are the source of truth

3. **Generated Types → UI Props**
   - UI components use their own prop types
   - Type-safe transformation from Sanity to UI props

### Best Practices

1. **Schema Design**

   - Use base fields consistently
   - Document field constraints
   - Consider content editor experience

2. **Type Safety**

   - Never use `any` or type assertions
   - Handle all nullable fields
   - Validate data transformations

3. **Performance**

   - Fetch page data in one query
   - Transform data at render time
   - Memoize heavy transformations

4. **Maintenance**
   - Keep UI components pure
   - Document transformation logic
   - Write comprehensive tests

## Getting Started

1. **Installation**

   ```bash
   pnpm install
   ```

2. **Development**

   ```bash
   # Start Next.js development server
   pnpm dev

   # Start Sanity Studio
   cd packages/studio-leenders-coaching-nl
   pnpm dev
   ```

3. **Type Generation**
   ```bash
   pnpm run codegen
   ```

## License

Private - All rights reserved
