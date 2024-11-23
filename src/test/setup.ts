import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// Extend vitest's expect with testing-library matchers
expect.extend(matchers)

// Run cleanup after each test
afterEach(() => {
  cleanup()
})