<template>
  <router-link :to="{ name: 'SingleStock', params: { symbol: stock } }" class="flex text-base-xs font-bold items-center justify-between px-4 py-3 group hover:bg-light-gray dark:hover:bg-neutral-bg-3">
    <p>{{ stock }}</p>
    <div class="relative w-15 h-4">
      <svg :width="chartWidth" :height="chartHeight" v-if="intradayPrices.length && linePath">
        <g>
          <g v-if="previousCloseY !== null">
            <line x1="0" :x2="chartWidth + 1" :y1="previousCloseY" :y2="previousCloseY" :stroke-dasharray="`1, 5`" />
          </g>
          <g>
            <path :d="linePath" fill="none" stroke-width="1" :stroke="differenceSign > -1 ? 'rgb(0, 200, 5)' : 'rgb(255, 80, 0)'" />
          </g>
        </g>
      </svg>
      <div v-if="!intradayPrices.length" class="h-4"></div>
      <p class="text-base-xs font-normal h-4" v-if="dataUnavailable">No data</p>
    </div>
    <div class="flex flex-col items-end font-normal" v-if="latestPrice && previousClose">
      <p v-if="latestPrice" class="text-base-xs leading-tight">${{ latestPrice.toFixed(2) }}</p>
      <p class="mt-1 text-base-xs leading-tight" :class="differenceSign > -1 ? 'text-light-green' : 'text-red'" v-html="priceChange"></p>
    </div>
    <div v-else class="h-9.125"></div>
  </router-link>
</template>

<script>
import { ref, computed } from "vue"
import { projectFunctions } from "@/firebase/config"
import { line, scaleTime, scaleLinear, extent } from "d3"

export default {
  name: "SingleStockSidebar",
  props: ["stock"],
  setup(props) {
    const getStock = projectFunctions.httpsCallable("getStock")

    const latestPrice = ref(null)
    const previousClose = ref(null)
    const intradayPrices = ref([])
    const differenceSign = ref(null)
    const loaded = ref(false)
    const chartWidth = 60
    const chartHeight = 16
    const xValue = d => d.fullDate
    const yValue = d => d.average
    const xScale = ref(null)
    const yScale = ref(null)
    const todaysDate = ref(null)
    const linePath = ref(null)
    const dataUnavailable = ref(false)
    const previousCloseY = ref(null)

    const initializeChart = rawData => {
      todaysDate.value = intradayPrices.value[0].date

      xScale.value = scaleTime()
        .domain([new Date(`${todaysDate.value}T09:30:00`), new Date(`${todaysDate.value}T16:00:00`)])
        .range([0, chartWidth])

      yScale.value = scaleLinear()
        .domain(extent(intradayPrices.value, yValue))
        .range([chartHeight, 0])

      previousCloseY.value = yScale.value(previousClose.value)

      if (previousCloseY.value > chartHeight) {
        previousCloseY.value = chartHeight
      } else if (previousCloseY.value < 0) {
        previousCloseY.value = 0
      }

      linePath.value = line()
        .x(d => xScale.value(xValue(d)))
        .y(d => yScale.value(yValue(d)))(intradayPrices.value)

      console.log(intradayPrices.length)
      console.log(linePath)
    }

    const priceChange = computed(() => {
      if (latestPrice.value && previousClose.value) {
        let diff = parseFloat(latestPrice.value) - parseFloat(previousClose.value)
        let sign = Math.sign(diff) > -1 ? "+" : "-"
        let percent = parseFloat(Math.abs((diff / previousClose.value) * 100)).toFixed(2)
        return sign + percent + "%"
      } else {
        return "&nbsp;"
      }
    })

    const getQuote = async () => {
      let result = await getStock(`stock/${props.stock}/quote`)
      let data = JSON.parse(result.data)
      latestPrice.value = data.latestPrice
      previousClose.value = data.previousClose
      differenceSign.value = Math.sign(parseFloat(latestPrice.value) - parseFloat(previousClose.value))
    }

    const getIntradayPrices = async () => {
      console.log("get prices")
      let result = await getStock(`stock/${props.stock}/intraday-prices`)
      console.log("Result", result.data)
      try {
        intradayPrices.value = JSON.parse(result.data)
        if (intradayPrices.value[0].average !== null) {
          intradayPrices.value = intradayPrices.value.map((item, index) => {
            item.fullDate = new Date(`${item.date}T${item.minute}:00`)
            if (item.average) return item

            let count = 1
            let replacement = intradayPrices.value[index - count]

            while (!replacement.average) {
              count--
              replacement = intradayPrices.value[index - count]
            }

            item.average = replacement.average

            return item
          })
          intradayPrices.value = intradayPrices.value.filter((item, index) => {
            return index % 5 === 0
          })
          console.log("Prices", intradayPrices.value)
          initializeChart()
        } else {
          intradayPrices.value = []
          dataUnavailable.value = true
        }
      } catch (err) {
        intradayPrices.value = []
        dataUnavailable.value = true
      }
    }

    const start = async () => {
      await getQuote()
      getIntradayPrices()
    }

    start()

    return { latestPrice, intradayPrices, chartWidth, chartHeight, previousClose, priceChange, differenceSign, loaded, linePath, dataUnavailable, previousCloseY }
  }
}
</script>

<style scoped>
svg {
  overflow: visible;
}
line {
  stroke: rgb(106, 114, 120);
}
body.dark line {
  stroke: rgb(145, 159, 166);
}
</style>
