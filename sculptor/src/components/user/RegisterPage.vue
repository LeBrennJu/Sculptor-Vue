   <template>
        <section class="register-content">

            <h1>Créer un compte</h1>

            <div >
                <div>
                    <p class="error" v-for="error in errors" v-bind:key="error">{{error}}</p>
                    <p class="confirm" v-for="conf in confirm" v-bind:key="conf">{{conf}}</p>
                </div>

                <div>E-mail</div>
                <input type="email" name="email" v-model="email" placeholder="johndoe@ocooking.local">

                <div>Identifiant</div>
                <input type="text" name="identifiant" v-model="pseudo" placeholder="John">

                <div>Mot de passe</div>
                <input type="password" name="password" v-model="password" placeholder="">

                <div>Confirmation du mot de passe</div>
                <input type="password" name="confPassword" v-model="confPassword" placeholder="">
              

                <fieldset>
                    <div>
                    <input v-model="imgProfilGars" type="checkbox" id="homme" name="homme" >
                    <label for="homme"><a class="registerPic"  href=""><img class="homme" v-bind:src="hommePic" ></a></label>
                    </div>

                    <div>
                    <input v-model="imgProfilFille" type="checkbox" id="femme" name="femme">
                    <label for="femme">  <a class="registerPic"  href=""><img class="femme" v-bind:src="femmePic" ></a></label>
                    </div>
                </fieldset>
                
                
                
                <button v-on:click="sendForm" type="submit">S'inscrire</button>
            </div>
        </section>
   </template>

<script>
import men from "@/assets/images/homme.jpg"
import girl from "@/assets/images/femme.jpg"
import UserService from "@/services/UserService";
export default {
    name: "RegisterPage",
    data() {
        return {
            confirm: [],
            errors: [],
            email: null,
            pseudo: null,
            password: null,
            confPassword: null,
            hommePic: men,
            femmePic: girl,
            imgProfilGars: null,
            imgProfilFille: null,
            finalPic: null
        }
    },
    methods: {
        async sendForm(e) {
            this.confirm = [];
            this.errors = [];
            
            if(this.imgProfilFille==true){
                console.log("fille")
                this.finalPic="femme"
            }
            if(this.imgProfilGars==true){
                console.log("garcon")
                this.finalPic="homme"
            }
            // Validation du contenu du formulaire
            if(!this.email) {
                this.errors.push("Email cannot be empty");
            }
            if(!this.pseudo) {
                this.errors.push("Pseudo cannot be empty");
            }
            if(!this.password) {
                this.errors.push("Password cannot be empty");
            } else {
                if(this.password !== this.confPassword) {
                    this.errors.push("The two passwords are not the same");
                }
            }
            if(this.errors.length === 0) {
                // Envoi de la requete vers l'API
                const response = await UserService.register({
                    "pseudo": this.pseudo,
                    "email": this.email,
                    "password": this.password,
                    "role": "admin",
                    "firstname": "femme",
                    "lastname": "femme",
                    "role": "muscle",
            
                });
                if(response.code===200){
                this.confirm.push("Inscription réussi");
                 this.$router.push({name: 'login'});
            }
            }
            // // Reception de la réponse et affichage
        }
    }
}
</script>
<style>
fieldset{
    display: flex;
    justify-content: space-around;
}
.homme, .femme{
    height: 7rem;
    border-radius: 100px;
    width: 6rem;
    margin-top: 10%;
    border: 1px solid black;
}
section.register-content {
    text-align: center;
    border: 1px solid black;
    padding: 1%;
    width: fit-content;
    margin: auto;
    background-color: #fff7e1bf;
    margin-top: 2%;
    border-radius: 6px;
}
.register-content div{
    font-weight: bold;
}
.register-content input{
    font-weight: bold;
    border: unset;
    border-radius: 8px;
}
</style>