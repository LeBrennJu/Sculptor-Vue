<template>
    <section class="todoList">
        <div class="addObjectif">
            <input type="text" v-model="objectif" placeholder="Objectif..">        
            <img v-bind:src="addPic" v-on:click="addObjectif" >
        </div>
        <div class="separateBar 1" v-bind:style="'width:75%'"></div>
        <div class="separateBar 2" v-bind:style="'width:50%'"></div>
        <div class="separateBar 3" v-bind:style="'width:25%;margin-bottom: 7%;'"></div>
        <div class="listeObjectif" >

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
        </div>
        <div class="separateBar 3" v-bind:style="'width:25%;margin-top: 10%;'"></div>       
        <div class="separateBar 2" v-bind:style="'width:50%'"></div>
         <div class="separateBar 1" v-bind:style="'width:75%'"></div>
        
        <section class="tacheGestion">

                <div class="archiveTache">
                    <div v-for="tache in tachesArchives" v-bind:key="tache" v-bind:class="'archTache'">
                    <div  v-bind:class="'tache tache'+tache.progression[0]+''">

                         <input type="text" class="taskTitle" v-bind:style="'width:60%'" v-bind:value="tache.title.rendered">

                        <div class="taskInput">
                            
                            
                            <img  v-bind:name="tache.id" v-bind:style="'height: 21px;'" v-bind:src="addPic" v-bind:class="'addPic '+tache.id"  v-on:click="activeObjectif" >
                        </div>
                                
                    </div>
                </div>
                
            </div>
            <div class="borderGestion"><div></div></div>
            <div class="progressionTache">
                <div v-bind:class="'menuTache 0'" v-on:click="routerTache" >Toutes</div>
                <div v-bind:class="'menuTache 1'" v-on:click="routerTache" >Archivée</div>
                <div v-bind:class="'menuTache 2'" v-on:click="routerTache" >Complétée</div>
            </div>
        </section>
 
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
            objectif: null,
            addPic: add,
            taches: null,
            tachesArchives: null,
            delPic: del,
            user: sessionStorage.getItem('user'),
            archiveTab: [],
            gestionTache: 1,
            validatePic: valid
             

        }
    },
    methods: {
        async addObjectif(){
            console.log("add")
            if(this.objectif!=null){
                console.log("pas vide");
                // Envoi de la requete vers l'API
                const response = await ActivityService.add({
                    "title": this.objectif,
                    "author_name": this.user,
                    "status": "publish",
                    "progression": 7

                });
                if(response.code===200){
                console.log("Insertion réussi");
                }
                this.taches = await ActivityService.findAllActive(this.user);
            }
        },
        async modifProgression(e){   
            console.log(e.currentTarget.closest(".progressBarre"))          
                // Envoi de la requete vers l'API
                const response = await ActivityService.patch({
                    "content": e.currentTarget.value,
                    "id": e.currentTarget.name
                });     
                this.taches = await ActivityService.findAllActive(this.user);
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
                this.tachesArchives= await ActivityService.findAllArchive(this.user);

        },
        async activeObjectif(e){

            e.currentTarget.closest(".tache").classList.add("archive")
            const response = await ActivityService.patch({
                    "progression": 7,
                    "id": e.currentTarget.classList[1]
                });
                this.taches = await ActivityService.findAllActive(this.user);

        },
        async routerTache(e){
            const menuArchive=document.getElementsByClassName("menuTache 1")
            const menuComplete=document.getElementsByClassName("menuTache 2")
            const menuToutes=document.getElementsByClassName("menuTache 0")
            console.log(menuArchive[0].classList)
            if(e.currentTarget.textContent=="Archivée"){
                e.currentTarget.classList.toggle("menuActive")
                
                menuComplete[0].classList.remove("menuActive")
               
                menuToutes[0].classList.remove("menuActive")
                 console.log("ici")

                this.tachesArchives= await ActivityService.findAllArchive(this.user);
            }
            if(e.currentTarget.textContent=="Complétée"){

                e.currentTarget.classList.toggle("menuActive")

                menuArchive[0].classList.remove("menuActive")
                menuToutes[0].classList.remove("menuActive")

                this.tachesArchives= await ActivityService.findAllComplete(this.user);
            }
            if(e.currentTarget.textContent=="Toutes"){

                e.currentTarget.classList.toggle("menuActive")

                menuArchive[0].classList.remove("menuActive")
                menuComplete[0].classList.remove("menuActive")

                this.tachesArchives= await ActivityService.findAll(this.user);
            }
        },
        async valideObjectif(e){
            console.log("coucouValide")
            e.currentTarget.closest(".bis").classList.add("archive")
            const response = await ActivityService.patch({
                    "progression": 9,
                    "id": e.currentTarget.classList[1]
                });
                this.tachesArchives= await ActivityService.findAllArchive(this.user);
        }
    },
    async mounted(){
    //Contient le code excuté avant que le composant soit "mounted" https://vuejs.org/assets/lifecycle.16e4c08e.png
    console.log("mounted")
   this.taches = await ActivityService.findAllActive(this.user);
   

  }
    
}
</script>

<style scoped>
.separateBar{
    height: 3px;
    background-color: #f1bf09;
    margin-bottom: 3%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
}
.menuActive{
    background-color: #f1bf09;
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
img:hover{
    filter: brightness(2);
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
.delTache:hover{
    height: 8REM;
}
.borderTask{
    background-color: #f1bf09;
    width: 10%;
    margin-right: 6px;
    border: 1px solid black;
}
.tacheGestion{
    display: flex;
    justify-content: space-around;
    margin: 2%;
    border-radius: 12px;
    padding: 1%;
}
.tacheGestion .tache7  {
    margin-bottom:1px;
    font-size: small;
    margin: 3%;
    font-weight: bold;
}
.tacheGestion .tache8  {
    margin-bottom:1px;
    font-size: small;
    margin: 3%;
    text-decoration: line-through;
}
.tacheGestion .tache9  {
    margin-bottom:1px;
    font-size: small;
    margin: 3%;
    font-weight: bold;
    background-color: #f1bf09;
}
.borderGestion{
    width: 1rem;
    background-color: black;
    border-radius: 14px;
    border: 1px solid #f1bf09;
    display: flex;
    justify-content: center;
}
.borderGestion div{
    width: 2px;
    background-color: #f1bf09;
}
.progressionTache{
    color: white;
    font-style: italic;
}
.archive{
    display: none;
}
.archiveTache{
    width: 70%;
}
.archTache:hover{
 box-shadow: 40px 40px 60px black;
    transition: all .3s;
    transform: scale(1.05) translate3d(4px, 3px, 0);
    z-index: 1;

}
</style>