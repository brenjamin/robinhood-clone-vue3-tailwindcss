import { ref } from 'vue'

const getStock = async (path) => {
    const data = ref(null)
    const error = ref(null)
    
    try {
        const res = await fetch('https://sandbox.iexapis.com/stable' + path + '?token=' + process.env.VUE_APP_IEX_SANDBOX_TOKEN)
        if (!res.ok) {
            throw new Error('Something went wrong')
        }
        data.value = await res.json()
    } catch(err) {
        error.value = err.message
    }
    

    return { data, error }
}

export default getStock