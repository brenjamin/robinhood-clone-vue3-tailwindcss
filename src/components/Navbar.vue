<template>
  <nav class="flex justify-between items-center px-6 py-4 shadow-md bg-white relative">
    <div class="flex items-center">
      <router-link :to="{ name: logo.route }">
        <img :src="require('@/' + logo.src)" :alt="logo.alt" class="w-36"/>
      </router-link>
      <!-- Desktop Menu -->
      <ul id="primary-navigation-desktop" class="hidden lg:flex text-lg">
        <li v-for="(link, index) in linkArr" :key="index" class="ml-12">
          <div v-if="link.submenu.length">
            <button class="focus:outline-none" @click="toggleMenu(link)">
              {{ link.top.name }}
            </button>
          </div>
          <div v-else>
            <router-link :to="{name: link.top.route}">
              {{link.top.name }}
            </router-link>
          </div>
          <div v-show="link.submenu.length && link.top.active" class="absolute top-full inset-x-0">
            <ul class="submenu py-5 flex relative pl-12">
              <li v-for="(sublink, index) in link.submenu" :key="index" class="ml-9 first:ml-0">
                <router-link :to="{name: sublink.route}">
                  {{sublink.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <!-- Mobile Menu -->

    </div>
  </nav>
</template>

<script>
import { onMounted, watch, ref, toRefs } from 'vue'
export default {
  name: "Navbar",
  props: ["logo", "links"],
  setup(props) {
    // console.log(props.links)
    
    // position submenu
    onMounted(() => {
      const rect = document.getElementById('primary-navigation-desktop').getBoundingClientRect()
      document.getElementsByClassName('submenu').forEach(element => {
        element.style.left = rect.left + 'px'
      })
    })
    const linkArr = ref(props.links)
    watch(() => linkArr, (first, second) => {
      console.log(
        "Watch props.selected function called with args:",
        first,
        second
      );
    });

    const toggleMenu = (link => {
      linkArr.value.forEach(item => {
        if (item !== link) {
          item.top.active = false
        } else {
          item.top.active = !item.top.active
        }
        
      })
      console.log(linkArr.value)
    })

    console.log(linkArr.value)

    return { toggleMenu, linkArr }


    
  }
};
</script>
