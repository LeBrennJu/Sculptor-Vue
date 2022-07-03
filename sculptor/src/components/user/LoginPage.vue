   <template>
        <section class="login-content">

        <h1>Connexion</h1>

        <div v-on:keyup.enter="login" >
            <div class="alertForm">
                <p class="error" v-for="error in Error" v-bind:key="error">{{error}}</p>
            </div>
            <div>E-mail</div>
            <input type="text" name="pseudo" v-model="pseudo"  placeholder="pseudo">
            <div>Mot de passe</div>
            <input type="password" v-model="password" name="password"><br>
            <button v-on:click="login" >Se connecter</button>
        </div> 
    </section>
   </template>

<script>
import UserService from "@/services/UserService";
export default {
    name: "LoginPage",
    data() {
        return {
            Error: [],
            pseudo: null,
            password: null
        };
    },
    methods: {
        async login() {
            this.Error = [];
            console.log("coucou");
            if (!this.pseudo) {
                this.Error.push("Email / pseudo cannot be empty");
            }
            if (!this.password) {
                this.Error.push("Password cannot be empty");
            }
            if (this.Error.length === 0) {
                console.log("LOGIN");
                // Requete Ajax pour connexion utilisateur
                const response = await UserService.login({
                    username: this.pseudo,
                    password: this.password
                });
                if (response.success === true) {
                    // On execute une mutation pour stocker le token dans le sessionStorage
                    // Et le synchroniser avec le store afin de rendre notre store.token reactif
                    this.$store.commit("setToken", response.data.token);
                    sessionStorage.setItem("user", this.pseudo);
                    sessionStorage.setItem("email", response.data.email);
                    sessionStorage.setItem("userId", response.data.id);
                    console.log(response.data);
                    console.log(response.data.id);
                    // On fait une redirection
                    this.$router.push({ name: "home" });
                }
                else {
                    alert(response.message);
                }
            }
        }
    },
}
</script>

<style>

</style>