<template>
  <div v-show="modalIsOpen" @click.self="closeModal" class="fixed bg-black bg-opacity-75 inset-0 z-50 overflow-y-scroll cursor-pointer flex">
    <div class="w-full max-w-screen-md flex-grow px-5 md:px-8 m-auto py-8">
      <div class="border-6 md:border-10 border-white aspect-w-16 aspect-h-9 cursor-default relative">
        <iframe class="absolute h-full w-full left-0 top-0" :src="embed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'VideoModal',
  props: ['embed', 'modalIsOpen'],
  emits: ['closeModal'],
  setup(props, context) {

    const closeModal = () => {
      context.emit('closeModal')
    }

    return { closeModal }
  }
}
</script>

<style>

</style>