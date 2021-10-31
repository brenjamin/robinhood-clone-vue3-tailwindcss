<template>
  <div class="flex justify-between items-center px-4 pr-2 py-3 w-full group" @mouseOver="showDots = true" @mouseLeave="showDots = false">
      <div class="flex items-center truncate">
            <p class="h-10 w-8.5 flex items-center justify-center rounded bg-border-gray dark:bg-neutral-bg-3 flex-shrink-0" v-html="`&#${list.emoji};`"></p>
            <p class="text-base-xs font-medium ml-3 truncate">
                {{ list.title }}
            </p>
      </div>
      <div class="flex items-center pl-2">
          <button class="transition-none block hover:text-light-green border-b-2" :class="dotClasses" @click.prevent="showDotsMenu = !showDotsMenu">
              <svg class="fill-current" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 10.5H3.5V13.5H6.5V10.5Z" fill="var(--rh__text-color)"></path><path d="M13.5 10.5H10.5V13.5H13.5V10.5Z" fill="var(--rh__text-color)"></path><path d="M17.5 10.5H20.5V13.5H17.5V10.5Z" fill="var(--rh__text-color)"></path></svg>
          </button>
          <button class="group-hover:text-light-green rounded ml-2 p-2 hover:bg-border-gray dark:hover:bg-neutral-bg-3" @click.prevent="isOpen = !isOpen">
              <svg class="fill-current transform duration-200" :class="isOpen ? 'rotate-180' : ''" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M1.71484 6.28535L2.95228 5.04791L8.00023 10.0959L13.0482 5.04791L14.2856 6.28535L8.00023 12.5707L1.71484 6.28535Z" fill-rule="evenodd"></path></svg>
          </button>
      </div>
  </div>
  <div v-show="isOpen"> 
      <SingleStockSidebar v-for="stock in list.stocks" :stock="stock" :key="stock" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import SingleStockSidebar from '@/components/dashboard/SingleStockSidebar'
export default {
    
    name: 'ListSidebar',
    props: ['list'],
    components: {
        SingleStockSidebar
    },
    setup() {
        const isOpen = ref(false)
        const showDots = ref(false)
        const showDotsMenu = ref(false)

        const dotClasses = computed(() => { 
            return {
                'border-transparent': !showDotsMenu.value,
                'highlighted': showDotsMenu.value,
                'opacity-0': !showDots.value
            }
        })


        return { isOpen, showDots, showDotsMenu, dotClasses }
    }
}
</script>

<style scoped>
    button.highlighted {
        @apply text-light-green border-light-green;
    }
</style>