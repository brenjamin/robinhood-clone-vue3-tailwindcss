<template>
<section class="pt-32 pb-12.5 lg:py-12.5 relative">
    <div class="lg:hidden h-20 absolute top-0 inset-x-0">
        <img :src="require('@/' + imgMobile.src)" class="h-full w-full object-cover object-top">
    </div>
    <div class="container relative">
        <slot name="headline"></slot>
        <div class="mt-12 lg:flex">
            <div v-for="(feature, index) in features" :key="index" class="mt-10 first:mt-0 pr-8 lg:w-1/4 lg:mt-0">
                <p class="font-bold">{{ feature.heading }}</p>
                <p class="mt-2">{{ feature.description }}</p>
            </div>
        </div>
        <div class="hidden lg:block absolute right-0 inset-y-0">
            <img :src="require('@/' + imgDesktop.src)" class="max-w-sm mx-auto transform lg:translate-x-56 xl:translate-x-20">
        </div>
        <div v-if="disclosure" class="my-16">
            <DisclosureModal :disclosure="disclosure">
                <template v-slot:disclosure>
                    <slot name="disclosure"></slot>
                </template>
            </DisclosureModal>
        </div>
    </div>
</section>

  
</template>

<script>
import DisclosureModal from '@/components/home/DisclosureModal'
export default {
    name: 'Features',
    props: ['features', 'imgDesktop', 'imgMobile', 'disclosure'],
    components: {
        DisclosureModal
    }

}
</script>

<style>

</style>