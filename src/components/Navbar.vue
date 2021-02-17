<template>
  <nav class="flex justify-between items-center px-6 py-4 shadow-md">
    <div>
      <router-link :to="{ name: logo.route }">
      <img :src="require('@/' + logo.src)" :alt="logo.alt" />
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: ["logo"],
};
</script>

<style></style>
