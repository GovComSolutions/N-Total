import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Integration test setup - extends unit test setup
import './setup'

// Mock fetch for API calls
global.fetch = vi.fn()

// Mock router for integration tests
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
    useParams: () => ({}),
  }
})

// Mock React Query for integration tests
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: vi.fn(),
  }
})

// Setup test database or mock services
beforeAll(async () => {
  // Initialize test database or mock services
  console.log('Setting up integration test environment...')
})

afterAll(async () => {
  // Cleanup test database or mock services
  console.log('Cleaning up integration test environment...')
})

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})
