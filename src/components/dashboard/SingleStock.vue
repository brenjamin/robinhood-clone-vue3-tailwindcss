<template>
  <div class="dark:text-white duration-1000 transition-colors ease-linear">
    <h1 v-if="companyInfo" class="text-2.5xl ">{{ companyInfo.companyName }}</h1>
    <h1 v-else class="text-2.5xl shimmer w-80">&nbsp;</h1>
    <p v-if="latestPrice" class="text-2.5xl font-medium mt-1.5">${{ latestPrice.toFixed(2) }}</p>
    <p v-else class="text-2.5xl shimmer w-40 font-medium mt-1">&nbsp;</p>
    <p class="mt-1 text-base-xs font-semibold" v-html="priceChange" :class="latestPrice && previousClose ? '' : 'shimmer w-16'"></p>
  </div>
  <div class="relative mt-3 h-49">
    <svg :width="chartWidth" :height="chartHeight" v-if="intradayPrices.length && linePath">
      <g>
        <path :d="linePath" fill="none" stroke-width="2" :stroke="differenceSign > -1 ? 'rgb(0, 200, 5)' : 'rgb(255, 80, 0)'" />
      </g>
    </svg>
    <p v-if="dataUnavailable">Price data not available</p>
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
      <h2 class="font-medium text-2xl pb-4 border-b border-neutral-bg-3 duration-1000 ease-linear transition-colors">About</h2>
      <p class="mt-6 text-base-sm duration-1000 ease-linear transition-colors;">{{ companyInfo.description || "Description Not Found" }}</p>
      <div class="mt-4 flex justify-between">
        <div class="text-base-xs">
          <p class="font-bold">CEO</p>
          <p>{{ companyInfo.CEO || "Not Found" }}</p>
        </div>
        <div class="text-base-xs">
          <p class="font-bold">Employees</p>
          <p>{{ companyInfo.employees ? parseInt(companyInfo.employees).toLocaleString() : "Not Found" }}</p>
        </div>
        <div class="text-base-xs">
          <p class="font-bold">Location</p>
          <p>{{ companyInfo.city && companyInfo.state ? `${companyInfo.city}, ${companyInfo.state}` : "Not Found" }}</p>
        </div>
        <div class="text-base-xs">
          <p class="font-bold">Industry</p>
          <p>{{ companyInfo.industry || "Not Found" }}</p>
        </div>
      </div>
    </div>
    <div v-else class="shimmer h-64"></div>
  </section>
  <section class="mt-14 dark:text-white">
    <h2 class="font-medium text-2xl transition-colors ease-linear duration-1000 pb-4 border-b border-neutral-bg-3">News</h2>
    <div v-if="news.length">
      <article v-for="article in news" class="first:mt-0 transition-colors ease-linear duration-1000">
        <a class="p-7 flex hover:bg-light-gray dark:hover:bg-dark-bg-gray -mx-6 rounded transition-colors duration-200 ease-linear gap-x-16" :href="article.url" rel="noopener" target="_blank">
          <div class="w-2/3">
            <div class="flex text-base-xs">
              <p class="font-bold">{{ article.source }}</p>
              <p class="text-neutral-fg-2 dark:text-neutral-fg-2 pl-1.5">{{ getTimeFromNow(article.datetime) }}</p>
            </div>
            <h3 class="font-bold text-base-sm leading-tight">{{ article.headline }}</h3>
            <p class="text-neutral-fg-2 dark:text-neutral-fg-2 text-base-xs truncate">{{ article.summary }}</p>
          </div>
          <div class="flex-grow">
            <div class="aspect-w-4 aspect-h-3">
              <img class="object-cover object-center h-full w-full" loading="lazy" :src="article.image" :alt="article.headline" />
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
import { ref, computed } from "vue"
import { projectFunctions } from "@/firebase/config"
import { useStore } from "vuex"
import date from "date-and-time"
const convertTime = require("convert-time")
import { line, scaleTime, scaleLinear, extent } from "d3"

export default {
  name: "SingleStock",
  props: ["symbol"],
  setup(props) {
    const getStock = projectFunctions.httpsCallable("getStock")

    const latestPrice = ref(null)
    const previousClose = ref(null)
    const intradayPrices = ref([])
    const news = ref(["placeholder"])
    const companyInfo = ref(null)
    const differenceSign = ref(null)
    const state = useStore()
    const chartWidth = 676
    const chartHeight = 196
    const xValue = d => d.minute
    const yValue = d => d.average
    const todaysDate = ref(null)
    const linePath = ref(null)
    const dataUnavailable = ref(false)

    const initializeChart = () => {
      todaysDate.value = intradayPrices.value[0].date

      console.log("Later Prices", intradayPrices.value)

      const xScale = scaleTime()
        .domain([new Date(`${todaysDate.value}T09:30:00Z`), new Date(`${todaysDate.value}T16:00:00Z`)])
        .range([0, chartWidth])

      const yScale = scaleLinear()
        .domain(extent(intradayPrices.value, yValue))
        .range([chartHeight, 0])

      console.log(xScale.domain())
      console.log(xScale.range())

      linePath.value = line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))(intradayPrices.value)
    }

    const priceChange = computed(() => {
      if (latestPrice.value && previousClose.value) {
        let diff = parseFloat(latestPrice.value) - parseFloat(previousClose.value)
        let sign = Math.sign(diff) > -1 ? "+" : "-"
        diff = Math.abs(diff).toFixed(2)
        let percent = parseFloat(Math.abs((diff / previousClose.value) * 100)).toFixed(2)
        return sign + "$" + diff + " (" + sign + percent + "%)"
      } else {
        return "&nbsp;"
      }
    })

    const getTimeFromNow = time => {
      const now = new Date()
      time = new Date(time)
      let timeFromNow = date.subtract(now, time).toHours()
      let unit = "h"

      if (timeFromNow < 1) {
        timeFromNow = date.subtract(now, time).toMinutes()
        unit = "m"
      } else if (timeFromNow >= 24) {
        timeFromNow = date.subtract(now, time).toDays()
        unit = "d"
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
        console.log("Initial", intradayPrices.value)
        if (intradayPrices.value[0].average !== null) {
          intradayPrices.value = intradayPrices.value.map((item, index) => {
            if (item.average) return item

            let count = 1
            let replacement = intradayPrices.value[index - count]

            while (!replacement.average) {
              count--
              replacement = intradayPrices.value[index - count]
            }

            return replacement
          })
          intradayPrices.value = intradayPrices.value.filter((item, index, arr) => {
            return index % 5 === 0
          })
          intradayPrices.value = intradayPrices.value.map((item, index) => {
            if (!(index === intradayPrices.value.length - 1)) {
              item.minute = new Date(`${item.date}T${item.minute}:00Z`)
            }
            // set last item to 16:00:00
            else {
              item.minute = new Date(`${item.date}T16:00:00Z`)
            }
            return item
          })
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

    const getNews = async () => {
      let result = await getStock(`stock/${props.symbol}/news/last/3`)
      news.value = JSON.parse(result.data)
    }

    const getAllInfo = async () => {
      await Promise.all([getCompanyInfo(), getNews(), getIntradayPrices()])
    }

    const start = async () => {
      state.commit("setActiveStock", props.symbol)
      await getQuote()
      getAllInfo()
    }

    start()

    return { latestPrice, intradayPrices, companyInfo, previousClose, priceChange, differenceSign, news, getTimeFromNow, chartWidth, chartHeight, linePath, dataUnavailable }
  }
}
</script>

<style></style>
