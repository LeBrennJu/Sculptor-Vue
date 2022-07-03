<template>
  <main>
    <HeaderLayout />
    <ProfilPage />
    <FooterLayout />    
  </main>
</template>

<script >
import ProfilPage from '@/components/user/ProfilPage.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'
export default {
  components: { 
    HeaderLayout, 
    FooterLayout, 
    ProfilPage 
    },
  name: "ProfilView",
   
    
}
</script>