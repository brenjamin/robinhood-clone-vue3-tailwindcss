<template>
  <Navbar :logo="logo"/>
  <HeroWithVideo :bgColor="hero.bgColor" :color="hero.color" :disclosure="hero.disclosure">
    <template v-slot:header>
      <h1>Investing for Everyone</h1>
    </template>
    <template v-slot:description>
      <p class="text-xxl md:text-2xl mt-6 font-medium leading-normal">Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply.</p>
    </template>
    <template v-slot:button>
      <div class="hidden md:flex md:justify-center lg:justify-start">
        <router-link :to="{ name: 'SignUp' }" class="button button-black mt-8">Sign Up</router-link>
      </div>
    </template>
  </HeroWithVideo>
</template>

<script>
import Navbar from '@/components/home/Navbar'
import HeroWithVideo from '@/components/home/HeroWithVideo'
export default {
  name: 'Home',
  components: {
    Navbar,
    HeroWithVideo
  },
  setup() {
    const logo = {
      src: 'assets/robinhood-logo.svg',
      alt: 'Robinhood Logo',
      route: 'Home'
    }

    const hero = {
      bgColor: 'bg-neon-green',
      color: 'text-black',
      disclosure: {
        title: '',
        description: [
          'Commission-free trading refers to $0 commissions for Robinhood Financial self-directed individual cash or margin brokerage accounts that trade U.S. listed and certain OTC securities electronically. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see Robinhood Financial’s fee schedule to learn more.', 'The free stock offer is available to new users only, subject to the terms and conditions at rbnhd.co/freestock. Free stock chosen randomly from the program’s inventory.'
        ]
      }
    }

    return { logo, hero }
  }
}
</script>
