const functions = require("firebase-functions")
const https = require("https")
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin")
const info = functions.config()
admin.initializeApp()

exports.searchStock = functions.https.onCall(async (searchTerm, context) => {
  return new Promise((resolve, reject) => {
    https
      .get(`https://cloud.iexapis.com/stable/search/${searchTerm}?token=${info.iex.key}`, resp => {
        let data = ""
        // A chunk of data has been received.
        resp.on("data", chunk => {
          data += chunk
        })
        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          try {
            resolve(data)
          } catch (e) {
            reject(e.message)
          }
        })
      })
      .on("error", e => {
        reject(`Got error: ${e.message}`)
      })
  })
})

exports.getStock = functions.https.onCall(async (endpoint, context) => {
  return new Promise((resolve, reject) => {
    https
      .get(`https://cloud.iexapis.com/stable/${endpoint}?token=${info.iex.key}`, resp => {
        let data = ""
        // A chunk of data has been received.
        resp.on("data", chunk => {
          data += chunk
        })
        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          try {
            resolve(data)
          } catch (e) {
            reject(e.message)
          }
        })
      })
      .on("error", e => {
        reject(`Got error: ${e.message}`)
      })
  })
})
