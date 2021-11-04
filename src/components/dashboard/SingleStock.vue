<template>
    <div class="dark:text-white duration-1000 transition-colors eas e-linear">
      <h1 v-if="companyInfo" class="text-2.5xl">{{ companyInfo.companyName }}</h1>
      <h1 v-else class="text-2.5xl shimmer w-80">&nbsp;</h1>
      <p v-if="latestPrice" class="text-2.5xl font-medium mt-1.5">${{ latestPrice.toFixed(2) }}</p>
      <p v-else class="text-2.5xl shimmer w-40 font-medium mt-1">&nbsp;</p>
      <p class="mt-1 text-base-xs font-semibold" v-html="priceChange" :class="latestPrice && previousClose ? '' : 'shimmer w-16' "></p>
    </div>
    
    <!-- <p v-for="(item, index) in intradayPrices" :key="index" class="px-1 inline-block">
      {{ item.average || 'none' }}
    </p> -->
    <div class="relative" :class="intradayPrices.length > 1 ? 'mt-3' : 'mt-3 h-80'">
      <canvas id="chart" ref="chart" v-show="intradayPrices.length"></canvas>
      <p v-if="!intradayPrices.length">Price data not available</p>
    </div>
    <div class="mt-10 flex items-center border-b border-neutral-bg-3 box-content">
      <button class="text-base-xs font-bold pb-3 border-b-2 flex justify-center mr-3 translate-y-0.5 transform" :class="differenceSign > -1 ? ' border-light-green' : 'border-red'" disabled><span class="inline-block" :class="differenceSign > -1 ? 'text-light-green' : 'text-red'">1D</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent translate-y-0.5 transform" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">1W</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent translate-y-0.5 transform" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">1M</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent translate-y-0.5 transform" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">1Y</span></button>
      <button class="text-base-xs font-bold pb-3 flex justify-center mx-3 border-b-2 border-transparent translate-y-0.5 transform" disabled><span class="inline-block dark:text-white" :class="differenceSign > -1 ? 'hover:text-light-green' : 'hover:text-red'">5Y</span></button>
    </div>
    <section class="mt-12 dark:text-white">
      <div v-if="companyInfo">
          <h2 class="font-medium text-2xl transition-colors ease-linear duration-500 pb-4 border-b border-neutral-bg-3">About</h2>
          <p class="mt-6 text-base-sm">{{ companyInfo.description || 'Description Not Found' }}</p>
          <div class="mt-4 flex justify-between">
            <div class="text-base-xs">
              <p class="font-bold">CEO</p>
              <p>{{ companyInfo.CEO || 'Not Found' }}</p>
            </div>
            <div class="text-base-xs">
              <p class="font-bold">Employees</p>
              <p>{{ companyInfo.employees ? parseInt(companyInfo.employees).toLocaleString() : 'Not Found' }}</p>
            </div>
            <div class="text-base-xs">
              <p class="font-bold">Location</p>
              <p>{{ companyInfo.city && companyInfo.state ? `${companyInfo.city}, ${companyInfo.state}` : 'Not Found' }}</p>
            </div>
            <div class="text-base-xs">
              <p class="font-bold">Industry</p>
              <p>{{ companyInfo.industry || 'Not Found' }}</p>
            </div>
          </div>
      </div>
      <div v-else class="shimmer h-64">
      </div>
    </section>
    <section class="mt-14 dark:text-white">
      <h2 class="font-medium text-2xl transition-colors ease-linear duration-500 pb-4 border-b border-neutral-bg-3">News</h2>
      <div v-if="news.length">
          <article v-for="article in news" class="first:mt-0">
            <a class="p-7 flex hover:bg-light-gray dark:hover:bg-dark-bg-gray -mx-6 rounded transition-colors duration-200 ease-linear gap-x-16" :href="article.url" rel="noopener" target="_blank">
              <div class="w-2/3">
                <div class="flex text-base-xs">
                  <p class="font-bold">{{ article.source}}</p>
                  <p class="text-neutral-fg-2 dark:text-neutral-fg-2 pl-1.5">{{ getTimeFromNow(article.datetime) }}</p>
                </div>
                <h3 class="font-bold text-base-sm leading-tight">{{ article.headline }}</h3>
                <p class="text-neutral-fg-2 dark:text-neutral-fg-2 text-base-xs truncate">{{ article.summary }}</p>
              </div>
              <div class="flex-grow">
                <div class="aspect-w-4 aspect-h-3">
                  <img class="object-cover object-center h-full w-full" loading="lazy" :src="article.image" :alt="article.headline">
                </div>
              </div>
            </a>
          </article>
      </div>
      <div v-else class="mt-7">
        Not found
      </div>
    </section>

</template>

<script>
import { ref, computed } from "vue";
import { projectFunctions } from "@/firebase/config"
import { useStore } from 'vuex'
import date from 'date-and-time'
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
    const news = ref(['placeholder'])
    const companyInfo = ref(null)
    const differenceSign = ref(null)
    const state = useStore()

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

    const getTimeFromNow = (time) => {
      const now = new Date();
      time = new Date(time);
      let timeFromNow = date.subtract(now, time).toHours()
      let unit = 'h'

      if (timeFromNow < 1) {
        timeFromNow = date.subtract(now, time).toMinutes()
        unit = 'm'
      } else if (timeFromNow >= 24) {
        timeFromNow = date.subtract(now, time).toDays()
        unit = 'd'
      }
      return Math.floor(timeFromNow) + unit

    }

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
        await Promise.all([getCompanyInfo(), getNews(), getIntradayPrices()])
      }

      const start = async() => {
        state.commit('setActiveStock', props.symbol)
        await getQuote();
        getAllInfo();
      }
      
      start();
    
      

    return { latestPrice, intradayPrices, chart, companyInfo, previousClose, priceChange, differenceSign, news, getTimeFromNow }
  },
}
</script>

<style>
  
</style>
