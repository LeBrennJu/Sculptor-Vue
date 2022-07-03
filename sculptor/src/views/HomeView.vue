

<template>
  <main>
    <HeaderLayout />
    <HomePage />
    <FooterLayout />    
  </main>
</template>

<script >
import HomePage from '@/components/HomePage.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'
export default {
  components: { 
    HeaderLayout, 
    FooterLayout, 
    HomePage 
    },
  name: "HomeView",
   
    
}
</script>
