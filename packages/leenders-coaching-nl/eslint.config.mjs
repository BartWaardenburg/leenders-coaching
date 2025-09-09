import { dirname } from "path";
import { fileURLToPath } from "url";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import storybookPlugin from "eslint-plugin-storybook";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  // Base config for all files
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/generated/**",
      "**/lib/gql/generated/**",
      "**/next-env.d.ts",
      "**/coverage/**",
      "**/storybook-static/**",
      "**/build/**",
      "**/.storybook-static/**",
      "**/*.bundle.js",
      "**/*.min.js",
      "**/*.cjs",
      "**/scripts/**/*.cjs",
      "!.storybook" // Ensure .storybook directory is linted
    ]
  },

  // Storybook recommended configuration
  ...storybookPlugin.configs['flat/recommended'],

  // Global plugins and settings
  {
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "@next/next": nextPlugin,
      storybook: storybookPlugin,
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module"
    },
    settings: {
      react: {
        version: "detect"
      },
      "import/resolver": {
        typescript: true,
        node: true
      }
    }
  },

  // TypeScript files only
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ["./tsconfig.json", "./.storybook/tsconfig.json"],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2022,
        sourceType: "module"
      }
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": ["error", {
        "checksVoidReturn": false
      }],
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-explicit-any": "error",

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",

      // Import rules
      // "import/order": ["error", {
      //   "newlines-between": "always",
      //   "alphabetize": {
      //     "order": "asc",
      //     "caseInsensitive": true
      //   }
      // }],

      // Next.js rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-title-in-document-head": "error",

      // General rules
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error"
    }
  },

  // Storybook files
  {
    files: [".storybook/**/*"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Story files - apply Storybook-specific rules
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      // Enable specific Storybook rules to catch anti-patterns
      'storybook/csf-component': 'error',
      'storybook/default-exports': 'error',
      'storybook/hierarchy-separator': 'error',
      'storybook/no-redundant-story-name': 'error',
      'storybook/no-stories-of': 'error',
      'storybook/prefer-pascal-case': 'error',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'error',
      'storybook/use-storybook-testing-library': 'error',
      'storybook/await-interactions': 'error',
      'storybook/context-in-play-function': 'error',
      'storybook/no-renderer-packages': 'error',
      'storybook/no-uninstalled-addons': 'error',
    },
  },

  // Test files
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off"
    }
  },

  // JavaScript files (including CommonJS)
  {
    files: ["**/*.{js,jsx,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script"
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error"
    }
  }
];

export default eslintConfig;
