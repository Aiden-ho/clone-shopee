// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom', // or 'happy-dom', 'node',
    setupFiles: ['vitest-setup.ts']
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
