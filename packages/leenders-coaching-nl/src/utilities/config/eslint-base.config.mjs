import { dirname } from "path";
import { fileURLToPath } from "url";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Shared ESLint base configuration for all packages in the monorepo.
 * 
 * This configuration provides common rules and settings that can be extended
 * by package-specific configurations.
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.packageDir - Directory of the package using this config
 * @param {string[]} options.additionalIgnores - Additional ignore patterns
 * @param {Object} options.additionalRules - Additional rules to apply
 * @param {string[]} options.additionalPlugins - Additional plugins to include
 * @returns {Array} ESLint configuration array
 */
export const createEslintBaseConfig = ({
  packageDir = __dirname,
  additionalIgnores = [],
  additionalRules = {},
  additionalPlugins = {},
} = {}) => {
  const baseIgnores = [
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
    "!.storybook", // Ensure .storybook directory is linted
    ...additionalIgnores,
  ];

  const basePlugins = {
    "@typescript-eslint": typescriptPlugin,
    import: importPlugin,
    react: reactPlugin,
    "react-hooks": reactHooksPlugin,
    "jsx-a11y": jsxA11yPlugin,
    ...additionalPlugins,
  };

  const baseRules = {
    /* TypeScript rules */
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": ["error", {
      "checksVoidReturn": false
    }],
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "@typescript-eslint/no-explicit-any": "error",

    /* React rules */
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error",

    /* General rules */
    "no-console": "off",
    "prefer-const": "error",
    "no-var": "error",

    /* Merge additional rules */
    ...additionalRules,
  };

  return [
    /* Base config for all files */
    {
      ignores: baseIgnores,
    },

    /* Global plugins and settings */
    {
      plugins: basePlugins,
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      settings: {
        react: {
          version: "detect",
        },
        "import/resolver": {
          typescript: true,
          node: true,
        },
      },
    },

    /* TypeScript files only */
    {
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          project: [
            `${packageDir}/tsconfig.json`, 
            `${packageDir}/.storybook/tsconfig.json`,
            `${packageDir}/src/utilities/config/tsconfig-nextjs.json`,
            `${packageDir}/src/utilities/config/tsconfig-base.json`
          ],
          tsconfigRootDir: packageDir,
          ecmaVersion: 2022,
          sourceType: "module",
        },
      },
      rules: baseRules,
    },

    /* JavaScript files (including CommonJS) */
    {
      files: ["**/*.{js,jsx,cjs}"],
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: "script",
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
        "prefer-const": "error",
        "no-var": "error",
      },
    },
  ];
};

/**
 * Storybook-specific ESLint rules
 */
export const storybookRules = {
  /* Storybook files */
  ".storybook/**/*": {
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  /* Story files - apply Storybook-specific rules */
  "**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)": {
    rules: {
      /* Enable specific Storybook rules to catch anti-patterns */
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
};

/**
 * Test-specific ESLint rules
 */
export const testRules = {
  "**/*.test.{ts,tsx}": {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
  "**/*.spec.{ts,tsx}": {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
};

/**
 * Next.js-specific ESLint rules
 */
export const nextjsRules = {
  "**/*.{ts,tsx}": {
    rules: {
      /* Next.js rules */
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-title-in-document-head": "error",
    },
  },
};
