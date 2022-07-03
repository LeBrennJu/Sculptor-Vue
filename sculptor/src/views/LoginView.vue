<template>
  <main>
    <HeaderLayout />
    <LoginPage v-on:newComment="updateComments" />
    <FooterLayout />    
  </main>
</template>

<script >
import LoginPage from '@/components/user/LoginPage.vue'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'
export default {
  components: { 
    HeaderLayout, 
    FooterLayout, 
    LoginPage 
    },
  name: "LoginView",
    methods: {
        updateComments() {
            console.log('MISE A JOUR DES COMMENTAIRES');
        }
    },
    
}
</script>