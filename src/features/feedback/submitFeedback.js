/**
 * Stub: submit feedback. Replace with real API call when backend is ready.
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitFeedback(data) {
  await new Promise((r) => setTimeout(r, 600))
  console.log('Feedback submitted:', data)
  return { success: true }
}
