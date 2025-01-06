export default async function globalSetup(config) {
  console.log('Starting setup before tests')
  const extraBaseURL = process.env.CI ? 'http://localhost:3000' : 'http://127.0.0.1:5500'
  process.env.EXTRA_BASE_URL = extraBaseURL
  console.log(`Global setup: EXTRA_BASE_URL set to ${extraBaseURL}`)
  // connect databese, etc
}