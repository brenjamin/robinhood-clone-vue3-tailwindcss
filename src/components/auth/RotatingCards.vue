<template>
    <div class="mt-6 card-wrapper" ref="cardWrapper">
        <div v-for="(stock, index) in stocks" :key="index" class="absolute text-base-xs md:text-base-sm right-0 left-0 mx-auto w-30">
            <div>
                <transition name="slide">
                <div v-show="index === active" class="h-40 w-30 border border-black border-r-5 rounded-lg box-content flex flex-col bg-white origin-left-bottom relative">
                    <div class="m-1.25 bg-opacity-50 border border-dotted border-black rounded-lg flex-grow flex flex-col">
                        <div class="m-1.25 border border-dotted border-black rounded-lg flex-grow flex flex-col items-center justify-end bg-opacity-30" :class="stock.bgColor">
                            <img class="w-16.5" :src="require('@/' + stock.img.src)">
                            <p class="font-medium mt-3 md:mt-1.5">${{ stock.latestPrice }}</p>
                            <p class="mt-1 md:-mt-1 mb-1 md:mb-0">{{ stock.shorthand ? stock.shorthand : stock.name }}</p>
                        </div>
                    </div>
                </div>
                </transition>
            </div>
        </div>
    </div>
    <transition name="fade-in" mode="out-in">
        <div :key="active">
            <div class="text-center mt-3 mb-6 text-base-xs md:text-base-sm relative left-1">
                <p class="inline-block">
                    {{ stocks[active].odds }} chance
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
import { onMounted, ref } from 'vue'
import getStockSandbox from '@/composables/getStockSandbox'
export default {
    name: 'RotatingCards',
    props: ['stocks'],
    setup(props) {
        const active = ref(0)
        const cardWrapper = ref(null)

        onMounted(() => {
            const children = cardWrapper.value.children
            let max = 0
            children.forEach(child => {
                max = child.offsetHeight > max ? child.offsetHeight : max
            })
            cardWrapper.value.style.height = max + 'px'
            
            setInterval(() => {
                active.value = active.value === props.stocks.length - 1 ? 0 : active.value + 1
            }, 2500)
        })

        return { active, cardWrapper }
    }
}
</script>

<style scoped>
    @keyframes slide-out {
        0% {
            z-index: 2;
            border-right-width: 1px;
        }
        50% {
            transform: translate3d(78px, -40px, 0px) rotate(15deg);
            border-right-width: 1px;
        } 
        75% {
            z-index: 1;
        } 
        100% {
            transform: rotate(0deg);
            z-index: 0;
            border-right-width: 1px;
        }
    }
    @keyframes slide-in {
        0% {
            z-index: 1;
            transform: translate3d(0,0,0);
            border-right-width: 3px;
        }
        50% {
            transform: translate3d(-78px, 0px, 0px);
        } 
        75% {
            z-index: 2;
        }
        92.5% {
            border-right-width: 4px;
        }
        100% {
            transform: translate3d(0,0,0);
            z-index: 3;
            border-right-width: 5px;
        }
    }

    .slide-leave-active {
    animation: slide-out .8s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .slide-enter-active {
    animation: slide-in .8s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .fade-in-enter-active {
    @apply transition-opacity;
    transition-delay: 500ms;
    transition-duration: 300ms;
    }
    .fade-in-enter-from,
    .fade-in-leave-to {
        @apply opacity-0;
    }
</style>