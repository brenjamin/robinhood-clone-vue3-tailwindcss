import { ref } from 'vue'

const getStock = async symbol => {
  const data = ref(null)
  const error = ref(null)

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.VUE_APP_FINNHUB_API_KEY}`
    )
    if (!res.ok) {
      throw new Error('Something went wrong')
    }

    const json = await res.json()
    // Finnhub fields: c=current, h=high, l=low, o=open, pc=previous close
    data.value = {
      current: json.c
    }
  } catch (err) {
    error.value = err.message
  }

  return { data, error }
}

export default getStock
