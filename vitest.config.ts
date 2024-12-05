import { defineConfig } from 'vitest/config';
// import viteConfig from './vite.config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    // include : ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    coverage: {
      exclude: [
        'tests/**',
        '**/node_modules/**',
        '**/dist/**',
        '**/.idea/**',
        '**/.git/**',
        '**/.cache/**',
        '**/lib/**',
        '**/*.css',
        '**/*.json',
        '**/*.md',
        '**/*.yml',
        '**/*.config.js',
        '**/*.config.ts',
        '**/*.d.ts',
        '**/api.ts',
        '**/src/main.tsx',
      ],
    }
  },
});

