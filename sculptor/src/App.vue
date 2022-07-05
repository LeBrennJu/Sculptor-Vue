<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <RouterView />
</template>

<style>
@import '@/assets/base.css';

@font-face {
  font-family: Montserrat;
  src: url("@/assets/fonts/Montserrat-Regular.ttf");
}

@font-face {
  font-family: Montserrat Black;
  src: url("@/assets/fonts/Montserrat-Black.2cab11ae.ttf");
}

@font-face {
  font-family: Montserrat Bold;
  src: url("@/assets/fonts/Montserrat-Bold.fc0d0bf0.ttf");
}

@font-face {
  font-family: Montserrat Italic;
  src: url("@/assets/fonts/Montserrat-Italic.38cce7ad.ttf");
}
</style>
