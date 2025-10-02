const fetchJson = require('./fetchJson')

exports.handler = async event => {
  const provider = event.queryStringParameters.provider || 'finnhub'
  const endpoint = event.queryStringParameters.endpoint

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'endpoint required' })
    }
  }

  let url

  if (provider === 'finnhub') {
    const apiKey = process.env.FINNHUB_KEY
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing FINNHUB_KEY' })
      }
    }
    url = `https://finnhub.io/api/v1/${endpoint}${
      endpoint.includes('?') ? '&' : '?'
    }token=${apiKey}`
  } else if (provider === 'alphavantage') {
    const apiKey = process.env.ALPHA_VANTAGE_KEY
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing ALPHA_VANTAGE_KEY' })
      }
    }
    url = `https://www.alphavantage.co/query?function=${endpoint}&apikey=${apiKey}`
  } else if (provider === 'polygon') {
    const apiKey = process.env.POLYGON_KEY
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing POLYGON_KEY' })
      }
    }
    url = `https://api.polygon.io/${endpoint}${
      endpoint.includes('?') ? '&' : '?'
    }apiKey=${apiKey}`
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Unsupported provider' })
    }
  }

  try {
    const data = await fetchJson(url)
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e }) }
  }
}
