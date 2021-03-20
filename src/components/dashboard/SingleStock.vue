<template>
  <div v-if="stock">
    <div>{{ stock.symbol }}</div>
    <div>{{ stock.latestPrice }}</div>
    <p v-for="(item, index) in stock.prices" :key="index">
      {{ item }}
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { projectFunctions } from "@/firebase/config"
export default {
  name: "SingleStock",
  props: ["symbol"],
  setup(props) {
    const getStock = projectFunctions.httpsCallable("getStock")
    const stock = ref(null)

    getStock(`stock/${props.symbol}/intraday-prices`).then((result) => {
      let data = JSON.parse(result.data)
      stock.value = { symbol: props.symbol, prices: data }
      console.log(stock.value)

      getStock(`stock/${props.symbol}/quote/latestPrice`).then((result) => {
        let data = JSON.parse(result.data)
        stock.value = { ...stock.value, latestPrice: JSON.parse(result.data) }
        console.log(stock.value)
      })
    })

    return { stock }
  },
}
</script>

<style></style>
