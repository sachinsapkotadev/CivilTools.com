// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroParser from 'astro-eslint-parser';
import astroPlugin from 'eslint-plugin-astro';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.wrangler/**',
      '.wrangler-local/**',
      'node_modules/**',
      'public/**',
      'src/apps/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    files: ['*.astro', 'src/**/*.astro'],
    parser: astroParser,
    parserOptions: {
      parser: '@typescript-eslint/parser',
      extraFileExtensions: ['.astro'],
    },
    rules: {
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.mjs'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
