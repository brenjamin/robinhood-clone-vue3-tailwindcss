<template>
  <div class="bg-black p-4 text-white flex justify-between items-center fixed bottom-0 inset-x-0 z-30 lg:hidden border-t border-border-gray-dark box-content">
    <div class="flex items-center">
        <img src="@/assets/img/app-banner/robinhood-icon.svg" alt="Robinhood app icon">
        <div class="ml-4 flex flex-col item-start">
            <span class="font-bold leading-normal ">Robinhood</span>
            <img src="@/assets/img/app-banner/stars.svg" alt="5 stars" class="-ml-0.5">
            <span class="text-border-gray-dark text-xxs md:text-base-xs leading-normal mt-px">(935K)</span>
        </div>
    </div>
    <div>
        <button class="button-dark-green font-bold rounded-full">Get the app</button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'DownloadAppBanner'

}
</script>

<style>

</style>