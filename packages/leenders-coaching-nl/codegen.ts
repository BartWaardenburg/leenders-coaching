import type { CodegenConfig } from "@graphql-codegen/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/default`,
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/graphql/generated/schema.json": {
      plugins: ["introspection"],
    },
    "./src/graphql/generated/types.ts": {
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
