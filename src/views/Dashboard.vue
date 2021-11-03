<template>
  <div class="bg-white dark:bg-black px-5 lg:px-10 xl:px-20 min-h-screen dark:text-white transition-all duration-1000 ease-linear">
    <DashboardNav />
    <div class="h-16">
    </div>
    <div class="dashboard-wrapper mx-auto py-9 flex items-start relative">
      <div class="w-2/3">
        <router-view :key="$route.path" />
      </div>
      <div class="w-1/3 sticky top-28 pl-18">
        <Lists />
      </div>
    </div>
    <ListModal />
    <NotificationBanner v-if="showNotification" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import DashboardNav from '@/components/dashboard/DashboardNav'
import Lists from '@/components/dashboard/Lists'
import ListModal from '@/components/dashboard/ListModal'
import NotificationBanner from '@/components/dashboard/NotificationBanner'
export default {
  name: 'Dashboard',
  components: {
    DashboardNav,
    Lists,
    ListModal,
    NotificationBanner
  },
  setup() {
    const store = useStore()

    if (store.state.dark) {
      document.body.classList.add('dark')
    }

    const showNotification = computed(() => {
        return store.state.showNotification
    })

    return { showNotification }
  }

  
}
</script>

<style>
.dashboard-wrapper {
  width: 1024px;
  transition-property: z-index;
  transition-duration: 1s;
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