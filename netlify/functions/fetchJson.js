const https = require('https')

module.exports = function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, resp => {
        let data = ''
        resp.on('data', chunk => (data += chunk))
        resp.on('end', () => {
          try {
            resolve(JSON.parse(data))
          } catch (e) {
            reject(new Error(`JSON parse error: ${e.message}`))
          }
        })
      })
      .on('error', e => reject(new Error(`Request error: ${e.message}`)))
  })
}
