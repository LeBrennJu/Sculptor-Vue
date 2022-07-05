<template>
    <section class="todoList">
    

            <div v-for="tache in taches" v-bind:key="tache"   v-bind:class="'archTache'" >
            <div  v-bind:class="'bis '+tache.id" v-bind:style="'background-color:unset;border:unset'">
            
                <div  v-bind:class="'tache '+tache.id"  >

                    <input type="text" class="taskTitle" v-bind:style="'width:60%'" v-bind:value="tache.title.rendered">
                      

                    <div class="taskInput">
                        <div v-bind:style="'width:25%;box-sizing: border-box;'"><input v-on:keyup="modifProgression" type="number"  min="1" max="100" v-bind:name="tache.id" v-bind:value="tache.content.rendered" ></div>
                         <div v-bind:style="'width:25%;box-sizing: border-box;'"><img  v-bind:name="tache.id"  v-bind:src="addPic" v-bind:class="'addPic '+tache.id"  v-on:click="archiveObjectif" ></div>
                         <div v-bind:style="'width:25%;box-sizing: border-box;'"><img  v-bind:name="tache.id"  v-bind:src="validatePic" v-bind:class="'addPic '+tache.id"  v-on:click="valideObjectif" ></div>
                        <div v-bind:style="'width:25%;box-sizing: border-box;'"><img v-bind:name="tache.id" v-on:click="delObjectif"  v-bind:src="delPic"></div>
                    </div>

                              
                </div>

                <div  v-bind:style="'width:' +tache.content.rendered*0.75 + '%'"  class="progressBarre"></div>
            </div>
</div>
       

    </section>
</template>

<script>
import add from "@/assets/images/add.svg"
import del from "@/assets/images/del.svg"
import valid from "@/assets/images/validate.svg"
import ActivityService from "@/services/ActivityService";
export default {
    name: "TodolistPage",
    data(){
        return {
            addPic: add,
            taches: null,
            tachesArchives: null,
            delPic: del,
            user: sessionStorage.getItem('user'),
            userId: sessionStorage.getItem('userId'),
            validatePic: valid
             

        }
    },
    methods: {
        async modifProgression(e){   
            console.log(e.currentTarget.closest(".progressBarre"))          
                // Envoi de la requete vers l'API
                const response = await ActivityService.patch({
                    "content": e.currentTarget.value,
                    "id": e.currentTarget.name
                });     
        },
        async delObjectif(e){
             const response = await ActivityService.del({
                    "id": e.currentTarget.name
                });

        },
        async archiveObjectif(e){
           e.currentTarget.closest(".bis").classList.add("archive")
            const response = await ActivityService.patch({
                    "progression": 8,
                    "id": e.currentTarget.classList[1]
                });

        },
        async activeObjectif(e){

            e.currentTarget.closest(".tache").classList.add("archive")
            const response = await ActivityService.patch({
                    "progression": 7,
                    "id": e.currentTarget.classList[1]
                });

        },
        async valideObjectif(e){
            e.currentTarget.closest(".bis").classList.add("archive")
            const response = await ActivityService.patch({
                    "progression": 9,
                    "id": e.currentTarget.classList[1]
                });
        }
    },
    async mounted(){
   this.taches= await ActivityService.findAll(this.userId);

  }
    
}
</script>

<style scoped>
.todoList{
    height: auto;
}
.menuTache:hover{
    box-shadow: 40px 40px 60px black;
    transition: all .3s;
    transform: scale(1.05) translate3d(4px, 3px, 0);
    z-index: 1;
    filter: brightness(1.1);
}
.menuTache{
    border: 1px solid black;
    transform: scaleY(1.5);
    margin-bottom: 18%;
    border-radius: 3px;
    text-align: center;
}
.addObjectif img{
    height: 2rem;
    margin: 2%;
}
.listeObjectif.delPic{
    height: 2rem;
    margin: 2%;
}
.tache{
    background-color: #fff7e1bf;
    border: 2px solid black;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
    width: 95%;
    margin-left: 1%;
    font-weight: bold;
    align-items: center;
    flex-wrap: wrap;
}
.addPic{
    height: 100%;
    width: 100%;
}
.progressBarre{
       height: 5px;
    background-color: #f1bf09;
    margin-bottom: 1%;
    border-radius: 229px;
    margin-left: 3%;
    border: 1px solid black;
}
.tache input{
    width: 100%;
    background-color: white;
    font-weight: bold;
    border-radius: 8px;
    margin-right: 5%;
    
}
.taskInput{
    width: 35%;
    padding-left: 1%;
    font-size: x-small;
    display: flex;
    justify-content: space-between;
}
.archTache:hover{
 box-shadow: 40px 40px 60px black;
    transition: all .3s;
    transform: scale(1.05) translate3d(4px, 3px, 0);
    z-index: 1;

}
@media (max-width: 640px) {    
    .todolist{
      width: 100%;
      margin-left: 4%;
    }
  }
</style>