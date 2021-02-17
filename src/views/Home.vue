<template>
  <Navbar :logo="logo" :links="links" />
</template>

<script>
import Navbar from '@/components/Navbar'
import getLinks from '@/composables/getLinks'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  setup() {
    const logo = {
      src: 'assets/robinhood-logo.svg',
      alt: 'Robinhood Logo',
      route: 'Home'
    }

    const links  = getLinks()

    return { logo, links }
  }
}
</script>
