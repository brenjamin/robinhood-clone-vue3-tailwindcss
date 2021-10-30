<template>
    <div class="dark:text-white duration-1000 transition-colors ease-linear">
      <h1 v-if="companyInfo" class="text-2.5xl">{{ companyInfo.companyName }}</h1>
      <h1 v-else class="text-2.5xl shimmer w-80">&nbsp;</h1>
      <p v-if="latestPrice" class="text-2.5xl font-medium mt-1.5">${{ latestPrice.toFixed(2) }}</p>
      <p v-else class="text-2.5xl shimmer w-40 font-medium mt-1">&nbsp;</p>
      <p class="mt-1 text-base-xs font-semibold" v-html="priceChange" :class="latestPrice && previousClose ? '' : 'shimmer w-16' "></p>
    </div>
    
    <!-- <p v-for="(item, index) in intradayPrices" :key="index" class="px-1 inline-block">
      {{ item.average || 'none' }}
    </p> -->
    <div class="mt-3">
      <canvas id="chart" ref="chart" v-show="intradayPrices.length"></canvas>
      <p v-if="!intradayPrices.length">Price data not available</p>
    </div>
    <div class="mt-6 flex items-center">
      <button class="text-base-xs font-bold pb-3 border-b-2 flex justify-center mx-3" :class="differenceSign > -1 ? ' border-light-green' : 'border-red'" disabled><span class="inline-block" :class="differenceSign > -1 ? 'text-light-green' : 'text-red'">1D</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">1W</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">1M</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">1Y</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">5Y</span></button>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { projectFunctions } from "@/firebase/config"
import { Chart, LineElement, LineController, CategoryScale, LinearScale, PointElement } from 'chart.js'
Chart.register(LineElement, LineController, CategoryScale, LinearScale, PointElement)
export default {
  name: "SingleStock",
  props: ["symbol"],
  setup(props) {
    const getStock = projectFunctions.httpsCallable("getStock")

    const latestPrice = ref(null)
    const previousClose = ref(null)
    const intradayPrices = ref(['placeholder'])
    const chart = ref(null)
    const news = ref([])
    const companyInfo = ref(null)
    const differenceSign = ref(null)

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
              borderWidth: 2
            }
          },
          animation: {
            duration: 0
          }
        }
      }
      const intraDayChart = new Chart(chart.value, config);
    }

    onMounted( () => {


      const getCompanyInfo = async () => {
        let result = await getStock(`stock/${props.symbol}/company`)
        companyInfo.value = JSON.parse(result.data)
      }

      const getQuote = async () => {
        let result = await getStock(`stock/${props.symbol}/quote`)
        let data = JSON.parse(result.data)
        latestPrice.value = data.latestPrice
        previousClose.value = data.previousClose
        differenceSign.value = Math.sign(parseFloat(latestPrice.value) - parseFloat(previousClose.value))
      }

      const getIntradayPrices = async () => {
        let result = await getStock(`stock/${props.symbol}/intraday-prices`)
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

          } else {
            intradayPrices.value = []
          }
        } catch(err) {
          intradayPrices.value = []
        }
        
        
      }

      const getNews = async () => {
        let result = await getStock(`stock/${props.symbol}/news/last/3`);
        news.value = JSON.parse(result.data);
      }

      const getAllInfo = async () => {
        await Promise.all([getCompanyInfo(), getNews(), getIntradayPrices(), getQuote()])
      }

      getAllInfo();

    })

    const priceChange = computed(() => {
      if (latestPrice.value && previousClose.value) {
        let diff = parseFloat(latestPrice.value) - parseFloat(previousClose.value)
        let sign = Math.sign(diff) > -1 ? '+' : '-'
        diff = Math.abs(diff).toFixed(2)
        let percent = parseFloat(Math.abs((diff / previousClose.value * 100))).toFixed(2)
        return sign + '$' + diff + ' (' + sign + percent + '%)'
      } else {
        return '&nbsp;'
      }
    })
    
    

    return { latestPrice, intradayPrices, chart, companyInfo, previousClose, priceChange, differenceSign }
  },
}
</script>

<style scoped>
  .shimmer {
        animation : shimmer 4s infinite linear;
        background-image: linear-gradient(to right, #f2f2f2 0%, #E8E8E8 50%, #f2f2f2 100%);
        background-size: 250px 100%;
        @apply rounded-md;
    }

    @keyframes shimmer {
        0% {
            background-position: -500px 0;
        }
        100% {
            background-position: 500px 0;
        }
    }
</style>
