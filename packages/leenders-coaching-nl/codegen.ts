import * as dotenv from "dotenv";

import type { CodegenConfig } from "@graphql-codegen/cli";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

if (!process.env.NEXT_PUBLIC_SANITY_API_TOKEN) {
  throw new Error("NEXT_PUBLIC_SANITY_API_TOKEN is required");
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "unh7vl3r";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const config: CodegenConfig = {
  schema: [
    {
      [`https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`]: {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
        },
      },
    },
  ],
  documents: ["src/lib/gql/**/*.{ts,tsx}"],
  generates: {
    "./src/lib/gql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
        gqlTagName: "gql",
      },
    },
    "./src/lib/gql/generated/schema.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
    "./src/lib/gql/generated/types.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        dedupeFragments: true,
        pureMagicComment: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
