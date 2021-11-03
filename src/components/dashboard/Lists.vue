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
        <SingleListSidebar v-for="list in lists.slice().reverse()" :list="list" />
      </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import AddListForm from '@/components/dashboard/AddListForm'
import SingleListSidebar from '@/components/dashboard/SingleListSidebar'
import getCollection from '@/composables/getCollection'


export default {
  name: 'Lists',
  components: {
    AddListForm,
    SingleListSidebar
  },
  setup() {
    const showForm = ref(false)
    const store = useStore()

    const { documents: lists } = getCollection(
        'lists',
        ['userId', '==', store.state.user.uid]
    );

    return { showForm, lists }
  }
}
</script>

<style scoped lang="postcss">
    .list-container {
        height: calc(100vh - 150px);
    }


</style>