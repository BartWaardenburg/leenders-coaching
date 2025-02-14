import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/graphql/${process.env.NEXT_PUBLIC_SANITY_DATASET}/default`,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        scalars: {
          Date: 'string',
          DateTime: 'string',
          JSON: '{ [key: string]: any }',
        },
        dedupeFragments: true,
      },
    },
    './src/graphql/generated/schema.json': {
      plugins: ['introspection'],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  ignoreNoDocuments: true,
};

export default config;
