<template>
  <Navbar :logo="logo"/>
</template>

<script>
import Navbar from '@/components/Navbar'

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

    return { logo }
  }
}
</script>
