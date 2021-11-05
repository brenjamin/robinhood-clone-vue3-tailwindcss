<template>
  <router-view/>
</template>

<style lang="postcss">
#app, button, a, h2 {
  font-family: 'Capsule Sans Text', Helvetica, Arial, sans-serif;
  letter-spacing: -0.1px;
}

@screen md {
  button, a, p, h2 {
    letter-spacing: -0.25px;
  }
  #app, button, a {
    @apply text-lg;
  }
}

@font-face {
  font-display: swap;
  font-family: 'Capsule Sans Text';
  font-style: normal;
  font-weight: 400;
  src: url(./assets/fonts/CapsuleSansText-Book.woff2) format('woff2'), url(https://cdn.robinhood.com/assets/robinhood/brand/_next/static/fonts/CapsuleSansText-Book__ece4dfe7c8753c6ed9e4ede8ad811074.woff2) format('woff2'),url(https://cdn.robinhood.com/assets/robinhood/brand/_next/static/fonts/CapsuleSansText-Book__8ba279fa6846f41bb21912578ff1ea58.woff) format('woff');
}

@font-face {
  font-display: swap;
  font-family: 'Capsule Sans Text';
  font-style: normal;
  font-weight: 500;
  src: url(./assets/fonts/CapsuleSansText-Medium.woff2) format('woff2'), url(https://cdn.robinhood.com/assets/robinhood/brand/_next/static/fonts/CapsuleSansText-Medium__8b42e3fc6d1d161d6fbd7487babe6cfe.woff2) format('woff2'),url(https://cdn.robinhood.com/assets/robinhood/brand/_next/static/fonts/CapsuleSansText-Medium__eae2cabcf8266bed9e324af939bcfa6b.woff) format('woff');
}

@font-face {
  font-display: swap;
  font-family: 'Capsule Sans Text';
  font-style: normal;
  font-weight: 700;
  src: url(./assets/fonts/CapsuleSansText-Bold.woff2) format('woff2'), url(https://cdn.robinhood.com/assets/robinhood/brand/_next/static/fonts/CapsuleSansText-Bold__f31b2ecb2f8e039d53bd75d5314229c7.woff2) format('woff2'),url(https://cdn.robinhood.com/assets/robinhood/brand/_next/static/fonts/CapsuleSansText-Bold__ba3ebea0939580614269729932955862.woff) format('woff');
}
</style>
