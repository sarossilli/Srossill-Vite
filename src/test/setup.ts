import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Run cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock the Amplify module
vi.mock('aws-amplify', () => ({
  Amplify: {
    configure: vi.fn(),
  },
}));

// Mock the outputs import
vi.mock('../../amplify_outputs.json', () => ({}));