import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js, prettier: eslintPluginPrettier },
    extends: ['js/recommended', 'airbnb-base', eslintConfigPrettier],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': 'error',
    },
    env: {
      node: true,
      es2021: true,
    },
  },
]);
