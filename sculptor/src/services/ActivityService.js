import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://sculptor.local/wp-json',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Cette syntaxe permet d'effectuer une requete qui necessite d'etre connecté
        //Authorization: 'Bearer ' + sessionStorage.getItem('token') + ''

    },
    timeout: 10000
});

export default {
    /*--------------------TACHES------------------*/ 
    async findAll(user) {
        try {
            console.log(user)
            const response = await apiClient.get("/wp/v2/tache?author_name="+user+"");
            console.log("/wp/v2/tache?progression=8&&author_name="+user+"")
            return response.data;
        } catch(error) {
            return error.response.data
        }
        
    },
    async findAllActive(user) {
        try {
            const response = await apiClient.get("/wp/v2/tache?progression=7&&author_name="+user+"");
            console.log(response)
            return response.data;
        } catch(error) {
            return error.response.data
        }
        
    },
    async findAllArchive(user) {
        try {
            const response = await apiClient.get("/wp/v2/tache?progression=8&&author_name="+user+"");
            console.log(response)
            return response.data;
        } catch(error) {
            return error.response.data
        }
        
    },
    async findAllComplete(user) {
        try {
            const response = await apiClient.get("/wp/v2/tache?progression=9&&author_name="+user+"");
            console.log(response)
            return response.data;
        } catch(error) {
            return error.response.data
        }
        
    },
    async add(params) {
        try {
            // On passe le token de connexion
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.post("/wp/v2/tache", params);
            return response.data;
        } catch(error) {
            return error.response.data
        }        
    },
     async patch(params) {
        try {
            // On passe le token de connexion
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.post("/wp/v2/tache/"+ params.id+ "", params);
            return response.data;
        } catch(error) {
            return error.response.data
        }        
    },
    async del(params) {
        console.log(params.id)
        try {
            // On passe le token de connexion
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token') + '';
            const response = await apiClient.delete("/wp/v2/tache/"+ params.id+ "");
            return response.data;
        } catch(error) {
            return error.response.data
        }        
    },

}