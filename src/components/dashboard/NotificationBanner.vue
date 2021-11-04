<template>
  <div class="fixed bottom-6 max-w-screen-md w-full transform left-1/2 -translate-x-1/2 shadow-input border-2 border-transparent dark:bg-dark-gray bg-white dark:border-neutral-bg-2 dark:shadow-none rounded p-3 flex items-center justify-between">
    <div class="flex items-center">
        <div class="text-green">
            <svg class="fill-current" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM10.5001 16.9142L18.2072 9.20706L16.793 7.79285L10.5001 14.0857L7.70718 11.2928L6.29297 12.7071L10.5001 16.9142Z" fill-rule="evenodd"></path></svg>
        </div>
        <div class="text-base-xs ml-4" v-if="notificationType === 'delete'">
            Successfully deleted <span class="font-bold" v-if="activeList">{{ activeList.title }}</span>
        </div>
        <div class="text-base-xs ml-4" v-if="notificationType === 'update'">
            <span v-if="added.length === 1">Added <span class="font-bold">{{ activeStock }}</span> to <span class="font-bold">{{ added[0].list.title }}</span>{{ deleted.length ? '.' : ''}}</span>
            <span v-if="added.length > 1">Added <span class="font-bold">{{ activeStock }}</span> to {{ added.length }} lists{{ deleted.length ? '.' : ''}}</span>
            <span v-if="deleted.length === 1">{{ added.length ? ' ' : ''}}Removed <span class="font-bold">{{ activeStock }}</span> from <span class="font-bold">{{ deleted[0].list.title }}</span>{{ added.length ? '.' : ''}}</span>
            <span v-if="deleted.length > 1">{{ added.length ? ' ' : ''}}Removed <span class="font-bold">{{ activeStock }}</span> from {{ deleted.length }} lists{{ added.length ? '.' : ''}}</span>
        </div>
    </div>
    <button class="block ml-4" @click="handleClose">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-5 h-5 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed, watch, onMounted } from 'vue'
export default {
    name: 'NotificationBanner',
    setup() {
        const store = useStore()
        
        const showNotification = computed(() => {
            return store.state.showNotification
        })

        const activeList = computed (() => {
            return store.state.activeList
        })

        const notificationType = computed(() => {
            return store.state.notificationType
        })

        const recentlyUpdatedLists = computed(() => {
            return store.state.recentlyUpdatedLists
        })

        const added = computed(() => {
            if (store.state.recentlyUpdatedLists !== null) {
                const listsAddedTo = store.state.recentlyUpdatedLists.filter(list => {
                    return list.changeType === 'add'
                })
                
                return listsAddedTo
            }
        })

        const deleted = computed(() => {
            if (store.state.recentlyUpdatedLists !== null) {
                const listsDeletedFrom = store.state.recentlyUpdatedLists.filter(list => {
                    return list.changeType === 'delete'
                })
                
                return listsDeletedFrom
            }
        })

        const activeStock = computed(() => {
            return store.state.activeStock
        })

        watch(recentlyUpdatedLists, () => {
            if (recentlyUpdatedLists !== null) {
                added.value = recentlyUpdatedLists.filter(list => {
                    return list.changeType === 'add'
                })
                deleted.value = recentlyUpdatedLists.filter(list => {
                    return list.changeType === 'delete'
                })
                console.log(added.value)
                console.log(deleted.value)
            }
        })

        const timeout = () => {
            setTimeout(() => {
            store.commit('hideNotification')
        }, 10000)
        }

        const handleClose = () => {
            clearTimeout(timeout)
            store.commit('hideNotification')
        }

        onMounted(() => {
            timeout()
        })
        

        return { activeList, showNotification, handleClose, notificationType, recentlyUpdatedLists, added, deleted, activeStock }
    }
}
</script>

<style>

</style>