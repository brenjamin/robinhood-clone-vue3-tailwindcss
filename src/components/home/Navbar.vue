<template>
  <div class="fixed inset-x-0 top-0 z-40" ref="fixedNavWrapper">
    <div
      class="w-full bg-black text-white text-center text-xs lg:text-sm px-1 py-2 z-50"
    >
      ⚠️ Demo Only — This project is a personal portfolio UI clone of Robinhood.
      It is not affiliated with Robinhood, does not enable trading, and does not
      provide financial advice.
    </div>
    <nav
      class="flex justify-between items-center px-8 md:px-6 h-16 bg-white"
      :class="{ 'shadow-md': !mobileMenuIsActive }"
    >
      <div class="flex items-center">
        <router-link :to="{ name: logo.route }">
          <img :src="require('@/' + logo.src)" :alt="logo.alt" class="w-36" />
        </router-link>
        <!-- Desktop Menu -->
        <ul id="primary-navigation-desktop" class="hidden lg:flex text-lg">
          <li v-for="(link, index) in links" :key="index" class="ml-12">
            <div v-if="link.submenu.length">
              <button
                class="focus:outline-none flex items-center hover:text-green cursor-pointer"
                @click="toggleSubmenu(link)"
              >
                <p>{{ link.top.name }}</p>
                <svg
                  height="7"
                  width="12"
                  class="fill-current ml-3 transform flex items-center translate-y-px"
                  :class="{ 'rotate-180': link.top.active }"
                >
                  <path
                    d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div v-else>
              <router-link
                :to="{ name: link.top.route }"
                class="hover:text-green"
              >
                {{ link.top.name }}
              </router-link>
            </div>
            <div
              v-show="link.submenu.length && link.top.active"
              class="absolute top-full inset-x-0 bg-white top-inner-shadow"
            >
              <ul class="submenu-desktop h-16 flex items-center relative pl-12">
                <li
                  v-for="(sublink, index) in link.submenu"
                  :key="index"
                  class="ml-9 first:ml-0 flex items-center"
                  :class="[
                    sublink.offset
                      ? [
                          'text-magenta',
                          'hover:text-dark-magenta',
                          'border-before',
                          'pl-9'
                        ]
                      : ['hover:text-green']
                  ]"
                >
                  <router-link :to="{ name: sublink.route }">
                    {{ sublink.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="hidden lg:flex items-center">
        <router-link
          :to="{ name: 'SampleDashboard' }"
          class="font-bold hover:text-green"
        >
          Sample Dashboard
        </router-link>
        <router-link
          :to="{ name: 'SignupFreeStock' }"
          class="button button-green ml-8"
        >
          Sign Up
        </router-link>
      </div>
      <!-- Mobile Menu -->
      <button
        id="toggle-mobile-nav"
        @click="toggleMobileMenu"
        class="flex flex-col justify-center lg:hidden focus:outline-none"
      >
        <div
          class="bg-black origin-center"
          :class="{ active: mobileMenuIsActive }"
        ></div>
        <div
          class="bg-black origin-center"
          :class="{ active: mobileMenuIsActive }"
        ></div>
      </button>
      <div
        v-show="mobileMenuIsActive"
        class="fixed inset-x-0 bottom-0 top-16 text-base-sm md:text-lg p-7 lg:hidden overflow-y-scroll bg-white"
      >
        <ul>
          <li v-for="(link, index) in links" :key="index" class="mt-5">
            <div v-if="link.submenu.length">
              <button
                class="focus:outline-none flex items-center justify-between hover:text-green cursor-pointer w-full bg-light-gray py-3 px-4"
                @click="toggleSubmenu(link)"
              >
                <p>{{ link.top.name }}</p>
                <svg
                  height="7"
                  width="12"
                  class="fill-current transform flex items-center"
                  :class="{ 'rotate-180': link.top.active }"
                >
                  <path
                    d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z"
                  ></path>
                </svg>
              </button>
            </div>
            <div v-else>
              <router-link
                :to="{ name: link.top.route }"
                class="hover:text-green block w-full bg-light-gray py-3 px-4 text-base-sm md:text-lg"
              >
                {{ link.top.name }}
              </router-link>
            </div>
            <div v-show="link.submenu.length && link.top.active">
              <ul class="submenu-mobile pl-7 pb-3">
                <li
                  v-for="(sublink, index) in link.submenu"
                  :key="index"
                  :class="[
                    sublink.offset
                      ? [
                          'text-magenta',
                          'hover:text-dark-magenta',
                          'pt-5',
                          'border-t',
                          'border-border-gray',
                          'relative',
                          'top-5',
                          'pb-5'
                        ]
                      : ['hover:text-green', 'mt-5']
                  ]"
                >
                  <router-link
                    :to="{ name: sublink.route }"
                    class="text-base-sm md:text-lg block"
                  >
                    {{ sublink.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <div :style="{ height: spacerHeight + 'px' }"></div>
</template>

<script>
import { onMounted, ref, nextTick, onBeforeUnmount } from 'vue'
import getNavLinks from '@/composables/getNavLinks'

export default {
  name: 'Navbar',
  props: ['logo'],
  setup() {
    const links = getNavLinks()
    const mobileMenuIsActive = ref(false)
    const fixedNavWrapper = ref(null)
    const spacerHeight = ref(0)

    // Helper to update spacer height
    const updateSpacerHeight = () => {
      nextTick(() => {
        if (fixedNavWrapper.value) {
          spacerHeight.value = fixedNavWrapper.value.offsetHeight
        }
      })
    }

    // position desktop submenus
    onMounted(() => {
      const rect = document
        .getElementById('primary-navigation-desktop')
        .getBoundingClientRect()
      Array.from(document.getElementsByClassName('submenu-desktop')).forEach(
        element => {
          element.style.left = rect.left + 'px'
        }
      )
      updateSpacerHeight()
      window.addEventListener('resize', updateSpacerHeight)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateSpacerHeight)
    })

    const toggleSubmenu = link => {
      links.value.forEach(item => {
        if (item !== link) {
          item.top.active = false
        } else {
          item.top.active = !item.top.active
        }
      })
      updateSpacerHeight()
    }

    const toggleMobileMenu = () => {
      mobileMenuIsActive.value = !mobileMenuIsActive.value
      links.value.forEach(item => {
        item.top.active = false
      })
      if (mobileMenuIsActive.value) {
        document.documentElement.style.overflow = 'hidden'
        document.body.scroll = 'no'
      } else {
        document.documentElement.style.overflow = 'scroll'
        document.body.scroll = 'yes'
      }
      updateSpacerHeight()
    }

    return {
      toggleSubmenu,
      links,
      mobileMenuIsActive,
      toggleMobileMenu,
      fixedNavWrapper,
      spacerHeight
    }
  }
}
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
  transform: translateY(-5px);
}
#toggle-mobile-nav > div:last-child {
  transform: translateY(5px);
}
#toggle-mobile-nav > div.active:first-child {
  transform: rotate(-45deg) translateY(1.6px);
}
#toggle-mobile-nav > div.active:last-child {
  transform: rotate(45deg) translateY(-1.6px);
}

.border-before {
  @apply relative;
}
.border-before::before {
  content: '';
  @apply absolute w-px h-5 bg-black left-0 top-1/2 transform -translate-y-1/2;
}

.top-inner-shadow {
  box-shadow: inset 0 5px 6px -5px rgba(0, 0, 0, 0.25);
}
</style>
