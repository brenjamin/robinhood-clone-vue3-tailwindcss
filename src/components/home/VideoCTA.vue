<template>
    <section class="border-t border-b border-black py-8">
        <div class="container">
            <slot name="callout"></slot>
        </div>
    </section>
    <section class="border-b border-black">
        <div class="flex flex-col lg:flex-row">
            <div class="h-75 lg:h-auto lg:w-1/2 relative order-last lg:order-none">
                <video autoplay loop playsinline muted class="object-cover object-center w-full h-full">
                <source :src="require('@/' + video.src)" :type="'video/' + video.type">
                </video>
            </div>
            <div class="lg:w-1/2 py-28 lg:py-44 px-6 md:px-8 lg:px-0 lg:pl-20">
                <slot name="headline"></slot>
                <button v-if="embed" class="hover:text-green font-bold flex items-center mt-5" @click="handleClick">
                    <span class="inline-block pr-1.5">See the campaign</span>
                    <svg class="fill-current" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M14 25.6667C20.4433 25.6667 25.6667 20.4434 25.6667 14C25.6667 7.55672 20.4433 2.33337 14 2.33337C7.55668 2.33337 2.33334 7.55672 2.33334 14C2.33334 20.4434 7.55668 25.6667 14 25.6667ZM13.1751 8.99168L17.0168 12.8334H7V15.1667H17.0168L13.1751 19.0084L14.825 20.6583L21.4833 14.0001L14.825 7.34176L13.1751 8.99168Z" fill-rule="evenodd"></path></svg>
                </button>
            </div>
        </div>
        <VideoModal ref="embedModal" :embed="embedUrl" v-if="embed" :modalIsOpen="modalIsOpen" @closeModal="handleClose" />
    </section>
    <slot name="button"></slot>
</template>

<script>
import VideoModal from '@/components/home/VideoModal'
import { ref } from 'vue'
export default {
    name: 'VideoCTA',
    components: {
        VideoModal
    },
    props: ['embed', 'video'],
    setup(props) {
        const modalIsOpen = ref(false)
        const embedUrl = ref('')

        const handleClick = () => {
            if (!embedUrl.value) {
                embedUrl.value = props.embed
            }
            document.documentElement.style.overflow = 'hidden'
            document.body.scroll = 'no'
            modalIsOpen.value = true
        }

        const handleClose = () => {
            modalIsOpen.value = false
            document.documentElement.style.overflow = 'scroll'
            document.body.scroll = 'yes'
        }

        return { modalIsOpen, embedUrl, handleClick, handleClose }
    }
}
</script>

<style>

</style>