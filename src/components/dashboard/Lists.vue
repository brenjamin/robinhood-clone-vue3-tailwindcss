<template>
  <div class="list-container bg-white dark:text-white shadow-input dark:bg-dark-bg-gray border-2 border-transparent dark:border-solid dark:border-neutral-bg-3 rounded transition-all ease-linear duration-1000 overflow-y-scroll">
      <div class="flex justify-between items-center py-3 border-b border-neutral-bg-3 px-4">
        <p class="text-base-sm font-bold">Lists</p>
        <button class="flex items-center justify-center dark:text-white" @click="showForm = true">
          <svg class="fill-current" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.125 8.875V14H8.875V8.875H14V7.125H8.875V2H7.125V7.125H2V8.875H7.125Z"></path></svg>
        </button>
      </div>
      <div v-if="showForm">
        <AddListForm @closeForm="showForm = false" />
      </div>
      <div v-if="lists">
        <SingleListSidebar v-for="list in lists.slice().reverse()" :list="list" @deleteList="prepareToDelete" />
      </div>
      <!-- Edit / Delete Modal -->
      <transition name="fade" @after-enter="showModalContent = true">
        <div class="fixed bg-black md:bg-opacity-75 inset-0 z-100 overflow-y-scroll px-8" v-show="modalIsOpen">
            <transition name="slide-fade">
            <div class="bg-white dark:bg-dark-bg-gray max-w-full w-100 min-h-0 h-auto pt-4 pb-6 px-6 relative mt-56 mx-auto rounded" v-show="showModalContent">
                <form @submit.prevent="handleDelete" v-if="activeList">
                  <div>
                    <p class="text-lg font-bold pr-8">Are you sure you want to delete “{{ activeList.title }}”?</p>
                    <p class="text-base-xs mt-3">If you delete this list and its {{ activeList.stocks.length }} item{{ activeList.stocks.length === 1 ? '' : 's' }}, it’ll be gone forever!</p>
                  </div>
                  <button v-show="!isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-red p-4 flex items-center justify-center h-12 font-bold"><span class="text-black">Delete {{ activeList.title }}</span></button>
                  <button disabled v-show="isPending" type="submit" class="mt-6 text-base-xs truncate w-full rounded bg-red p-4 flex items-center justify-center h-12 font-bold"><img class="w-10" :src="require('@/assets/img/auth/spinner-black.svg')"></button>
                </form>
                <button type="button" class="absolute rounded top-4 right-4 focus:outline-none p-1.5 hover:bg-border-gray dark:hover:bg-neutral-bg-3 transition-colors duration-150 dark:text-white" @click="closeListModal">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-current w-8 h-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                </button>
            </div>
            </transition>
        </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import AddListForm from '@/components/dashboard/AddListForm'
import SingleListSidebar from '@/components/dashboard/SingleListSidebar'
import getCollection from '@/composables/getCollection'
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'

export default {
  name: 'Lists',
  components: {
    AddListForm,
    SingleListSidebar
  },
  setup() {
    const showForm = ref(false)
    const store = useStore()
    const activeList = ref(null)
    const modalIsOpen = ref(false)
    const showModalContent = ref(false)
    const modalMode = ref('')
    const { user } = getUser()


    const { error, isPending, deleteDoc, updateDoc } = useDocument('lists', activeList.id)
    console.log(deleteDoc)
    console.log(error.value)

    const { documents: lists } = getCollection(
        'lists',
        ['userId', '==', store.state.user.uid]
    );

    const prepareToDelete = list => {
      activeList.value = list
      modalIsOpen.value = true
      modalMode.value = 'delete'
      store.commit('toggleListModal')
      document.documentElement.style.overflow = 'hidden'
      document.body.scroll = "no"
    }

    const prepareToEdit = list => {
      activeList.value = list
      modalIsOpen.value = true
      modalMode.value = 'delete'
      store.commit('toggleListModal')
      document.documentElement.style.overflow = 'hidden'
      document.body.scroll = "no"
    }

    const closeListModal = () => {
      modalIsOpen.value = false
      document.documentElement.style.overflow = 'scroll'
      document.body.scroll = "yes"
      store.commit('toggleListModal')
    }

    const handleDelete = async () => {
      await deleteDoc(activeList.value.id)
      closeListModal()
    }
    

    return { showForm, lists, prepareToDelete, modalIsOpen, activeList, showModalContent, closeListModal, modalMode, handleDelete, isPending }
  }
}
</script>

<style scoped lang="postcss">
    .list-container {
        height: calc(100vh - 150px);
    }

    .slide-fade-enter-from {
        @apply opacity-0 transform translate-y-24;
    }

    .slide-fade-enter-active, .slide-fade-leave-active {
      @apply transition-all duration-500 
    }

    .fade-enter-from {
        @apply opacity-0;
    }

    .fade-enter-active, .fade-leave-active {
    @apply transition-all duration-300 
    }


</style>