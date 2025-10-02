const functions = require('firebase-functions')
const https = require('https')
// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin')
admin.initializeApp()

// Helper to fetch JSON from URL
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = ''
        resp.on('data', chunk => (data += chunk))
        resp.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject(`JSON parse error: ${e.message}`)
          }
        })
      })
      .on('error', e => reject(`Request error: ${e.message}`))
  })
}

exports.searchStock = functions.https.onCall(async (searchTerm, context) => {
  const apiKey = process.env.FINNHUB_KEY
  if (!apiKey)
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Missing FINNHUB_KEY'
    )

  const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(
    searchTerm
  )}&exchange=US&token=${apiKey}`
  try {
    const result = await fetchJson(url)
    return result
  } catch (e) {
    throw new functions.https.HttpsError(
      'internal',
      `Finnhub search error: ${e}`
    )
  }
})

exports.getStock = functions.https.onCall(async (data, context) => {
  const { provider = 'finnhub', endpoint } = data || {}

  if (!endpoint || typeof endpoint !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Endpoint string required'
    )
  }

  let url

  if (provider === 'finnhub') {
    const apiKey = process.env.FINNHUB_KEY
    if (!apiKey)
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Missing FINNHUB_KEY'
      )

    // Example: endpoint = "quote?symbol=AAPL"
    url = `https://finnhub.io/api/v1/${endpoint}${
      endpoint.includes('?') ? '&' : '?'
    }token=${apiKey}`
  } else if (provider === 'alphavantage') {
    const apiKey = process.env.ALPHA_VANTAGE_KEY
    if (!apiKey)
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Missing ALPHAVANTAGE_KEY'
      )

    // Example: endpoint = "TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min"
    url = `https://www.alphavantage.co/query?function=${endpoint}&apikey=${apiKey}`
  } else if (provider === 'polygon') {
    const apiKey = process.env.POLYGON_KEY
    if (!apiKey)
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Missing POLYGON_KEY'
      )

    // Example: endpoint = "v1/open-close/AAPL/2023-10-13"
    url = `https://api.polygon.io/${endpoint}${
      endpoint.includes('?') ? '&' : '?'
    }apiKey=${apiKey}`
    console.log('Polygon URL:', url)
  } else {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Unsupported provider'
    )
  }

  return await fetchJson(url)
})
