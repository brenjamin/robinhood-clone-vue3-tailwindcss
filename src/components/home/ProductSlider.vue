<template>
    <section class="py-9 md:py-21 xl:pb-15 bg-bg-gray overflow-x-hidden">
        <div class="container">
            <slot name="headline"></slot>
            <div class="flex flex-col xl:flex-row relative">
                <div class="z-10 order-last xl:order-none flex-grow">
                    <!-- Desktop Buttons -->
                    <ul class="mt-21 xl:mt-7 hidden md:flex">
                        <li v-for="(product, index) in products" :key="index" class="px-3 xl:px-3.75 first:pl-0 last:pr-0" :class="product.offset ? 'border-l border-black' : ''">
                            <button @click="handleClick(index)" class="font-medium cursor-pointer focus:outline-none" :class="[index === activeProduct && !product.offset ? 'text-black' : '', index === activeProduct && product.offset ? 'text-mid-magenta' : '', index !== activeProduct && !product.offset ? 'text-text-gray hover:text-green' : '', index !== activeProduct && product.offset ? 'text-light-magenta hover:text-mid-magenta' : '']">
                                <h3 class="text-2xl">{{ product.name }}</h3>
                            </button>
                        </li>
                    </ul>
                    <!-- Mobile Buttons -->
                    <ul ref="buttonWrapper" class="mt-12 md:hidden overflow-x-visible whitespace-nowrap slide-buttons transition-transform" @click="handleClickMobile" :style="[mobileButtonTransform, mobileButtonTransition]">
                        <li v-for="(product, index) in products" :key="index" class="inline-block slide-button text-center w-1/2">
                            <button :data-index="index" class="cursor-pointer focus:outline-none text-base-sm w-full" :class="[index === activeProduct && !product.offset ? 'text-black' : '', index === activeProduct && product.offset ? 'text-mid-magenta' : '', index !== activeProduct && !product.offset ? 'text-text-gray hover:text-green' : '', index !== activeProduct && product.offset ? 'text-light-magenta hover:text-mid-magenta' : '']">
                                {{ product.name }}
                            </button>
                        </li>
                    </ul>
                    <transition name="fade-down" mode="out-in">
                        <div class="mt-10 md:mt-18" :key="activeProduct">
                            <p class="md:max-w-md">{{ products[activeProduct].description }}</p>
                            <p class="md:hidden mt-8 text-xxs" v-html="products[activeProduct].regulatoryMessage"></p>
                            <button class="button button-black w-full md:w-auto mt-10 xl:mt-52">Learn More</button>
                        </div>
                    </transition>
                </div>
                <div class="xl:absolute xl:top-0 xl:right-0 mx-auto mt-7 xl:mt-0 z-0">
                    <transition name="blur-fade" mode="out-in">
                    <img :src="require('@/' + products[activeProduct].img.src)" :alt="products[activeProduct].img.alt" :key="activeProduct" class="w-100 xl:w-146 xl:h-auto">
                    </transition>
                </div>
            </div>
            <div class="mt-5 md:mt-12 xl:mt-25 flex justify-center md:justify-between items-center">
                <div class="flex-grow flex justify-center md:justify-start">
                <DisclosureModal :disclosure="products[activeProduct].disclosure" v-if="products[activeProduct].disclosure">
                    <template v-slot:disclosure>
                    <p v-for="(p, index) in products[activeProduct].disclosure.description" class="mt-6 first:mt-0">
                        <span v-html="p"></span>
                    </p>
                    </template>
                </DisclosureModal>
                </div>
                <p class="hidden md:block flex-grow text-right text-base-xs" v-html="products[activeProduct].regulatoryMessage"></p>
            </div>
        </div>
    </section>
</template>

<script>
import getProducts from '@/composables/getProducts'
import DisclosureModal from '@/components/home/DisclosureModal'
// import { Hooper, Slide } from 'hooper';
// import 'hooper/dist/hooper.css';
import { computed, onMounted, ref } from 'vue'
export default {
    name: 'ProductSlider',
    components: {
        DisclosureModal
    },
    setup() {
        const products = getProducts()
        const activeProduct = ref(0)
        const buttonWrapper = ref(null)
        const slideIndex = ref(0)

        const mobileButtonTransition = {
            transitionDuration: '500ms'
        }

        const handleClick = index => {
            slideIndex.value = index
            activeProduct.value = index
        }

        const handleClickMobile = event => {
            let button = event.target
            if (button.parentElement.id === 'first-clone') {
                slideIndex.value = products.value.length
                activeProduct.value = parseInt(button.dataset.index)
                mobileButtonTransition.transitionDuration = '500ms'
            } else if (button.parentElement.id === 'last-clone') {
                slideIndex.value = -1
                activeProduct.value = parseInt(button.dataset.index)
                mobileButtonTransition.transitionDuration = '500ms'
            } else if (!(button.parentElement.id)) {
                mobileButtonTransition.transitionDuration = '500ms'
                slideIndex.value = parseInt(button.dataset.index)
                activeProduct.value = parseInt(button.dataset.index)
            }
        }

        onMounted(() => {
            let buttons = document.querySelectorAll('.slide-button')
            const firstClone = buttons[0].cloneNode(true)
            const lastClone = buttons[buttons.length - 1].cloneNode(true)
            const secondClone = buttons[1].cloneNode(true)
            const secondToLastClone = buttons[buttons.length - 2].cloneNode(true)
            firstClone.id = 'first-clone'
            lastClone.id = 'last-clone'
            secondClone.id = 'second-clone'
            secondToLastClone.id = 'second-to-last-clone'
            firstClone.firstChild.classList.remove('text-black');
            firstClone.firstChild.classList.add('text-text-gray', 'hover:text-green')
            buttonWrapper.value.prepend(lastClone)
            buttonWrapper.value.append(firstClone)
            buttonWrapper.value.prepend(secondToLastClone)
            buttonWrapper.value.append(secondClone)

            buttonWrapper.value.addEventListener('transitionend', () => {
                if (slideIndex.value === products.value.length) {
                    mobileButtonTransition.transitionDuration = '0ms'
                    slideIndex.value = activeProduct.value
                } else if (slideIndex.value === -1) {
                    mobileButtonTransition.transitionDuration = '0ms'
                    slideIndex.value = activeProduct.value
                }

            })
        })

        const mobileButtonTransform = computed(() => {
            return `transform: translateX(calc(-50% * ${slideIndex.value } - 75%))`;
        })

        return { products, activeProduct, handleClick, handleClickMobile, mobileButtonTransform, buttonWrapper, slideIndex, mobileButtonTransition }
    }
    
    
}
</script>

<style scoped lang="postcss">
.blur-fade-enter-active, .blur-fade-leave-active {
  transition: opacity, filter;
  transition-duration: 600ms;
}
.blur-fade-enter-from,
.blur-fade-leave-to {
    @apply opacity-0;
  filter: blur(15px);
}

@screen md {
    .fade-down-enter-active, .fade-down-leave-active{
        @apply transition-all duration-300 ease-in;
    }
    .fade-down-enter-from, .fade-down-leave-to {
        @apply opacity-0 transform translate-y-16 ease-in;
    }
    .blur-fade-enter-active, .blur-fade-leave-active {
        transition-duration: 650ms;
    }
}

</style>