import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    mockReset: true,
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    deps: {
      inline: [/\.svg/],
    },
  },
})