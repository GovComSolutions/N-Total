import { vi } from 'vitest'

// RAG pipeline test setup
console.log('Setting up RAG pipeline test environment...')

// Mock external dependencies for RAG testing
vi.mock('openai', () => ({
  default: {
    OpenAI: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [
              {
                message: {
                  content: 'Mocked AI response for testing'
                }
              }
            ]
          })
        }
      }
    }))
  }
}))

// Mock vector database if using one
vi.mock('@pinecone-database/pinecone', () => ({
  Pinecone: vi.fn().mockImplementation(() => ({
    index: vi.fn().mockReturnValue({
      query: vi.fn().mockResolvedValue({
        matches: [
          {
            id: 'test-id',
            score: 0.95,
            metadata: {
              content: 'Test content for RAG pipeline'
            }
          }
        ]
      }),
      upsert: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({})
    })
  }))
}))

// Mock file system operations
vi.mock('fs/promises', () => ({
  readFile: vi.fn().mockResolvedValue('Mock file content'),
  writeFile: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
  access: vi.fn().mockResolvedValue(undefined)
}))

// Setup test knowledge base
beforeAll(async () => {
  // Initialize test knowledge store
  process.env.NODE_ENV = 'test'
  process.env.RAG_TEST_MODE = 'true'
})

afterAll(async () => {
  // Cleanup test knowledge store
  process.env.RAG_TEST_MODE = 'false'
})

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})
