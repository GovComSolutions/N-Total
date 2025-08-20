import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/e2e/smoke',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.PRODUCTION_URL || 'https://ntotal-cybersecurity.com',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  globalSetup: require.resolve('./src/e2e/smoke/global-setup.ts'),
  globalTeardown: require.resolve('./src/e2e/smoke/global-teardown.ts'),
})
