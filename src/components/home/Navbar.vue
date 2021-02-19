<template>
  <nav class="flex justify-between items-center px-8 md:px-6 h-16 bg-white fixed inset-x-0 top-0" :class="{ 'shadow-md': !mobileMenuIsActive }">
    <div class="flex items-center">
      <router-link :to="{ name: logo.route }">
        <img :src="require('@/' + logo.src)" :alt="logo.alt" class="w-36"/>
      </router-link>
      <!-- Desktop Menu -->
      <ul id="primary-navigation-desktop" class="hidden lg:flex text-lg">
        <li v-for="(link, index) in links" :key="index" class="ml-12">
          <div v-if="link.submenu.length">
            <button class="focus:outline-none flex items-center hover:text-green cursor-pointer" @click="toggleSubmenu(link)">
              <p>{{ link.top.name }}</p>
              <svg height="7" width="12" class="fill-current ml-3 transform flex items-center translate-y-px" :class="{'rotate-180': link.top.active}"><path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z"></path></svg>
            </button>
          </div>
          <div v-else>
            <router-link :to="{name: link.top.route}" class="hover:text-green">
              {{link.top.name }}
            </router-link>
          </div>
          <div v-show="link.submenu.length && link.top.active" class="absolute top-full inset-x-0 bg-white top-inner-shadow">
            <ul class="submenu-desktop h-16 flex items-center relative pl-12">
              <li v-for="(sublink, index) in link.submenu" :key="index" class="ml-9 first:ml-0 flex items-center" :class="[ sublink.offset ? ['text-magenta', 'hover:text-dark-magenta', 'border-before', 'pl-9'] : ['hover:text-green'] ]">
                <router-link :to="{name: sublink.route}">
                  {{sublink.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="hidden lg:flex items-center">
      <router-link :to="{ name: 'Login' }" class="font-bold hover:text-green">
        Log In
      </router-link>
      <router-link :to="{ name: 'SignUp' }" class="button button-green ml-8">
        Sign Up
      </router-link>
    </div>
      <!-- Mobile Menu -->
    <button id="toggle-mobile-nav" @click="toggleMobileMenu" class="flex flex-col justify-center lg:hidden focus:outline-none">
      <div class="bg-black origin-center transition-all duration-300" :class="{ active: mobileMenuIsActive }"></div>
      <div class="bg-black origin-center transition-all duration-300" :class="{ active: mobileMenuIsActive }"></div>
    </button>
    <div v-show="mobileMenuIsActive" class="fixed inset-x-0 bottom-0 top-16 text-base-sm md:text-lg p-7 lg:hidden overflow-y-scroll bg-white">
      <ul>
        <li v-for="(link, index) in links" :key="index" class="mt-5">
          <div v-if="link.submenu.length">
            <button class="focus:outline-none flex items-center justify-between hover:text-green cursor-pointer w-full bg-light-gray py-3 px-4" @click="toggleSubmenu(link)">
              <p>{{ link.top.name }}</p>
              <svg height="7" width="12" class="fill-current transform flex items-center" :class="{'rotate-180': link.top.active}"><path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z"></path></svg>
            </button>
          </div>
          <div v-else>
            <router-link :to="{name: link.top.route}" class="hover:text-green block w-full bg-light-gray py-3 px-4 text-base-sm md:text-lg">
              {{link.top.name }}
            </router-link>
          </div>
          <div v-show="link.submenu.length && link.top.active">
            <ul class="submenu-mobile pl-7 pb-3">
              <li v-for="(sublink, index) in link.submenu" :key="index" :class="[ sublink.offset ? ['text-magenta', 'hover:text-dark-magenta', 'pt-5', 'border-t', 'border-border-gray', 'relative', 'top-5', 'pb-5'] : ['hover:text-green', 'mt-5'] ]">
                <router-link :to="{name: sublink.route}" class="text-base-sm md:text-lg block">
                  {{sublink.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <div class="h-16"></div>
</template>

<script>
import { onMounted,ref } from 'vue'
import getLinks from '@/composables/getLinks'

export default {
  name: "Navbar",
  props: ["logo"],
  setup() {
    // position submenu
    onMounted(() => {
      const rect = document.getElementById('primary-navigation-desktop').getBoundingClientRect()
      document.getElementsByClassName('submenu-desktop').forEach(element => {
        element.style.left = rect.left + 'px'
      })
    })

    const links = getLinks()
    const mobileMenuIsActive = ref(false)

    const toggleSubmenu = link => {
      links.value.forEach(item => {
        if (item !== link) {
          item.top.active = false
        } else {
          item.top.active = !item.top.active
        }
      })
    }

    const toggleMobileMenu =  () => {
      mobileMenuIsActive.value = !mobileMenuIsActive.value
      links.value.forEach(item => {
          item.top.active = false
      })
      if(mobileMenuIsActive) {
        document.documentElement.style.overflow = 'hidden';
        document.body.scroll = "no";
      } else {
        document.documentElement.style.overflow = 'scroll';
        document.body.scroll = "yes";
      }
    }

    return { toggleSubmenu, links, mobileMenuIsActive, toggleMobileMenu }

  }
};
</script>

<style scoped lang="postcss">

  button#toggle-mobile-nav {
    width: 30px;
    height: 30px;
  }
  #toggle-mobile-nav > div {
    height: 3px;
    width: 30px;
  }
   #toggle-mobile-nav > div:first-child {
    transform: translateY(-5px)
  }
  #toggle-mobile-nav > div:last-child {
    transform: translateY(5px)
  }
  #toggle-mobile-nav > div.active:first-child {
    transform: rotate(-45deg) translateY(1.5px)
  }
  #toggle-mobile-nav > div.active:last-child {
    transform: rotate(45deg) translateY(-1.5px)
  }

  .border-before {
    @apply relative;
  }
  .border-before::before {
      content: '';
      @apply absolute w-px h-5 bg-black left-0 top-1/2 transform -translate-y-1/2;
  }

  .top-inner-shadow {
    box-shadow: inset 0 5px 6px -5px rgba(0,0,0,0.25);
  }
</style>
