<template>
  <div class="bg-white dark:bg-black px-5 lg:px-10 xl:px-20 min-h-screen dark:text-white transition-all duration-1000 ease-linear">
    <DashboardNav />
    <div class="h-16">
    </div>
    <div class="dashboard-wrapper mx-auto py-9 flex items-start">
      <div class="w-2/3">
        <router-view :key="$route.path" />
      </div>
      <div class="w-1/3 sticky top-24 pl-18">
        <Lists />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import DashboardNav from '@/components/dashboard/DashboardNav'
import Lists from '@/components/dashboard/Lists'
export default {
  name: 'Dashboard',
  components: {
    DashboardNav,
    Lists
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    if (store.state.dark) {
      document.body.classList.add('dark')
    }
    
    console.log(router.currentRoute.value)
    const symbol = router.currentRoute.params ? ref(router.currentRoute.params.symbol) : 'random'

    return { symbol, router }
  }

  
}
</script>

<style>
.dashboard-wrapper {
  width: 1024px;
}
body.dark {
  @apply bg-black duration-1000 ease-linear transition-colors;
}
#app, button, a, h2 {
 @apply dark:text-white;
}
.shimmer {
        animation : shimmer 4s infinite linear;
        background-image: linear-gradient(to right, #f2f2f2 0%, #E8E8E8 50%, #f2f2f2 100%);
        background-size: 250px 100%;
        @apply rounded-md;
    }

    .dark .shimmer {
      background-image: linear-gradient(to right, rgb(121,133,139) 0%, rgb(48,54,58) 50%, rgb(121,133,139) 100%);

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