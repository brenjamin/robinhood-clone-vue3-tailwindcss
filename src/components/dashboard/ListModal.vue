<template>
    <transition name="fade" @after-enter="showModalContent = true">
        <div class="fixed bg-black md:bg-opacity-75 inset-0 z-100 overflow-y-scroll px-8" v-show="listModalIsOpen">
            <transition name="slide-fade">
            <div class="bg-white dark:bg-dark-bg-gray max-w-md min-w-100 min-h-0 h-auto pt-4 pb-6 px-6 relative mt-56 mx-auto rounded" v-show="showModalContent">
                <form @submit.prevent="handleDelete" v-if="activeList && modalMode === 'delete'">
                  <div>
                    <p class="text-lg font-bold pr-8">Are you sure you want to delete “{{ activeList.title }}”?</p>
                    <p class="text-base-xs mt-3">If you delete this list and its {{ activeList.stocks.length }} item{{ activeList.stocks.length === 1 ? '' : 's' }}, it’ll be gone forever!</p>
                  </div>
                  <button v-show="!isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-red hover:bg-light-red p-4 flex items-center justify-center h-12 font-bold"><span class="text-white dark:text-black">Delete {{ activeList.title }}</span></button>
                  <button disabled v-show="isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-red p-4 flex items-center justify-center h-12 font-bold"><img class="w-10" :src="require('@/assets/img/auth/spinner-black.svg')"></button>
                </form>
                <form class="z-10 relative mt-2" @submit.prevent="handleUpdate" v-show="activeList && modalMode === 'edit'">
                    <p class="text-lg font-bold">Edit List</p>
                    <div class="flex items-center mt-7 px-4">
                    <button ref="emojiTrigger" @click="toggleEmojiPicker" class="flex-shrink-0 block border border-border-gray dark:border-neutral-bg-3 rounded h-10 w-10 items-center justify-center" type="button"><span v-if="emoji" v-html="`&#${emoji};`"></span></button>
                    <div class="ml-2 dark:bg-neutral-bg-3 border border-transparent rounded  dark:focus-within:bg-transparent transition-colors duration-150 flex-grow">
                        <input required placeholder="List Name" type="text" class="focus:outline-none dark:focus:border-light-green focus:border-light-green dark:border-transparent border-border-gray dark:border-neutral-bg-3 h-9 transition-colors duration-150 w-full rounded py-1 px-2 border text-base-xs bg-transparent" v-model="newListName">
                    </div>
                    </div>
                    <div class="flex justify-end items-center mt-2 transition-colors duration-200">
                        <button v-show="!isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-light-green hover:bg-lighter-green p-4 flex items-center justify-center h-12 font-bold"><span class="text-white dark:text-black">Save</span></button>
                        <button disabled v-show="isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-light-green p-4 flex items-center justify-center h-12 font-bold"><img class="w-10" :src="require('@/assets/img/auth/spinner-black.svg')"></button>
                    </div>
                </form>
                <form class="z-10 relative mt-2" @submit.prevent="handleAddStock" v-show="modalMode === 'addList'">
                    <p class="text-lg font-bold">Add {{ activeStock }} to Your Lists</p>
                    <div class="mt-7 px-4" v-if="allLists">
                        <template v-if="listModalIsOpen">
                            <template v-if="allLists.length">
                            <div v-for="(list, index) in allLists.slice().reverse()" :key="list.id">
                                <SingleListModal :list="list" :stock="activeStock" :checked="list.stocks.includes(activeStock)" :ready="ready" @changed="selectionChanged++" @unchanged="selectionChanged--" @updateMe="getListsReady" />
                            </div>
                            </template>
                            <p class="font-medium text-base-sm" v-else>No lists to display</p>
                        </template>
                    </div>
                    <div class="flex justify-end items-center mt-2 transition-colors duration-200">
                        <button v-show="!isPending" :disabled="selectionChanged === 0" type="submit" class="mt-6 text-base-xs truncate w-full rounded p-4 flex items-center justify-center h-12 font-bold" :class="selectionChanged === 0 ? 'bg-neutral-bg-2' : 'bg-light-green hover:bg-lighter-green' "><span class="text-white dark:text-black">Save Changes</span></button>
                        <button v-show="isPending" disabled type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-light-green p-4 flex items-center justify-center h-12 font-bold"><img class="w-10" :src="require('@/assets/img/auth/spinner-black.svg')"></button>
                    </div>
                </form>
                <p v-if="error" class="px-5 mt-1 text-base-xs font-bold text-red">{{ error }}</p>
                <button type="button" class="z-20 absolute rounded top-4 right-4 focus:outline-none p-1.5 hover:bg-light-gray dark:hover:bg-neutral-bg-3 transition-colors duration-150 dark:text-white" @click="closeListModal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-8 h-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                </button>
            </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import useDocument from '@/composables/useDocument'
import { EmojiButton } from '@joeattardi/emoji-button'
import SingleListModal from '@/components/dashboard/SingleListModal'

export default {
    name: 'ListModal',
    components: {
        SingleListModal
    },
    setup() {
        const store = useStore()
        const emoji = ref('9889')
        const emojiTrigger = ref(null)
        const showModalContent = ref(false)
        const newListName = ref('null')
        const selectionChanged = ref(0)
        const ready = ref(false)
        const listsToUpdate = ref([])
        const isPending = ref(false)

        const { error, deleteDoc, updateDoc } = useDocument('lists')

        const listModalIsOpen = computed(() => { 
            return store.state.listModalIsOpen
        })

        const activeList = computed(() => {
            return store.state.activeList
        })

        const activeStock = computed(() => {
            if (store.state.activeStock !== null) {
                return store.state.activeStock
            }
        })

        watch(activeList, () => {
            emoji.value = activeList.value.emoji
            newListName.value = activeList.value.title
        })  

        

        const modalMode = computed(() => { 
            return store.state.modalMode
        })
        
        const allLists = computed (() => {
            return store.state.allLists
        })

        const closeListModal = () => {
            showModalContent.value = false
            store.commit('closeListModal')
            document.documentElement.style.overflow = 'scroll'
            document.body.scroll = "yes"
            if (store.state.modalMode === 'edit') {
                emoji.value = activeList.value.emoji
                newListName.value = activeList.value.title
            }
            
        }

        const afterUpdate = () => {
            isPending.value = false
            showModalContent.value = false
            store.commit('closeListModal')
            document.documentElement.style.overflow = 'scroll'
            document.body.scroll = "yes"
        }

        const handleDelete = async () => {
            isPending.value = true
            await deleteDoc(activeList.value.id)
            afterUpdate()
            store.commit('updateNotificationType', 'delete')
            store.commit('showNotification')
        }

        const handleUpdate = async () => {
            isPending.value = true
            await updateDoc(activeList.value.id, {
                title: newListName.value,
                emoji: emoji.value
            })
            afterUpdate()
        }

        const picker = new EmojiButton({
            styleProperties: {
            '--font': 'Capsule Sans Text',
            '--blue-color': 'rgb(0, 200, 5)'
            },
            position: 'bottom-end',
            showVariants: false,
            zIndex: 100
        })

        
        const toggleEmojiPicker = () => {
            emojiTrigger.value.classList.add('border-light-green')
            emojiTrigger.value.classList.remove('border-border-gray', 'dark:border-neutral-bg-3')
            
            picker.togglePicker(emojiTrigger.value)
        }

        picker.on('emoji', selection => {
            emoji.value = selection.emoji.codePointAt(0)
        });

        picker.on('hidden', () => {
            emojiTrigger.value.classList.remove('border-light-green')
            emojiTrigger.value.classList.add('border-border-gray', 'dark:border-neutral-bg-3')
        });

        const handleAddStock = () => {
            ready.value = true
        }

        const getListsReady = (list, checked) => {
            let update
            let changeType
            if (checked.value) {
                update = [...list.stocks, activeStock.value]
                changeType = 'add'
            } else {
                update = list.stocks.filter(stock => {
                    return stock !== activeStock.value
                })
                changeType = 'delete'
            }
            listsToUpdate.value.push({list, stocks: update, changeType})

            if (listsToUpdate.value.length === selectionChanged.value ) {
                sendUpdates();
            }
        }

        const sendUpdates = async () => {
            isPending.value = true
            await Promise.all(listsToUpdate.value.map(async (details) => {
                const update = await updateDoc(details.list.id, { stocks: details.stocks })
            }))
            isPending.value = false
            showModalContent.value = false
            store.commit('closeListModal')
            store.commit('updateNotificationType', 'update')
            store.commit('setRecentlyUpdatedLists', null)
            store.commit('setRecentlyUpdatedLists', listsToUpdate.value)
            store.commit('showNotification')
            document.documentElement.style.overflow = 'scroll'
            document.body.scroll = "yes"
            listsToUpdate.value = []
            selectionChanged.value = 0
            ready.value = false
        }


        return { showModalContent, listModalIsOpen, activeList, modalMode, error, isPending, closeListModal, handleDelete, handleUpdate, toggleEmojiPicker, emoji, newListName, emojiTrigger, allLists, activeStock, selectionChanged, ready, sendUpdates, handleAddStock, getListsReady }
    }
    

}
</script>

<style>


    .slide-fade-enter-from {
        @apply opacity-0 transform translate-y-24;
    }

    .slide-fade-enter-active {
      @apply transition-all duration-300;
    }

    .fade-enter-from {
        @apply opacity-0;
    }

    .fade-enter-active {
        @apply transition-all duration-200 
    }

</style>