<template>
    <button @click="openDisclosureModal" :class="disclosure.color ? disclosure.color : 'text-black'" class="hover:text-green flex items-center font-bold tracking-tight text-base-sm md:text-lg focus:outline-none">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" stroke-width="2" class="stroke-current"></circle><path d="M11.232 18H13.056V9.52H11.232V18ZM11.2 8.128H13.088V6.32H11.2V8.128Z" fill="rgb(0, 0, 0)" class="fill-current"></path></svg>
        <p class="ml-3">{{ disclosure.title }}</p>
   </button>
   <transition name="fade" @after-enter="showContent = true">
        <div class="fixed bg-transparent md:bg-black md:bg-opacity-75 inset-0 z-50 overflow-y-scroll md:px-8" v-show="modalIsOpen">
            <transition name="slide-fade">
            <div class="bg-white md:max-w-screen-md mx-auto h-full w-full md:h-auto md:w-auto p-8 py-20 md:p-12 md:py-20 md:mt-32 relative" v-show="showContent">
                <h2>{{ disclosure.title }}</h2>
                <p v-for="(p, index) in disclosure.description" class="mt-6" :key="index">{{ p }}</p>
                <button class="absolute top-5 right-5 focus:outline-none" @click="closeDisclosureModal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                </button>
            </div>
            </transition>
        </div>
   </transition>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'DisclosureModal',
    props: ['disclosure'],
    setup() {

        const modalIsOpen = ref(false)
        const showContent = ref(false)

        const openDisclosureModal = () => {
            modalIsOpen.value = true
            document.documentElement.style.overflow = 'hidden'
            document.body.scroll = 'no'
        }

        const closeDisclosureModal = () => {
            document.documentElement.style.overflow = 'scroll'
            document.body.scroll = "yes"
            showContent.value = false
            modalIsOpen.value = false
        }

        return { modalIsOpen, openDisclosureModal, closeDisclosureModal, showContent }
    }

}
</script>

<style scoped>

.slide-fade-enter-from {
        @apply opacity-0 transform translate-y-24;
    }

.slide-fade-enter-active, .slide-fade-leave-active {
  @apply transition-all duration-500 
}

@media (min-width: 768px) {
    .fade-enter-from {
        @apply opacity-0;
    }

    .fade-enter-active, .fade-leave-active {
    @apply transition-all duration-300 
    }
}

</style>