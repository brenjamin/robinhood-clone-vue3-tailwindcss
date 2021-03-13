<template>
    <nav class="flex justify-between items-center px-8 md:px-6 h-16 bg-white z-40">
        <div class="flex items-center">
        <router-link :to="{ name: 'Home' }">
            <img src="@/assets/img/robinhood-logo.svg" alt="robinhood logo" class="w-36"/>
        </router-link>
        </div>
    </nav>
    <div class="banner bg-neon-green border-b border-black absolute w-full -z-1"></div>
    <section>
        <div class="container">
            <div class="bg-white rounded-xl shadow-lg mx-auto relative py-8 px-6 md:max-w-md lg:max-w-lg mt-20 md:mt-24 mb-13.5 lg:py-12 lg:px-18">
                <h2 class="text-center">Hi there!</h2>
                <h3 class="text-center mt-3 pb-4">Your free stock referral from robinhood is waiting for you. You could get…</h3>
                <div v-if="loading" class="my-6">
                    <div class="h-40 w-30 mx-auto rounded-xl shimmer"></div>
                    <div class="mt-3 w-30 h-6 rounded-full mx-auto shimmer"></div>
                </div>
                <RotatingCards v-else :stocks="updatedStockCards" />
                <div class="text-center">
                    <router-link :to="{ name: 'Signup' }" class="button button-green mx-auto">Claim your free stock now</router-link>
                </div>
            </div>
            <ul class="md:max-w-lg lg:max-w-xl mx-auto">
                <li class="star-bullet">
                    <p class="font-bold">100% chance of getting a free stock</p>
                    <p class="mt-2 md:mt-1">When you sign up and link your bank account, a surprise stock appears in your account. Certain limitations apply. <span class="text-green">Learn More</span></p>
                </li>
                <li class="star-bullet">
                    <p class="font-bold">No money needed</p>
                    <p class="mt-2 md:mt-1">You don't need any money in your account to get your free stock.</p>
                </li>
                <li class="star-bullet">
                    <p class="font-bold">You could get up to ${{ maxPrice }}</p>
                    <p class="mt-2 md:mt-1">You have a 1 in 150 chance of getting
                        <span v-for="(stock, index) in updatedStockCards" :key="index">{{stock.name}} (${{stock.latestPrice}})<span v-if="index !== updatedStockCards.length - 1">, <span v-if="index === updatedStockCards.length - 2">or </span></span></span>.
                     </p>
                </li>
                <li class="star-bullet">
                    <p class="font-bold">You could get Ford Motor, GE, or Antero Midstream</p>
                    <p class="mt-2 md:mt-1">You have a 1 in 150 chance of getting Ford Motor, GE, or Antero Midstream.</p>
                </li>
                <li class="star-bullet">
                    <p class="font-bold">Start building your portfolio</p>
                    <p class="mt-2 md:mt-1">Keep in mind 98% of awarded stocks will have a value of $10 or less. Let us help you get started with your financial future.</p>
                </li>
            </ul>
            <div class="md:max-w-lg lg:max-w-xl mx-auto">
                <div class="bg-light-gray rounded-lg py-4 px-6 md:py-6 md:px-12 my-9">
                    Member of SIPC. Securities in your account protected up to $500,000. For details, please see <span class="text-green">www.sipc.org</span>.
                </div>
                <div class="text-base-xs md:text-base-sm text-text-gray leading-relaxed">
                    <p class="px-6 md:px-12 my-4 md:my-6">Important information:<br>Prices displayed on the page as of {{ formattedDate }} and subject to change.</p>
                    <p class="px-6 md:px-12 my-4 md:my-6">Some restrictions may apply, visit <span class="text-green">rbnhd.co/freestock-terms</span> to learn more.</p>
                    <p class="px-6 md:px-12 my-4 md:my-6">While Robinhood attempts to offer the ability to link or fund a customer’s account with as many financial institutions as possible, we cannot support the customer’s ability to link their Robinhood account with all financial institutions.</p>
                    <p class="px-6 md:px-12 my-4 md:my-6">All investments involve risk, including the possible loss of principal. Neither receipt of a share of stock through this program nor identification of a particular security in communications related to this program constitutes a solicitation of the security or a recommendation to buy, sell, or hold the security. Robinhood Financial does not provide investment advice and does not hereby recommend any security or transaction. Securities trading offered through Robinhood Financial LLC, member SIPC and FINRA.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import RotatingCards from '@/components/auth/RotatingCards'
import getStockSandbox from '@/composables/getStockSandbox'
import { ref } from 'vue'
import date from 'date-and-time'
export default {
    name: 'SignupFreeStock',
    components: {
        RotatingCards
    },
    setup() {
        const stockCards = ref([
            {
                name: 'Visa',
                odds: '1 in 400',
                symbol: 'V',
                img: {
                    src: 'assets/img/auth/green-card.svg'
                },
                bgColor: 'bg-light-green'
            },
            {
                name: 'Johnson & Johnson',
                odds: '1 in 400',
                symbol: 'JNJ',
                shorthand: 'JNJ',
                img: {
                    src: 'assets/img/auth/blue-card.svg'
                },
                bgColor: 'bg-blue'
            },
            {
                name: 'Apple',
                odds: '1 in 400',
                symbol: 'AAPL',
                img: {
                    src: 'assets/img/auth/red-card.svg'
                },
                bgColor: 'bg-red'
            }
        ])

        const prices = ref([])
        const maxPrice = ref(0)
        const updatedStockCards = ref([])
        const loading = ref(true)
        const formattedDate = ref(null)

        const loadStockData = async () => {
            for (const stock of stockCards.value) {
                let { data, error } = await getStockSandbox('/stock/' + stock.symbol + '/quote/latestPrice', true)
                updatedStockCards.value.push({...stock, latestPrice: data.value.toFixed(2), error: error.value })
                prices.value.push(parseFloat(data.value.toFixed(2)))
            }
            const now = new Date()
            formattedDate.value = date.format(now, 'MM/DD/YYYY hh:mm A [GMT]Z')
        }

        const calculateMaxPrice = async () => {
            await loadStockData()

            maxPrice.value = prices.value.reduce((a,b) => {
                return Math.max(a, b)
            })
            maxPrice.value = maxPrice.value.toFixed(2)

            loading.value = false
        }

        calculateMaxPrice()

        

        return { stockCards, updatedStockCards, maxPrice, loading, formattedDate }
        
    }
}
</script>

<style scoped lang="postcss">
    .banner {
        @apply bg-no-repeat bg-cover;
        min-height: 300px;
        max-height: 500px;
        height: 25%;
        background-image: url('~@/assets/img/auth/join-us-background.svg');
        background-position-y: -80px;
        background-position-x: center;
    }
    .star-bullet {
        @apply relative mt-6 first:mt-0 pl-8 md:pl-12 md:pr-4;
    }
    .star-bullet::before {
        content: '';
        @apply w-6 h-6 bg-contain absolute left-0 -top-px md:top-0.5;
        background-image: url('~@/assets/img/auth/star-bullet.svg');
        background-size: 24 24px;
    }

    .shimmer {
        animation : shimmer 4s infinite linear;
        background-image: linear-gradient(to right, #f2f2f2 0%, #E8E8E8 50%, #f2f2f2 100%);
        background-size: 250px 100%;
    }

    @keyframes shimmer {
        0% {
            background-position: -500px 0;
        }
        100% {
            background-position: 500px 0;
        }
    }
</style>