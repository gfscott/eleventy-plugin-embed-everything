import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
		//  Hide console error messages from passing tests
		silent: 'passed-only',
    coverage: {
      provider: 'istanbul'
    },
  },
})
