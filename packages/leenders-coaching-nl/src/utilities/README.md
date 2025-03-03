# Utilities

This folder contains various utility functions and helpers for the Leenders Coaching website.

## Page Utilities

The `page.tsx` file provides generic utilities for handling page data from Sanity CMS, generating metadata, and rendering page sections.

### Usage

#### Basic Usage with `createPageComponent`

The easiest way to use these utilities is with the `createPageComponent` function:

```tsx
import type { Metadata } from "next";
import type { ContactPage } from "@/generated/graphql";
import { createPageComponent } from "@/utilities/page";

// Create page component with type, fallback title, and optional wrapper
const { getMetadata, PageComponent } = createPageComponent<ContactPage>(
  "contactPage",
  "Contact | Leenders Coaching",
);

// Generate metadata from Sanity data
export const generateMetadata = (): Promise<Metadata> => getMetadata();

// Default export is the page component
export default PageComponent;
```

#### Advanced Usage

For more custom implementations, you can use the individual utility functions:

```tsx
import type { Metadata } from "next";
import {
  getPageData,
  generatePageMetadata,
  renderPageSections,
} from "@/utilities/page";
import type { AboutPage } from "@/generated/graphql";

// Fetch page data
const getAboutPage = async (): Promise<AboutPage | null> => {
  return await getPageData<AboutPage>("aboutPage");
};

// Generate metadata
export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();
  return generatePageMetadata(aboutPage, "About | Leenders Coaching");
}

// Custom page component with wrapper
export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  // Use a custom wrapper
  return renderPageSections(aboutPage, (children) => (
    <div className="about-page">
      <h1>About Us</h1>
      {children}
    </div>
  ));
}
```

### Available Functions

- `getPageData<T>`: Generic function to fetch page data from Sanity
- `generatePageMetadata`: Generates Next.js metadata object from page data
- `renderPageSections`: Renders page sections using the SectionRenderer component
- `createPageComponent`: Factory function that creates both the metadata and page component
