<template>
  <div class="flex justify-between items-center px-4 pr-2 py-3 w-full group relative" :class="showDotsMenu ? 'z-10' : ''" @mouseOver="showDots = true" @mouseLeave="showDots = false">
      <div class="flex items-center truncate">
            <p class="h-10 w-8.5 flex items-center justify-center rounded bg-border-gray dark:bg-neutral-bg-3 flex-shrink-0" v-html="`&#${list.emoji};`"></p>
            <p class="text-base-xs font-medium ml-3 truncate">
                {{ list.title }}
            </p>
      </div>
      <div class="flex items-center pl-2">
          <div class="transition-none block relative" :class="dotClasses" @click.prevent="showDotsMenu = !showDotsMenu">
              <button class="hover:text-light-green border-b-2 flex items-center h-full" :class="showDotsMenu ? 'highlighted' : 'border-transparent'">
                  <svg class="fill-current" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 10.5H3.5V13.5H6.5V10.5Z"></path><path d="M13.5 10.5H10.5V13.5H13.5V10.5Z"></path><path d="M17.5 10.5H20.5V13.5H17.5V10.5Z"></path></svg>
              </button>
              <div v-show="showDotsMenu" class="cursor-default absolute top-full right-0 transform translate-x-5 w-44 py-3 bg-white dark:bg-dark-bg-gray shadow-list-menu">
                  <button class="flex items-center w-full font-bold text-base-xs hover:text-light-green px-4 py-3 text-black">
                      <svg class="fill-current" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"></path><path clip-rule="evenodd" d="M19.6 9.6L22 10V14L19.6 14.4C19.5 14.8 19.3 15.3 19.1 15.7L20.5 17.7L17.7 20.5L15.7 19.1C15.3 19.3 14.9 19.5 14.4 19.6L14 22H10L9.6 19.6C9.2 19.5 8.7 19.3 8.3 19.1L6.3 20.5L3.5 17.7L4.9 15.7C4.7 15.3 4.5 14.9 4.4 14.4L2 14V10L4.4 9.6C4.5 9.2 4.7 8.7 4.9 8.3L3.5 6.3L6.3 3.5L8.3 4.9C8.7 4.7 9.2 4.5 9.6 4.4L10 2H14L14.4 4.4C14.8 4.5 15.3 4.7 15.7 4.9L17.7 3.5L20.5 6.3L19.1 8.3C19.3 8.7 19.5 9.1 19.6 9.6ZM12 17.5C15.0376 17.5 17.5 15.0376 17.5 12C17.5 8.96243 15.0376 6.5 12 6.5C8.96243 6.5 6.5 8.96243 6.5 12C6.5 15.0376 8.96243 17.5 12 17.5Z" fill-rule="evenodd"></path></svg>
                      <p class="ml-3">Edit List</p>
                  </button>
                  <button @click="deleteList" class="flex items-center w-full hover:text-light-green px-4 py-3 font-bold text-base-xs text-black">
                      <svg class="fill-current" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill-rule="evenodd"></path><path d="M12 13.4142L15.182 16.5962L16.5962 15.182L13.4142 12L16.5962 8.81805L15.182 7.40383L12 10.5858L8.81802 7.40378L7.40381 8.81799L10.5858 12L7.40381 15.182L8.81802 16.5962L12 13.4142Z"></path></svg>
                      <p class="ml-3">Delete List</p>
                  </button>
              </div>
          </div>
          <button class="hover:text-light-green rounded ml-2 p-2 hover:bg-border-gray dark:hover:bg-neutral-bg-3 relative" @click.prevent="isOpen = !isOpen" @click.once="loadStocks = true">
              <svg class="fill-current transform duration-200" :class="isOpen ? 'rotate-180' : ''" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M1.71484 6.28535L2.95228 5.04791L8.00023 10.0959L13.0482 5.04791L14.2856 6.28535L8.00023 12.5707L1.71484 6.28535Z" fill-rule="evenodd"></path></svg>
          </button>
      </div>
  </div>
  <div v-if="loadStocks">
      <div v-show="isOpen">
        <SingleStockSidebar v-for="stock in list.stocks" :stock="stock" :key="stock" />
      </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import SingleStockSidebar from '@/components/dashboard/SingleStockSidebar'
export default {
    
    name: 'SingleListSidebar',
    props: ['list'],
    emits: ['deleteList'],
    components: {
        SingleStockSidebar
    },
    setup(props,context) {
        const isOpen = ref(false)
        const showDots = ref(false)
        const showDotsMenu = ref(false)
        const loadStocks = ref(false)

        const dotClasses = computed(() => { 
            return {
                'opacity-0': !showDots.value,
                'z-20': showDotsMenu.value
            }
        })

        
        const deleteList = () => {
            context.emit('deleteList', props.list)
        }


        return { isOpen, showDots, showDotsMenu, dotClasses, loadStocks, deleteList }
    }
}
</script>

<style scoped>
    .highlighted {
        @apply text-light-green border-light-green;
    }
</style>