<template>
<main>
  <section class="presentHome">
    <h2>Bienvenue sur <strong>Sculptor</strong></h2>
    <div>
      <strong>Sculptor</strong> est une application destinée aux sportifs permettant de se creer un programme personnalisé, de suivre ca progression au quotidien et de voir votre évolution.
    </div>
  </section>

  <section class="homeSection">
     

    <a class="homePic2" href=""><img v-bind:src="exoPic" ></a>

    <RouterLink v-if="this.$store.getters.getToken" class="homePic" to="/todolist" href=""><img  v-bind:src="checkli" ></RouterLink>
     <RouterLink v-if="!this.$store.getters.getToken" class="homePic" to="/login" href=""><img  v-bind:src="checkli" ></RouterLink>
    <a class="homePic"  href=""><img class="courbePic" v-bind:src="courbePic" ></a>

    <a class="homePic2" href=""><img v-bind:src="thursdayPic" ></a>    

  </section>
</main>
</template>

<script >
import { RouterLink} from 'vue-router'
import checklist from "@/assets/images/checklist.png"
import courbe from "@/assets/images/courbe.png"
import exercise from "@/assets/images/exercise.png"
import thursday from "@/assets/images/lundi.png"
export default {
  name: "HomePage",  
    data() {
        return {
            checkli: checklist,
            courbePic: courbe,
            exoPic: exercise,
            thursdayPic: thursday,
        }
    },
    methods: {
    },
}
</script>

<style>

</style>
