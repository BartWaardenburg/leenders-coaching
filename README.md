# Leenders Coaching Website

A modern, type-safe website built with Next.js and Sanity.io.

## Architecture Overview

### Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **CMS**: Sanity.io
- **Data Layer**: GraphQL
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Testing**: Vitest + React Testing Library
- **Component Development**: Storybook
- **Form Handling**: react-hook-form + zod
- **Animation**: motion/react
- **Email Integration**: Resend
- **Theme Management**: next-themes
- **Icon System**: react-icons

### Design System & Styling

The project implements a comprehensive design system with the following key features:

#### Visual Style Implementation

The website follows a clean, modern aesthetic with a focus on readability and user engagement:

- **Color Application**:

  - Soft pastel backgrounds for section differentiation
  - Muted teal, pink, and purple accents for service cards
  - High contrast text for optimal readability
  - Subtle borders to define content areas

- **Section Layout**:

  - Hero section with clear value proposition
  - Service cards in a three-column grid
  - Timeline component for coaching journey visualization
  - Testimonial cards with profile images
  - Pricing tables with highlighted features
  - Blog/insights grid with featured images

- **Content Hierarchy**:

  - Large, prominent headings using Playfair Display
  - Clear section dividers
  - Consistent vertical rhythm
  - Strategic use of white space
  - Card-based content organization

- **Interactive Elements**:

  - Subtle hover effects on cards and buttons
  - Expandable FAQ accordions
  - Smooth scroll navigation
  - Form elements with clear focus states
  - Animated timeline progression

- **Visual Components**:
  - Rounded corners on cards and buttons
  - Consistent padding and margins
  - Image placement with aspect ratio preservation
  - Icon integration for visual cues
  - Testimonial profile images in circular frames

#### Color System

- **Base Colors**: Carefully selected palette for light and dark modes
- **Pastel Variants**: Six primary colors (blue, purple, green, pink, yellow, teal) with light/dark variants
- **Semantic Colors**: Background, foreground, primary, secondary, accent, muted
- **Feedback Colors**: Destructive, success, warning states

#### Typography

- **Font Families**:
  - Primary: System font stack for optimal performance
  - Display: Playfair Display for headings
  - Monospace: For code and technical content
- **Text Components**:
  - `Heading`: Configurable levels (h1-h6) with consistent styling
  - `Text`: Multiple variants (default, muted, large, small, label, etc.)
  - Custom line heights and letter spacing

#### Layout Components

- **Flex**: Flexible layout component with comprehensive props
- **Grid**: Responsive grid system with container queries
- **Stack**: Vertical/horizontal stacking with configurable spacing
- **Section**: Page section component with consistent spacing
- **Container**: Max-width constraints and padding

#### UI Components

- **Button**: Multiple variants, sizes, and states
- **Card**: Configurable backgrounds and borders
- **Modal**: Animated overlay with theme support
- **Timeline**: Animated process visualization
- **Carousel**: Image and content sliders
- **Pagination**: Page navigation

#### Theme Support

- System-preferred theme detection
- Smooth theme transitions
- Persistent theme selection
- CSS custom properties for dynamic theming

#### Responsive Design

- Mobile-first approach
- Container queries for component-level responsiveness
- Consistent spacing scale
- Fluid typography

#### Animation

- Smooth page transitions
- Micro-interactions
- Loading states
- Scroll-based animations

#### Best Practices

- Semantic HTML structure
- ARIA attributes for accessibility
- Consistent spacing patterns
- Reusable component patterns
- Dark mode optimization

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
