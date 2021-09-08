<template>
    <div>{{ symbol }}</div>
    <div>{{ latestPrice }}</div>
    <p v-for="(item, index) in intradayPrices" :key="index" class="px-1 inline-block">
      {{ item.minute }}
    </p>
    <div id="chart">

    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { projectFunctions } from "@/firebase/config"
import * as d3 from 'd3'
import responsivefy from '@/composables/d3Responsivefy'
export default {
  name: "SingleStock",
  props: ["symbol"],
  setup(props) {
    const getStock = projectFunctions.httpsCallable("getStock")
    const latestPrice = ref(null)
    const intradayPrices = ref([])

    getStock(`stock/${props.symbol}/intraday-prices`).then((result) => {
      let data = JSON.parse(result.data)
      intradayPrices.value = data
      intradayPrices.value = intradayPrices.value.filter((item, index, arr) => {
        return index % 5 === 0
      })
    })

    getStock(`stock/${props.symbol}/quote/latestPrice`).then((result) => {
        let data = JSON.parse(result.data)
        latestPrice.value = data
    })

    const initializeChart = data => {
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = window.innerWidth - margin.left - margin.right;
      const height = window.innerHeight - margin.top - margin.bottom; 
      // add SVG to the page
      const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', width + margin['left'] + margin['right'])
        .attr('height', height + margin['top'] + margin['bottom'])
        .call(responsivefy)
        .append('g')
        .attr('transform', `translate(${margin['left']},  ${margin['top']})`)
    }

    onMounted( () => {
      initializeChart(intradayPrices.value)
    })
    

    return { latestPrice, intradayPrices }
  },
}
</script>

<style></style>
