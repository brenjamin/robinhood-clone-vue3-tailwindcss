<template>
  <div class="md:flex h-screen px-6 md:px-0">
    <div class="hidden md:block md:w-1/2 relative">
      <img src="@/assets/img/login-page-image.jpg" alt="people using the robinhood app" class="h-full w-full object-cover object-center">
    </div>
    <div class="mt-16 max-w-md mx-auto md:w-1/2 md:flex md:items-center md:mx-13 md:mt-0">
    <form @submit.prevent class="w-full text-base-xs">
      <p class="font-medium text-xxl">Welcome to Robinhood</p>
      <label class="mt-5 block">
        <span class="block">Email</span>
        <div class="mt-3.5 rounded border transition-colors overflow-visible duration-200 border-border-gray focus-within:border-green leading-none">
          <input type="email" class="px-3" v-model="email" required>
        </div>
      </label>
      <label class="mt-3 block">
        <span class="block">Password</span>
        <div class="mt-3.5 relative rounded border transition-colors overflow-visible duration-200 border-border-gray focus-within:border-green leading-none">
          <input class="px-3 pr-8" :type="inputType" v-model="password" required>
          <button @click.prevent="handleClick" class="w-6 h-6 flex items-center justify-center hover:bg-light-gray rounded absolute right-2 transform top-1/2 -translate-y-1/2 transition-colors duration-200">
            <svg v-if="inputType === 'password'" class="fill-current" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M13.7189 1.87793L1.77466 13.8222L2.83532 14.8829L5.62216 12.096C6.32268 12.3193 7.11305 12.4545 8 12.4545C13.0909 12.4545 15 8 15 8C15 8 14.3036 6.37498 12.6303 5.08792L14.7796 2.93859L13.7189 1.87793ZM10.1793 7.53893L7.53888 10.1793C7.68769 10.2108 7.84194 10.2273 7.99998 10.2273C9.22816 10.2273 10.2273 9.22821 10.2273 8.00002C10.2273 7.84198 10.2107 7.68774 10.1793 7.53893Z" fill-rule="evenodd"></path><path d="M5.79437 7.68884C5.9319 6.70915 6.70911 5.93195 7.68879 5.79441L9.7493 3.73391C9.21349 3.61393 8.6312 3.54546 8 3.54546C2.90909 3.54546 1 8 1 8C1 8 1.57432 9.34009 2.93298 10.5502L5.79437 7.68884Z"></path></svg>
            <svg v-else class="fill-current" height="16" role="img" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M1 7.99996C1 7.99996 2.90909 3.54541 8 3.54541C13.0909 3.54541 15 7.99996 15 7.99996C15 7.99996 13.0909 12.4545 8 12.4545C2.90909 12.4545 1 7.99996 1 7.99996ZM5.77254 8.00002C5.77254 9.2282 6.77163 10.2273 7.99982 10.2273C9.228 10.2273 10.2271 9.2282 10.2271 8.00002C10.2271 6.77184 9.228 5.77275 7.99982 5.77275C6.77163 5.77275 5.77254 6.77184 5.77254 8.00002Z" fill-rule="evenodd"></path></svg>
          </button>
        </div>
      </label>
      <router-link :to="{ name: 'Login' }" class="block text-green font-medium text-base-xs mt-3.5">Forgot your username or password?</router-link>
      <div class="mt-24">
        <button type="submit" class="button-login">
          Sign In
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Login',
  setup() {
    const inputType = ref('password')
    const email = ref('')
    const password = ref('')

    const handleClick = () => {
      inputType.value = inputType.value === 'password' ? 'text' : 'password'
    }

    const handleSubmit = () => {

    }


    return { email, password, inputType, handleSubmit, handleClick }
  }

}
</script>

<style scoped lang="postcss">
  input {
    @apply block w-full py-2 rounded focus:outline-none;
  }
</style>