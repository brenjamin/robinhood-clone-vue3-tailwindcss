<template>
  <footer class="bg-black text-white pt-13.5 pb-9">
      <div class="container">
          <nav class="flex flex-col md:flex-row md:flex-wrap font-bold lg:flex-no-wrap lg:justify-between pb-25 lg:pb-5">
              <div class="w-full lg:w-2/5 lg:order-last mb-2 md:mb-15 lg:mb-18 md:px-2">
                 <NewsletterSignup />
              </div>
              <div v-for="(column, index) in links" :key="index" class="flex flex-col md:w-1/3 lg:w-1/6 md:px-2">
                <template v-for="(link, index) in column" :key="index">
                    <router-link v-if="link.route" :to="{ name: link.route }" class="my-2 md:first:mt-0 md:last:mb-0" :class="link.offset ? 'hover:text-mid-magenta' : 'hover:text-green'">{{ link.name }}</router-link>
                    <a v-else @click.prevent :href="link.href" target="_blank" class="my-2 md:first:mt-0 md:last:mb-0" :class="link.offset ? 'hover:text-mid-magenta' : 'hover:text-green'">{{ link.name }}</a>
                </template>
                <div v-if="index === links.length - 1" class="flex mb-2 mt-4">
                    <img src="@/assets/img/footer/linkedin-logo.svg" alt="LinkedIn Logo" class="w-5 mx-2.5 ml-0">
                    <img src="@/assets/img/footer/facebook-logo.svg" alt="Facebook Logo" class="w-5 mx-2.5">
                    <img src="@/assets/img/footer/instagram-logo.svg" alt="Instagram Logo" class="w-5 mx-2.5">
                    <img src="@/assets/img/footer/twitter-logo.svg" alt="Twitter Logo" class="w-5 mx-2.5 mr-0">
                </div>
              </div>
          </nav>
          <div class="border-border-gray-dark border md:mx-2 lg:hidden"></div>
          <nav class="font-bold pt-7.5 lg:pt-0">
              <div class="flex flex-col lg:items-end md:px-2">
                <template v-for="(link, index) in additionalLinks" :key="index">
                    <router-link v-if="link.route" :to="{ name: link.route }" class="my-2 md:my-1 md:first:mt-0 md:last:mb-0" :class="link.offset ? 'hover:text-mid-magenta' : 'hover:text-green'">{{ link.name }}</router-link>
                    <a v-else @click.prevent :href="link.href" target="_blank" class="my-2 md:my-1 md:first:mt-0 md:last:mb-0" :class="link.offset ? 'hover:text-mid-magenta' : 'hover:text-green'">{{ link.name }}</a>
                </template>
              </div>
          </nav>
          <div class="border-border-gray-dark border-t md:mx-2 hidden lg:block my-7.5"></div>
          <div class="mt-15 lg:mt-0 md:px-2 text-base-sm">
            <p>© 2021 Robinhood. All rights reserved.</p>
            <p class="mt-6">Robinhood means Robinhood Markets and its in-application and web experiences with its family of wholly owned subsidiaries which includes Robinhood Financial, Robinhood Securities, and Robinhood Crypto.</p>
            <p class="mt-6">All investments involve risks, including the possible loss of capital.</p>
            <p class="mt-6">Securities trading is offered to self-directed customers by Robinhood Financial. Robinhood Financial is a member of the <span class="text-green">Financial Industry Regulatory Authority (FINRA)</span>.</p>
            <div class="mt-8">
            <DisclosureModal :disclosure="{title: 'Disclosures', button: 'View Important Disclosures', color: 'text-text-gray-light' }">
                <template v-slot:disclosure>
                    <div class="text-black"> 
                    <p class="mt-6">
                        Robinhood means Robinhood Markets and its in-application and web experiences with its family of wholly owned subsidiaries which includes Robinhood Financial, Robinhood Securities, and Robinhood Crypto.
                    </p>
                    <p class="mt-6">
                        All investments involve risks, including the possible loss of capital.
                    </p>
                    <p class="mt-6">
                        Securities trading is offered to self-directed customers by Robinhood Financial. Robinhood Financial is a member of the <span class="text-green">Financial Industry Regulatory Authority (FINRA)</span>.
                    </p>
                    <p class="mt-6">
                        Robinhood Financial LLC is a member of SIPC, which protects securities customers of its members up to $500,000 (including $250,000 for claims for cash). Explanatory brochure available upon request or at <span class="text-green">www.sipc.org</span>.
                    </p>
                    <p class="mt-6">
                        Robinhood Financial is currently registered in the following <span class="text-green">jurisdictions</span>. This is not an offer, solicitation of an offer, or advice to buy or sell securities, or open a brokerage account in any jurisdiction where Robinhood Financial is not registered.
                    </p>
                    <p class="mt-6">
                        Cryptocurrency trading is offered through an account with Robinhood Crypto. Robinhood Crypto is not a member of FINRA or SIPC. Cryptocurrencies are not stocks and your cryptocurrency investments are not protected by either FDIC or SIPC.
                    </p>
                    <p class="mt-6">
                        Investors should be aware that system response, execution price, speed, liquidity, market data, and account access times are affected by many factors, including market volatility, size and type of order, market conditions, system performance, and other factors.
                    </p>
                    </div>
                </template>
            </DisclosureModal>
            </div>
          </div>
      </div>
  </footer>
</template>

<script>
import getFooterLinks from '@/composables/getFooterLinks'
import DisclosureModal from '@/components/home/DisclosureModal'
import NewsletterSignup from '@/components/home/NewsletterSignup'
export default {
    name: 'Footer',
    components: {
        DisclosureModal,
        NewsletterSignup
    },
    setup() {
        const links = getFooterLinks()

        const additionalLinks = 
            [
                {
                    name: 'Check the background of the firm on FINRA’s BrokerCheck',
                    href: '#'
                },
                {
                    name: 'Brokerage Customer Relationship Summary',
                    href: '#'
                },
                {
                    name: 'Robinhood Terms & Conditions',
                    href: '#'
                },
                {
                    name: 'Disclosure Library',
                    route: 'Home'
                },
                {
                    name: 'Privacy',
                    route: 'Home'
                }
            ]

        return { links, additionalLinks }
    }
    
}
</script>

<style>

</style>