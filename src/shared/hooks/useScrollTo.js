/**
 * Returns a function that scrolls to an element by id (e.g. #products).
 * @param {Object} options - { behavior: 'smooth', block: 'start' }
 */
export function useScrollTo(options = {}) {
  const defaultOptions = { behavior: 'smooth', block: 'start', ...options }
  return (id) => {
    const el = typeof id === 'string' ? document.getElementById(id) : id
    if (el) el.scrollIntoView(defaultOptions)
  }
}
