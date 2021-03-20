<template>
  <div class="bg-white dark:bg-black px-5 lg:px-10 xl:px-20 min-h-screen dark:text-white transition-all duration-1000">
    <DashboardNav />
    <div class="h-16">
    </div>
    <div class="max-w-screen-lg px-5 lg:px-10 xl:px-6 mx-auto">
      <router-view />
    </div>
  </div>
</template>

<script>
import DashboardNav from '@/components/dashboard/DashboardNav'

import { ref } from 'vue'
export default {
  name: 'Dashboard',
  components: {
    DashboardNav
  },
  setup() {
    

    
  }
}
</script>

<style>

</style>