const fetchJson = require('./fetchJson')

exports.handler = async event => {
  const apiKey = process.env.FINNHUB_KEY
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing FINNHUB_KEY' })
    }
  }

  const searchTerm = event.queryStringParameters.q
  if (!searchTerm) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'q (search term) is required' })
    }
  }

  const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(
    searchTerm
  )}&exchange=US&token=${apiKey}`

  try {
    const result = await fetchJson(url)
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e }) }
  }
}
