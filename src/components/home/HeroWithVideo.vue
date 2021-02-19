<template>
  <section :class="[bgColor, color]">
      <div class="max-w-screen-xl mx-auto lg:flex lg:items-center px-6 md:px-8 lg:px-9 pb-9 md:pb-18 lg:pb-0">
          <div class="py-12.5 lg:py-25 lg:w-2/5 lg:mr-2 flex flex-col">
                <slot name="header"></slot>
                <slot name="description"></slot>
                <slot name="button"></slot>
                <div v-if="disclosure" class="mb-5 mt-8 lg:mt-10">
                    <DisclosureModal :disclosure="disclosure" />
                </div>
          </div>
          <div class="mt-9 md:mt-15 lg:w-3/5 lg:ml-6 lg:mt-7.5 lg:mb-5 relative">
            <img :src="require('@/' + media.img.src)" :alt="media.img.alt" class="z-10 relative">
            <video autoplay loop playsinline muted class="absolute top-0 left-0 object-contain w-full h-full box-border border border-transparent">
                <source :src="require('@/' + media.video.src)" :type="'video/' + media.video.type">
            </video>
          </div>
      </div>
  </section>
</template>

<script>
import DisclosureModal from '@/components/home/DisclosureModal'
export default {
    name: 'HeroWithVideo',
    props: ['bgColor', 'color', 'disclosure', 'media'],
    components: {
        DisclosureModal
    },
    setup(props) {
        console.log(props.media)
    }
}
</script>

<style>

</style>