# Leenders Coaching Website

A modern, type-safe website built with Next.js 14 and Sanity.io.

## Architecture Overview

### Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **CMS**: Sanity.io
- **Data Layer**: GraphQL
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Component Development**: Storybook
- **Form Handling**: react-hook-form + zod
- **Animation**: Framer Motion
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

## Page Builder Architecture

### Section Components Pattern

Each section follows a strict pattern to ensure type safety and maintainability:

```
components/sections/
├── transforms/                # Centralized transformation logic
│   ├── types.ts              # Generated type augmentations
│   ├── blog.ts               # Blog section transformer
│   ├── cards.ts              # Cards section transformer
│   └── index.ts              # Transformer registry
│
├── SectionBlog/
│   ├── SectionBlog.tsx       # UI Component
│   └── index.ts             # Public exports
│
├── SectionCards/
│   ├── SectionCards.tsx      # UI Component
│   └── index.ts             # Public exports
│
└── index.ts                  # Public section exports
```

The `transforms` directory handles all type definitions and data transformations:

```typescript
// components/sections/transforms/types.ts
import type { Generated } from "@/graphql/generated";

// Augment generated types with UI-specific needs
export interface BlogSectionProps {
  title: string;
  posts: PostProps[];
  // ... other UI-specific props
}

// Map generated types to UI props
export interface TransformerMap {
  sectionBlog: {
    input: Generated.SectionBlog;
    output: BlogSectionProps;
  };
  // ... other sections
}

// components/sections/transforms/blog.ts
import type { TransformerMap } from "./types";

export const transformBlog = (
  input: TransformerMap["sectionBlog"]["input"],
): TransformerMap["sectionBlog"]["output"] | null => {
  // Transform Sanity data to UI props
  return {
    title: input.title ?? "",
    posts: input.posts?.map(transformPost) ?? [],
    // ... other transformations
  };
};

// components/sections/transforms/index.ts
import { transformBlog } from "./blog";
// ... other imports

export const transformers = {
  sectionBlog: transformBlog,
  // ... other transformers
} as const;
```

Each UI component focuses solely on rendering and behavior:

```typescript
// components/sections/SectionBlog/SectionBlog.tsx
import type { BlogSectionProps } from '../transforms/types';

export const SectionBlog = ({
  title,
  posts,
  // ... other props
}: BlogSectionProps) => {
  return (
    // ... UI implementation
  );
};
```

This organization provides several benefits:

1. **Centralized Type Management**

   - All types are co-located with their transformers
   - Clear separation between generated and UI types
   - Easy to find and maintain type definitions

2. **Focused Components**

   - UI components only handle rendering
   - No type complexity in component files
   - Clear separation of concerns

3. **Type-Safe Transformations**
   - Transformers are grouped with their types
   - Easy to maintain type relationships
   - Better IDE support and error detection

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

### Page Composition

1. **Sanity Document Schema**

```typescript
// studio-leenders-coaching-nl/schemaTypes/documents/page.ts
export const page = defineType({
  name: "page",
  type: "document",
  fields: [
    {
      name: "sections",
      type: "array",
      of: [
        { type: "sectionBlog" },
        { type: "sectionCards" },
        { type: "sectionContent" },
        // ... other section types
      ],
    },
  ],
});
```

2. **GraphQL Query Pattern**

```graphql
query Page($slug: String!) {
  page(slug: $slug) {
    sections {
      _type
      _key
      ... on SectionBlog {
        ...SectionBlog
      }
      ... on SectionCards {
        ...SectionCards
      }
      # ... other section fragments
    }
  }
}
```

3. **Page Component Pattern**

```typescript
// app/[slug]/page.tsx
export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);
  if (!page) return notFound();

  return <PageSections sections={page.sections} />;
}
```

### Section Rendering Pattern

The new section rendering system uses a more direct approach:

1. **Type Definitions**

```typescript
// Section type discriminated union
type Section =
  | ({ _type: "sectionBlog" } & SectionBlogProps)
  | ({ _type: "sectionCards" } & SectionCardsProps);
// ... other section types

// Component registry
const SECTION_COMPONENTS = {
  sectionBlog: SectionBlog,
  sectionCards: SectionCards,
  // ... other components
} as const;
```

2. **Type-Safe Section Transformer**

```typescript
// Transform Sanity data to UI props
function transformSection(section: SanitySection): Section | null {
  switch (section._type) {
    case "sectionBlog":
      return transformBlogSection(section);
    case "sectionCards":
      return transformCardsSection(section);
    // ... other sections
  }
}
```

3. **Section Renderer**

```typescript
function PageSections({ sections }: { sections: SanitySection[] }) {
  return sections.map(section => {
    const transformed = transformSection(section);
    if (!transformed) return null;

    const Component = SECTION_COMPONENTS[transformed._type];
    return <Component key={section._key} {...transformed} />;
  });
}
```

### Type Safety Benefits

1. **Schema Validation**

   - Sanity validates content against schema
   - GraphQL enforces type constraints
   - TypeScript ensures correct prop usage

2. **Exhaustive Type Checking**

   - Discriminated unions ensure all cases handled
   - Compiler catches missing transformations
   - Props type-checked at compile time

3. **IDE Support**
   - Full autocomplete for section props
   - Type hints for Sanity fields
   - Error detection in transformers

### Development Workflow

1. **Adding a New Section**

   a. Create UI Component:

   ```typescript
   // components/sections/SectionNew/SectionNew.tsx
   interface SectionNewProps {
     title: string;
     // ... other props
   }

   export const SectionNew = (props: SectionNewProps) => {
     // ... implementation
   };
   ```

   b. Create Sanity Schema:

   ```typescript
   // studio-leenders-coaching-nl/schemaTypes/sections/sectionNew.ts
   export const sectionNew = defineType({
     name: "sectionNew",
     fields: [
       ...baseSectionFields,
       // ... section-specific fields
     ],
   });
   ```

   c. Add GraphQL Fragment:

   ```graphql
   fragment SectionNew on SectionNew {
     ...SectionBase
     # ... section-specific fields
   }
   ```

   d. Create Transformer:

   ```typescript
   function transformNewSection(
     sanity: Generated.SectionNew,
   ): SectionNewProps | null {
     // Transform Sanity data to UI props
   }
   ```

2. **Updating Existing Sections**

   a. Update UI Component Props:

   ```typescript
   interface SectionExistingProps {
     // Update prop types
   }
   ```

   b. Update Sanity Schema:

   ```typescript
   export const sectionExisting = defineType({
     // Update fields
   });
   ```

   c. Update GraphQL Fragment:

   ```graphql
   fragment SectionExisting on SectionExisting {
     # Update fields
   }
   ```

   d. Update Transformer:

   ```typescript
   function transformExistingSection(
     sanity: Generated.SectionExisting,
   ): SectionExistingProps | null {
     // Update transformation
   }
   ```

3. **Testing Changes**

   a. Run Type Generation:

   ```bash
   pnpm run codegen
   ```

   b. Type Check:

   ```bash
   pnpm run typecheck
   ```

   c. Test Transformations:

   ```typescript
   describe("transformExistingSection", () => {
     it("transforms valid data correctly", () => {
       // Test cases
     });
   });
   ```

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
