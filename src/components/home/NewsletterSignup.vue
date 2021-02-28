<template>
    <img src="@/assets/img/footer/robinhood-snacks-logo.svg" alt="robinhood snacks logo">
    <p class="text-text-gray-light font-normal mt-3">The 3-minute newsletter with fresh takes on the financial news you need to start your day.</p>
    <form @submit.prevent class="mb-15 lg:mb-0">
        <div class="lg:bg-dark-bg-gray h-16 rounded-full lg:flex lg:items-center mt-3 lg:justify-between md:w-3/5 lg:w-full lg:pr-3">
            <input type="email" placeholder="name@email.com" required class="bg-dark-bg-gray pl-9 rounded-full h-16 lg:h-7.5 focus:outline-none w-full lg:w-auto">
            <button type="submit" class="button button-light-green text-black focus:outline-none mt-3 lg:mt-0 w-full lg:w-auto">Subscribe</button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'NewsletterSignup'
}
</script>

<style>

</style>