   <template>
        <section class="login-content">

            <h1>Créer un compte</h1>

            <div >
                <div>
                    <p class="error" v-for="error in errors" v-bind:key="error">{{error}}</p>
                    <p class="confirm" v-for="conf in confirm" v-bind:key="conf">{{conf}}</p>
                </div>
                <div>Prénom</div>
                <input type="text" name="firstname" v-model="firstname" placeholder="John">

                <div>Nom</div>
                <input type="text" name="lastname" v-model="lastname" placeholder="Doe">

                <div>E-mail</div>
                <input type="email" name="email" v-model="email" placeholder="johndoe@ocooking.local">

                <div>Identifiant</div>
                <input type="text" name="identifiant" v-model="pseudo" placeholder="John">

                <div>Mot de passe</div>
                <input type="password" name="password" v-model="password" placeholder="">

                <div>Confirmation du mot de passe</div>
                <input type="password" name="confPassword" v-model="confPassword" placeholder="">
                
                
                <button v-on:click="sendForm" type="submit">S'inscrire</button>
            </div>
        </section>
   </template>

<script>
import UserService from "@/services/UserService";
export default {
    name: "RegisterPage",
    data() {
        return {
            confirm: [],
            errors: [],
            email: null,
            firstname: null,
            lastname: null,
            pseudo: null,
            password: null,
            confPassword: null,
            role: "contributeur"
        }
    },
    methods: {
        async sendForm() {
            this.confirm = [];
            this.errors = [];
            // Validation du contenu du formulaire
            if(!this.email) {
                this.errors.push("Email cannot be empty");
            }
            if(!this.firstname) {
                this.errors.push("Firstname cannot be empty");
            }
            if(!this.lastname) {
                this.errors.push("Lastname cannot be empty");
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
                    "role": this.role,
                    "firstname": this.firstname,
                    "lastname": this.lastname
                });
                if(response.code===200){
                this.confirm.push("Inscription réussi");
            }
            }
            
            // Reception de la réponse et affichage
        }
    }
}
</script>