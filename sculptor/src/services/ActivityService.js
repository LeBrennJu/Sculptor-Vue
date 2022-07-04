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
    async findAll(userId) {
        try {
            const response = await apiClient.get("/wp/v2/tache?author="+userId+"");
            console.log("/wp/v2/tache?author="+userId+"")
            return response.data;
        } catch(error) {
            return error.response.data
        }
        
    },
    async findAllActive(userId) {
        try {
            const response = await apiClient.get("/wp/v2/tache?progression=7&&author="+userId+"");
            console.log(response)
            return response.data;
        } catch(error) {
            return error.response.data
        }
        
    },
    async findAllArchive(userId) {
        try {
            const response = await apiClient.get("/wp/v2/tache?progression=8&&author="+userId+"");
            
            return response.data;
        } catch(error) {
            return error.response.data
        }
        
    },
    async findAllComplete(userId) {
        try {
            const response = await apiClient.get("/wp/v2/tache?progression=9&&author="+userId+"");
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