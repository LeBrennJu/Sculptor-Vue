

<template>
  <footer>
      <RouterLink class="footerLink" to="/">Accueil</RouterLink>
      <RouterLink class="footerLink" v-if="!this.$store.getters.getToken" to="/login">Connexion</RouterLink>
      <RouterLink class="footerLink" v-if="!this.$store.getters.getToken" to="/register">Inscription</RouterLink>
      <RouterLink class="footerLink" v-if="this.$store.getters.getToken" to="/profil">Profil</RouterLink>
  </footer>
</template>

<script >
import { RouterLink} from 'vue-router'
export default {
    name: "FooterLayout",
        
}
</script>

<style scoped>

</style>
