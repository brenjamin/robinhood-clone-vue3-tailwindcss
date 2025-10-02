// src/utils/api.js
export async function getStock({ provider = 'finnhub', endpoint }) {
  if (!endpoint) throw new Error('Endpoint is required')

  const url = `/.netlify/functions/getStock?provider=${encodeURIComponent(
    provider
  )}&endpoint=${encodeURIComponent(endpoint)}`

  const res = await fetch(url)
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.error || 'getStock failed')
  }
  return await res.json()
}

export async function searchStock(q) {
  if (!q) throw new Error('Search term is required')

  const url = `/.netlify/functions/searchStock?q=${encodeURIComponent(q)}`

  const res = await fetch(url)
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.error || 'searchStock failed')
  }
  return await res.json()
}
