<template>
  <main>
    <HeaderLayout />
    <RegisterPage />
    <FooterLayout />    
  </main>
</template>

<script >
import RegisterPage from '@/components/user/RegisterPage.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'
export default {
  components: { 
    HeaderLayout, 
    FooterLayout, 
    RegisterPage 
    },
  name: "RegisterView",
   
    
}
</script>