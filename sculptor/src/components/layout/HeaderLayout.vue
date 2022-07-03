<template>
  <header>
    <div class="logoHeader"><img v-bind:src="logo" style="height: 4rem;"></div>
    <div class="titreHeader">
      <h1><strong>Sculptor</strong></h1>
      <p>Stay Fit !</p>
    </div>
    
    <div class="profilUser" v-if="this.$store.getters.getToken"><img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle headerProfil" width="150">
    {{user}}
    <input v-if="this.$store.getters.getToken" v-on:click="disconnect" type="button" value="X">
    </div>
  </header>
</template>

<script>
import sculptor from "@/assets/images/sculptor.png"
export default {
    name: "HeaderLayout",
    data() {
        return {
            logo: sculptor,
            user: sessionStorage.getItem('user'),
        }
    },
    methods: {
        disconnect() {
            // On supprime le token
            this.$store.commit('deleteToken');
            // On redirige l'utilisateur
            this.$router.push({name: 'login'});
        }
    },
}
</script>

<style scoped>

</style>
