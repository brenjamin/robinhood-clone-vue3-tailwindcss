<template>
    <router-link :to="{ name: 'SingleStock', params: {symbol: stock } }" class="flex text-base-xs font-bold items-center justify-between px-4 py-3 group hover:bg-light-gray dark:hover:bg-neutral-bg-3">
        <p>{{ stock }}</p>
        <div class="relative w-16">
            <canvas v-show="loaded && intradayPrices.length" ref="chart"></canvas>
            <div v-if="!loaded" class="h-9"></div>
            <p class="text-base-xs font-normal" v-if="loaded && !intradayPrices.length">No data</p>

        </div>
        <div class="flex flex-col items-end font-normal" v-if="latestPrice && previousClose">
            <p v-if="latestPrice" class="text-base-xs leading-tight">${{ latestPrice.toFixed(2) }}</p>
            <p class="mt-1 text-base-xs leading-tight" :class="differenceSign > -1 ? 'text-light-green' : 'text-red'" v-html="priceChange"></p>
        </div>
    </router-link>
</template>

<script>
import { ref, computed } from "vue";
import { projectFunctions } from "@/firebase/config"
import { Chart, LineElement, LineController, CategoryScale, LinearScale, PointElement } from 'chart.js'
Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement)
export default {
    name: 'SingleStockSidebar',
    props: ['stock'],
    setup(props) {
    const getStock = projectFunctions.httpsCallable("getStock")

    const latestPrice = ref(null)
    const previousClose = ref(null)
    const intradayPrices = ref(['placeholder'])
    const chart = ref(null)
    const differenceSign = ref(null)
    const loaded = ref(false)

    const initializeChart = rawData => {
      const prices = rawData.map(time => time.average)
      const times = ['09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55']

      // red or green line
      const borderColor = differenceSign.value > -1 ? 'rgb(0, 200, 5)' : 'rgb(255, 80, 0)'

      const data = {
        labels: times,
        datasets:[{
          data: prices,
          borderColor
        }]
      }

      const config = {
        type: 'line',
        data,
        options: {
          scales: {
              x: {
                display: false,
                grid: {
                  display: false
                },
                ticks: {
                  display: false
                }
              },
              y: {
                display: false,
                grid: {
                  display: false
                },
                ticks: {
                  display: false
                }
              }
          },
          elements: {
            point: {
              radius: 0
            },
            line: {
              borderWidth: 1
            }
          },
          animation: {
            duration: 0
          }
        }
      }
      const intraDayChart = new Chart(chart.value, config);
    }

    const priceChange = computed(() => {
      if (latestPrice.value && previousClose.value) {
        let diff = parseFloat(latestPrice.value) - parseFloat(previousClose.value)
        let sign = Math.sign(diff) > -1 ? '+' : '-'
        let percent = parseFloat(Math.abs((diff / previousClose.value * 100))).toFixed(2)
        return sign + percent + '%'
      } else {
        return '&nbsp;'
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
        let result = await getStock(`stock/${props.stock}/intraday-prices`)
        try {
          
          intradayPrices.value = JSON.parse(result.data)

          if (intradayPrices.value[0].average !== null) {
            intradayPrices.value = intradayPrices.value.map((item, index) => {
              if (item.average) return item

              let count = 1
              let replacement = intradayPrices.value[index - count]

              while (!replacement.average) {
                count--;
                replacement = intradayPrices.value[index - count]
              }

              return replacement
            })
            intradayPrices.value = intradayPrices.value.filter((item, index, arr) => {
              return index % 5 === 0
            })
            initializeChart(intradayPrices.value)
            loaded.value = true

          } else {
            intradayPrices.value = []
            loaded.value = true
          }
        } catch(err) {
          intradayPrices.value = []
          loaded.value = true
        }
        
        
      }
    
      const start = async() => {
        await getQuote();
        getIntradayPrices();
      }
      
      start();

    return { latestPrice, intradayPrices, chart, previousClose, priceChange, differenceSign, loaded }
    }
}
</script>

<style>

</style>