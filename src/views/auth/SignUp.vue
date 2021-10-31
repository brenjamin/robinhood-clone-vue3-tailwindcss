<template>
  <div class="md:flex leading-lax min-h-screen">
    <div class="md:w-3/5 left md:pb-8">
      <div class="pt-4 pb-14 px-8 md:p-0 md:mx-auto md:max-w-3xl md:pt-10 mb:pb-12">
        <router-link :to="{ name: 'Home' }">
            <img src="@/assets/img/robinhood-logo.svg" alt="robinhood logo" class="w-36"/>
        </router-link>
        <div class="mt-8 md:mt-22">
          <p class="text-2xl font-medium">Make Your Money Move</p>
          <p class="text-base-sm mt-3">Robinhood lets you invest in companies you love, commission-free.</p>
        </div>
        <form @submit.prevent="handleSubmit" class="text-base-xs mt-10">
            <input v-model="email" type="email" placeholder="Email" class="block w-full px-3 py-1.5 bg-light-gray rounded border border-solid border-light-gray hover:bg-white transition-colors duration-200 focus:outline-none focus:border-green focus:bg-white">
            <input v-model="password" type="password" placeholder="Password" class="block w-full mt-6 px-3 py-1.5 bg-light-gray rounded border border-solid border-light-gray hover:bg-white transition-colors duration-200 focus:outline-none focus:border-green focus:bg-white">
            <button v-if="!isPending" type="submit" class="button-login mt-12 min-w-36">
              Continue
            </button>
            <button v-else disabled class="button-login mt-12 min-w-36">
              <img class="w-10" :src="require('@/assets/img/auth/spinner.svg')">
            </button>
            <div v-if="error" class="text-red mt-4">{{ error }}</div>
        </form>
        <router-link :to="{ name: 'Login' }" class="block text-green font-medium text-base-xs mt-8">Already have an account? Sign in.</router-link>
        <div class="hidden md:block text-fine-print leading-relaxed mt-25">
          <p>All investments involve risk, including the possible loss of principal. Investors should consider their investment objectives and risks carefully before investing.</p>
          <p class="mt-4">Commission-free trading means $0 commission trading on self-directed individual cash or margin brokerage accounts that trade U.S. listed securities via mobile devices or web. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see Robinhood Financial’s <a href class="text-green text-inherit font-medium">fee schedule</a> to learn more.</p>
          <p class="mt-4">Securities trading offered through Robinhood Financial LLC. Brokerage clearing services offered through Robinhood Securities, LLC. Both are subsidiaries of Robinhood Markets, Inc.</p>
          <p class="mt-4"><a href class="text-green text-inherit font-medium">Check the background of Robinhood Financial LLC and Robinhood Securities, LLC on FINRA’s BrokerCheck.</a></p>
          <p class="mt-4 text-green font-medium">Robinhood Terms & Conditions  Disclosure Library  Contact Us  FAQ</p>
          <p class="mt-4">© 2020 Robinhood. All rights reserved.</p>
        </div>
      </div>
    </div>
    <div class="right bg-light-gray md:w-2/5 p-8 pb-12 md:pb-0 md:pt-44 text-base-sm">
      <div class="md:max-w-xxs">
        <div v-for="(feature, index) in features" :key="index" class="mt-10 first:mt-0">
          <p class="font-bold">{{ feature.heading }}</p>
          <p class="mt-2" v-html="feature.description"></p>
        </div>
      </div>
      <div class="md:hidden text-fine-print leading-relaxed mt-20">
          <p>All investments involve risk, including the possible loss of principal. Investors should consider their investment objectives and risks carefully before investing.</p>
          <p class="mt-4">Commission-free trading means $0 commission trading on self-directed individual cash or margin brokerage accounts that trade U.S. listed securities via mobile devices or web. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account. Please see Robinhood Financial’s <a href class="text-green text-inherit font-medium">fee schedule</a> to learn more.</p>
          <p class="mt-4">Securities trading offered through Robinhood Financial LLC. Brokerage clearing services offered through Robinhood Securities, LLC. Both are subsidiaries of Robinhood Markets, Inc.</p>
          <p class="mt-4"><a href class="text-green text-inherit font-medium">Check the background of Robinhood Financial LLC and Robinhood Securities, LLC on FINRA’s BrokerCheck.</a></p>
          <p class="mt-4 text-green font-medium">Robinhood Terms & Conditions  Disclosure Library  Contact Us  FAQ</p>
          <p class="mt-4">© 2020 Robinhood. All rights reserved.</p>
        </div>
    </div>
  </div>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: "Signup",
  setup() {
    const { error, signup, isPending } = useSignup()

    const email = ref('')
    const password = ref('')

    const router = useRouter()


    const handleSubmit = async () => {
        const res = await signup(email.value, password.value)
        if (!error.value) {
            router.push({ name: 'Dashboard'})
        }
    }

    const features = [
      {
        heading: "Commission-free trading",
        description:
          'Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply. View our <a class="text-green text-base-sm">fee schedule</a> to learn more.',
      },
      {
        heading: "Account Protection",
        description: 'Robinhood Financial is a member of SIPC. Securities in your account protected up to $500,000. For details, please see <a class="text-green text-base-sm">www.sipc.org</a>.',
      },
      {
        heading: "Stay on top of your portfolio",
        description: "Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you."
      }
    ]
    

    return { features, email, password, error, isPending, handleSubmit }
  }
}
</script>

<style scoped>
@screen md {
  .left {
    padding-right: 10%;
    padding-left: 10%;
  }
  .right {
    padding-left: 4%;
    padding-right: 4%;
  }
}
</style>
