   <template>
    <section class="profil">
      <div v-bind:class="'profilFirst'">
        <div v-bind:style="'background-color:unset'" v-if="this.userPic=='femme'"><img v-bind:src="femme" ></div><div v-bind:style="'background-color:unset'" v-if="this.userPic=='homme'" ><img v-bind:src="homme" ></div>
        <div >{{this.user}}</div>
        <div>{{this.email}}</div>
        <div>Inscrit depuis le 03/Juillet/2022</div>
        <div>Musclé de niveau 1 </div>
      </div>
      <div class="profilSecond" v-bind:style="'background-color:unset;border:unset;box-shadow:unset'" >
          <TacheLayout />  
      </div>
      <div class="profilThree" v-bind:style="' background-color:black;'">
          <img v-bind:src="thursdayPic" >
      </div>

      <RouterLink to="/todolist"  class="profilThree" >
          <img v-bind:src="checkli" >
      </RouterLink>

      <div class="profilThree"  v-bind:style="' background-color:black;'" >
          <img v-bind:src="exoPic" >
      </div>

    </section>
   </template>

<script>
import men from "@/assets/images/homme.jpg"
import girl from "@/assets/images/femme.jpg"
import checklist from "@/assets/images/checklist.png"
import courbe from "@/assets/images/courbe.png"
import exercise from "@/assets/images/exercise.png"
import thursday from "@/assets/images/lundi.png"
import ActivityService from "@/services/ActivityService";
import TacheLayout from "../category/TacheLayout.vue";
export default {
    name: "ProfilPage",
    data() {
        return {
            user: sessionStorage.getItem("user"),
            userId: sessionStorage.getItem("userId"),
            email: sessionStorage.getItem("email"),
            userTaches: null,
            userPic: sessionStorage.getItem("userPic"),
            homme: men,
            femme: girl,
            checkli: checklist,
            courbePic: courbe,
            exoPic: exercise,
            thursdayPic: thursday,
            timestamp: null
        };
    },
    async mounted() {
        console.log("profilLoad");
        this.userTaches = await ActivityService.findAll(this.userId);
        
    },
    components: { TacheLayout },
    
      computed: {
                getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
                    this.timestamp = dateTime;
                }
            }
    
}


</script>

<style >
.profil{
  display: flex;  
  flex-wrap: wrap;
  justify-content: center
}
.profilFirst div{
  border-top: 1px solid #fff7e1bf;
  background-color: black;
   border: outset;
   color: white;
   font-weight: bold;
}
.profilFirst img{
      height: 9rem;
    border-radius: 55px;

}
.profilFirst{
  width:50%;
  box-sizing:border-box;
  margin: 2%;
  border-radius: 11px;
  box-shadow: black 1px 14px 23px;
  list-style-type: none;
  text-align: center;
  height: 50%;
      margin-left: 25%;
    margin-right: 25%;
    border: outset;
}
.profilSecond{
  width: 100%;
  box-sizing:border-box;
  border: 1px solid black;
  margin: 2%;
  background-color: beige;
  border-radius: 11px;
  box-shadow: black 1px 14px 23px;
  list-style-type: none;
  text-align: center;
   height: 50%;
}
.profilThree{
  width:28%;
      width: fit-content;
  box-sizing:border-box;
  border: 1px solid black;
  margin: 2%;
  background-color: #f1bf09;;
  border-radius: 11px;
  box-shadow: black 1px 14px 23px;
  list-style-type: none;
  text-align: center;
   height: 50%;
}
.profilThree img{
  height: 8rem;
    width: 6rem;
}
.tache{
    background-color: #fff7e1bf;
    border: 2px solid black;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin: 1%;
    font-weight: bold;
    align-items: center;
    flex-wrap: wrap;
}
::-webkit-scrollbar {
    width: 0;
}




@media (min-width: 640px) {
 
  .profilFirst{
    width: 32%;
    margin:1%
  }
  .profilSecond{
    width: 60%;
    height: 17rem;
    overflow: scroll;
    scrollbar-width: none;
  }
  .profilThree img{
        height: 12rem;
    width: 16rem;
  }
  .profilThree:hover{
      box-shadow: 40px 40px 60px black;
  transition: all .3s;
  transform: scale(1.05) translate3d(-10px, -45px, 0);
  z-index: 1;
  }
  
}
</style>