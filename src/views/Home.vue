<template>
  <Navbar :logo="logo"/>
  <HeroWithVideo :bgColor="hero.bgColor" :color="hero.color" :disclosure="hero.disclosure" :media="hero.media">
    <template v-slot:header>
      <h1 class="tracking">Investing for Everyone</h1>
    </template>
    <template v-slot:description>
      <p class="text-xxl md:text-2xl mt-6 font-medium leading-normal md:leading-normal">Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply.</p>
    </template>
    <template v-slot:button>
        <div class="hidden md:flex md:justify-center lg:justify-start md:mt-5 lg:mt-11 order-last lg:order-none">
        <router-link :to="{ name: 'Home' }" class="button button-black">Sign Up</router-link>
      </div>
    </template>
    <template v-slot:disclosure>
      <p class="mt-6">
        Commission-free trading refers to $0 commissions for Robinhood Financial self-directed individual cash or margin brokerage accounts that trade U.S. listed and certain OTC securities electronically. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see Robinhood Financial’s fee schedule to learn more.
      </p>
      <p class="mt-6">
        The free stock offer is available to new users only, subject to the terms and conditions at rbnhd.co/freestock. Free stock chosen randomly from the program’s inventory.
      </p>
    </template>
  </HeroWithVideo>
  <VideoCTA :embed="videoCTA.embed" :video="videoCTA.video">
    <template v-slot:callout>
      <p class="text-center font-medium">See our <span class="underline">fee schedule</span> to learn more about cost.</p>
    </template>
    <template v-slot:headline>
      <h2 class="h1">We are all investors.</h2>
    </template>
  </VideoCTA>
  <Features :features="features.features" :imgDesktop="features.imgDesktop" :imgMobile="features.imgMobile" :disclosure="features.disclosure" >
    <template v-slot:headline>
      <h2>Introducing Fractional Shares</h2>
      <p class="mt-4 text-text-gray">Invest in thousands of stocks with as little as $1.</p>
    </template>
    <template v-slot:disclosure>
      <p class="mt-6">
        Fractional shares are illiquid outside of Robinhood and not transferable. For a complete explanation of conditions, restrictions and limitations associated with fractional shares, see our <span class="text-green underline">Customer Agreement</span> related to fractional shares.
      </p>
    </template>
  </Features>
  <VerticalSlider />
  <ProductSlider>
    <template v-slot:headline>
      <h2>Our Products</h2>
    </template>
  </ProductSlider>
  <Footer />
  <DownloadAppBanner />
</template>

<script>
import Navbar from '@/components/home/Navbar'
import HeroWithVideo from '@/components/home/HeroWithVideo'
import VideoCTA from '@/components/home/VideoCTA'
import Features from '@/components/home/Features'
import VerticalSlider from '@/components/home/VerticalSlider'
import ProductSlider from '@/components/home/ProductSlider'
import Footer from '@/components/home/Footer'
import DownloadAppBanner from '@/components/home/DownloadAppBanner'
export default {
  name: 'Home',
  components: {
    Navbar,
    HeroWithVideo,
    VideoCTA,
    Features,
    VerticalSlider,
    ProductSlider,
    Footer,
    DownloadAppBanner
  },
  setup() {
    const logo = {
      src: 'assets/img/robinhood-logo.svg',
      alt: 'Robinhood Logo',
      route: 'Home'
    }

    const hero = {
      bgColor: 'bg-neon-green',
      color: 'text-black',
      disclosure: {
        title: 'Commissions & Free Stock Disclosures'
      },
      media: {
        img: {
          src: 'assets/img/robinhood-phone-and-credit-card.png',
          alt: 'Robinhood app being used'
        },
        video: {
          src: 'assets/video/hero-video.mp4',
          type: 'mp4'
        }
      }
    }

    const videoCTA = {
      embed: 'https://www.youtube.com/embed/6dd8cZfSIK0',
      video: {
          src: 'assets/video/superbowl-ad.mp4',
          type: 'mp4'
        }
    }

    const features =  {
      imgMobile: {
        src: 'assets/img/features-mobile.png'
      },
      imgDesktop: {
        src: 'assets/img/features-desktop.png'
      },
      features: [
        {
          heading: 'Invest Any Amount',
          description: 'Choose how much you want to invest, and we’ll convert from dollars to parts of a whole share.'
        },
        {
          heading: 'Build a Balanced Portfolio',
          description: 'Customize your portfolio with pieces of different companies and funds to help reduce risk.'
        },
        {
          heading: 'Trade in Real Time',
          description: 'Trades placed during market hours are executed at that time, so you’ll always know the share price.'
        }
      ],
      disclosure: {
        title: 'Fractional Shares Disclosure',
        color: 'text-text-gray'
      }
    }

    return { logo, hero, videoCTA, features }
  }
}
</script>
