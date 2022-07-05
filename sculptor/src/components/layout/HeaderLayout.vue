<template>
  <header>

    <div>
      <div class="logoHeader">
      <img v-bind:src="logo" style="height: 4rem;">
      </div>
    </div>

    <div>
      <div class="titreHeader">
        <h1><strong>Sculptor</strong></h1>
        <p>Stay Fit !</p>
      </div>
    </div>
    
    <div>
      <div class="profilUser" v-if="this.$store.getters.getToken && this.userPic=='femme'"><RouterLink to="/profil" v-bind:src="femme" alt="Admin" class="rounded-circle headerProfil" width="150"><img v-bind:src="femme" alt="Admin" class="rounded-circle headerProfil" width="150"></RouterLink>
        {{user}}
        <input v-if="this.$store.getters.getToken" v-on:click="disconnect" type="button" value="X">
      </div>

      <div class="profilUser" v-if="this.$store.getters.getToken && this.userPic=='homme'"><RouterLink to="/profil" v-bind:src="homme" alt="Admin" class="rounded-circle headerProfil" width="150"><img v-bind:src="homme" alt="Admin" class="rounded-circle headerProfil" width="150"></RouterLink>
        {{user}}
        <input v-if="this.$store.getters.getToken" v-on:click="disconnect" type="button" value="X">
      </div>
    </div>
    
  </header>
</template>

<script>
import men from "@/assets/images/homme.jpg"
import girl from "@/assets/images/femme.jpg"
import sculptor from "@/assets/images/sculptor.png"
export default {
    name: "HeaderLayout",
    data() {
        return {
            logo: sculptor,
            user: sessionStorage.getItem('user'),
            userPic: sessionStorage.getItem('userPic'),
            homme: men,
            femme: girl,
        }
    },
    methods: {
        disconnect() {
          console.log("sa passe")
            // On supprime le token
            this.$store.commit('deleteToken');
             console.log("sa passe tjr")
            // On redirige l'utilisateur
            this.$router.push({name: 'login'});
        }
    },
}
</script>

<style scoped>

</style>
