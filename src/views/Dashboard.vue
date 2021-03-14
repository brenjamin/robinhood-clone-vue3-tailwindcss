<template>
  <div class="bg-bg-gray dark:bg-black px-5 lg:px-10 xl:px-20 min-h-screen dark:text-white transition-all duration-200">
    <DashboardNav />
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