import { FlatCompat } from "@eslint/eslintrc";
import next from '@next/eslint-plugin-next';
import { dirname } from "path";
import { fileURLToPath } from "url";

import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      next,
      prettier: eslintPluginPrettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'next/no-html-link-for-pages': 'error',

      'prettier/prettier': [
        'error',
        {
          endOfLine: false,
        },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    ignores: ['node_modules', '.next'],
  },
  eslintConfigPrettier,
];

export default eslintConfig;
