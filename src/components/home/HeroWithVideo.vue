<template>
  <section :class="[bgColor, color]">
      <div class="max-w-screen-xl mx-auto lg:flex lg:items-center">
          <div class="py-12.5 lg:py-25 px-6 md:px-8 lg:px-9 lg:w-2/5">
              <slot name="header"></slot>
              <slot name="description"></slot>
              <slot name="button"></slot>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    name: 'HeroWithVideo',
    props: ['bgColor', 'color', 'disclosure'],
    setup(props) {
    }
}
</script>

<style>

</style>