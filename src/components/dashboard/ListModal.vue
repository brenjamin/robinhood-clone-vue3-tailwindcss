<template>
    <transition name="fade" @after-enter="showModalContent = true">
        <div class="fixed bg-black md:bg-opacity-75 inset-0 z-100 overflow-y-scroll px-8" v-show="listModalIsOpen">
            <transition name="slide-fade">
            <div class="bg-white dark:bg-dark-bg-gray max-w-md min-w-100 min-h-0 h-auto pt-4 pb-6 px-6 relative mt-56 mx-auto rounded" v-show="showModalContent">
                <form @submit.prevent="handleDelete" v-if="activeList && editOrDelete === 'delete'">
                  <div>
                    <p class="text-lg font-bold pr-8">Are you sure you want to delete “{{ activeList.title }}”?</p>
                    <p class="text-base-xs mt-3">If you delete this list and its {{ activeList.stocks.length }} item{{ activeList.stocks.length === 1 ? '' : 's' }}, it’ll be gone forever!</p>
                  </div>
                  <button v-show="!isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-red hover:bg-light-red p-4 flex items-center justify-center h-12 font-bold"><span class="text-white dark:text-black">Delete {{ activeList.title }}</span></button>
                  <button disabled v-show="isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-red p-4 flex items-center justify-center h-12 font-bold"><img class="w-10" :src="require('@/assets/img/auth/spinner-black.svg')"></button>
                </form>
                <form class="z-10 relative mt-2" @submit.prevent="handleUpdate" v-show="activeList && editOrDelete === 'edit'">
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

export default {
    name: 'ListModal',
    setup() {
        const store = useStore()
        const emoji = ref('9889')
        const emojiTrigger = ref(null)
        const showModalContent = ref(false)
        const newListName = ref('null')
        
        const { error, isPending, deleteDoc, updateDoc } = useDocument('lists')

        const listModalIsOpen = computed(() => { 
            return store.state.listModalIsOpen
        })

        const activeList = computed(() => {
            return store.state.activeList
        })

        watch(activeList, () => {
            emoji.value = activeList.value.emoji
            newListName.value = activeList.value.title  
        })  

        const editOrDelete = computed(() => { 
            return store.state.editOrDeleteList
        })

        const closeListModal = () => {
            showModalContent.value = false
            store.commit('closeListModal')
            document.documentElement.style.overflow = 'scroll'
            document.body.scroll = "yes"
            emoji.value = activeList.value.emoji
            newListName.value = activeList.value.title
        }

        const afterUpdate = () => {
            showModalContent.value = false
            store.commit('closeListModal')
            document.documentElement.style.overflow = 'scroll'
            document.body.scroll = "yes"
        }

        const handleDelete = async () => {
            await deleteDoc(activeList.value.id)
            afterUpdate()
        }

        const handleUpdate = async () => {
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


        return { showModalContent, listModalIsOpen, activeList, editOrDelete, error, isPending, closeListModal, handleDelete, handleUpdate, toggleEmojiPicker, emoji, newListName, emojiTrigger }
    }
    

}
</script>

<style>


    .slide-fade-enter-from {
        @apply opacity-0 transform translate-y-24;
    }

    .slide-fade-enter-active, .slide-fade-leave-active {
      @apply transition-all duration-500;
    }

    .fade-enter-from {
        @apply opacity-0;
    }

    .fade-enter-active, .fade-leave-active {
    @apply transition-all duration-300 
    }

</style>