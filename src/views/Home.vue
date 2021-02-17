<template>
  <Navbar :logo="logo" :links="links" />
  <div>
    <p>Home</p>
  </div>
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

    const links = [
      {
        top: {
          name: 'Products',
          link: ''
        },
        sub: [
          {
            name: ''
          }
        ]
      }
    ]

    return { logo, links }
  }
}
</script>
