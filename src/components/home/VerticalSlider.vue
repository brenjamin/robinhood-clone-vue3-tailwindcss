<template>
  <section class="py-15 lg:py-20 bg-black text-white overflow-x-hidden">
      <div class="container">
        <!-- Desktop -->
        <div class="hidden lg:flex items-center">
            <div class="w-1/6 flex flex-col items-end">
                <button @click="handlePrev" class="text-text-gray hover:text-green cursor-pointer focus:outline-none">
                    <svg class="fill-current w-7" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M22.3021 16.1979L24.3645 14.1355L14 3.771L3.63544 14.1355L5.69783 16.1979L12.5417 9.3541L12.5417 24.5001L15.4583 24.5001L15.4583 9.35414L22.3021 16.1979Z" fill-rule="evenodd"></path></svg>
                </button>
                <ul class="my-4 flex flex-col items-end">
                    <li v-for="(slide, index) in slides" :key="index" class="mt-5 first:mt-0 text-2xl">
                        <button @click="handleClick(index)" class="font-medium cursor-pointer focus:outline-none" :class="activeSlide === index ? 'text-white' : 'text-text-gray hover:text-green'">
                            {{ slide.button }}
                        </button>
                    </li>
                </ul>
                <button @click="handleNext" class="text-text-gray hover:text-green cursor-pointer focus:outline-none">
                    <svg class="fill-current w-7 transform rotate-180" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M22.3021 16.1979L24.3645 14.1355L14 3.771L3.63544 14.1355L5.69783 16.1979L12.5417 9.3541L12.5417 24.5001L15.4583 24.5001L15.4583 9.35414L22.3021 16.1979Z" fill-rule="evenodd"></path></svg>
                </button>
            </div>
            <div class="w-5/6 relative">
                <div class="flex items-center">
                    <div class="w-1/2">
                        <transition :name="transitionNext ? 'blur-fade-up' : 'blur-fade-down'" mode="out-in">
                            <img :src="require('@/' + slides[activeSlide].img.src)" :alt="slides[activeSlide].img.alt" class="w-64 mx-auto" :key="activeSlide">
                        </transition>
                    </div>
                    <div class="w-1/2">
                        <transition :name="transitionNext ? 'fade-up' : 'fade-down'" mode="out-in">
                        <div :key="activeSlide">
                            <h2 class="text-white h1">{{ slides[activeSlide].headline }}</h2>
                            <p class="mt-3">{{ slides[activeSlide].description }}</p>
                        </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile -->
        <div class="lg:hidden">
            <div class="overflow-x-visible whitespace-nowrap duration-300 transition-transform" :style="sliderStyle">
                <div v-for="(slide, index) in slides" :key="index" class="w-full inline-block">
                    <img :src="require('@/' + slide.img.src)" :alt="slide.img.alt" class="w-40 mx-auto">
                </div>
            </div>
            <ul class="mt-4 flex justify-center">
                <li v-for="(slide, index) in slides" :key="index" class="mx-1.5">
                    <button @click="handleClick(index)" class="border-2 border-white w-4 h-4 rounded-full cursor-pointer focus:outline-none" :class="activeSlide === index ? 'bg-white' : ''"></button>
                </li>
            </ul>
            <div class="mt-6">
                <div :key="activeSlide">
                    <h2 class="text-white">{{ slides[activeSlide].headline }}</h2>
                    <p class="mt-3">{{ slides[activeSlide].description }}</p>
                </div>
            </div>
        </div>
      </div>
  </section>
</template>

<script>
import getVerticalSlides from '@/composables/getVerticalSlides'
import { computed, ref } from 'vue';
export default {
    name: 'VerticalSlider',
    setup() {
        const slides = getVerticalSlides();
        const activeSlide = ref(0)
        const transitionNext = ref(true)
        const interval = setInterval(() => {
            goToNextSlide()
        }, 7000)

        const handleClick = index => {
            clearInterval(interval)
            transitionNext.value = index > activeSlide.value ? true : false
            activeSlide.value = index
            console.log(activeSlide.value)
        }

        const handlePrev = () => {
            clearInterval(interval)
            transitionNext.value = false
            activeSlide.value = activeSlide.value > 0 ? activeSlide.value - 1 : slides.value.length - 1
        }

        const handleNext = () => {
            clearInterval(interval)
            transitionNext.value = true
            goToNextSlide() 
        }

        const goToNextSlide = () => {
            activeSlide.value = activeSlide.value === slides.value.length - 1 ? 0 : activeSlide.value + 1
        }

        const sliderStyle = computed(() => {
            return `transform: translateX(calc(-100% * ${activeSlide.value}))`;
        })

        return { activeSlide, slides, handleClick, handlePrev, handleNext, transitionNext, sliderStyle }
    }


}
</script>

<style scoped lang="postcss">
.fade-up-enter-active, .fade-down-enter-active,
.fade-up-leave-active, .fade-down-leave-active,
.blur-fade-up-enter-active, .blur-fade-down-enter-active,
.blur-fade-up-leave-active, .blur-fade-down-leave-active{
  @apply transition-all duration-500;
}
.slide-enter-active, .slide-enter-active,
.slide-leave-active, .slide-leave-active  {
    @apply transition-all duration-200;
}

.fade-up-enter-from,
.fade-up-leave-to,
.fade-down-enter-from,
.fade-down-leave-to {
  @apply opacity-0;
}
.blur-fade-up-enter-from,
.blur-fade-up-leave-to,
.blur-fade-down-enter-from,
.blur-fade-down-leave-to {
    @apply opacity-0;
  filter: blur(20px);
}

.fade-up-leave-to, .fade-down-enter-from,
.blur-fade-up-leave-to, .blur-fade-down-enter-from {
  @apply transform -translate-y-24;
}
.fade-up-enter-from, .fade-down-leave-to,
.blur-fade-up-enter-from, .blur-fade-down-leave-to {
  @apply transform translate-y-24;
}
</style>