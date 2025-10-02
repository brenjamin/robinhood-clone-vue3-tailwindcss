<template>
  <p>Random Stock</p>
  <div v-if="randomStock">
    <SingleStock :symbol="randomStock.symbol" />
  </div>
</template>

<script>
import SingleStock from '@/components/dashboard/SingleStock'
import { ref } from 'vue'
import { projectFunctions } from '@/firebase/config'

export default {
  name: 'RandomStock',
  components: {
    SingleStock
  },
  setup() {
    const randomStock = ref(null)
    const getStock = projectFunctions.httpsCallable('getStock')

    const getRandomStock = () => {
      getStock('ref-data/iex/symbols').then(result => {
        let arr = JSON.parse(result.data)
        randomStock.value = arr[Math.floor(Math.random() * arr.length)]
      })
    }

    getRandomStock()

    return { randomStock }
  }
}
</script>

<style></style>
