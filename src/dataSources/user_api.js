const {RESTDataSource} = require('apollo-datasource-rest');

const serverConfig= require('../server');

class UserAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.user_api_url;
    }

    async createTourist(tourist){
        tourist=new Object(JSON.parse(JSON.stringify(tourist)));
        return await this.post(`/tourist/`, tourist);
    }
    async createGuide(guide){
        guide=new Object(JSON.parse(JSON.stringify(guide)));
        return await this.post(`/guide/`, guide);
    }
    async getUser(userId){
        return await this.get(`/user/${userId}/`);
    }
    async getTourist(userId){
        return await this.get(`/tourist/${userId}/`);
    }
    async getGuide(userId){
        return await this.get(`/guide/${userId}/`);
    }
    async loginUser(credentials){
        credentials = new Object(JSON.parse(JSON.stringify(credentials)));
        return await this.post(`/login/`,credentials);
    }

    async refreshToken(token){
        token = new Object(JSON.parse(JSON.stringify({refresh: token})));
        return await this.post(`/refresh/`,token);
    }
}
module.exports = UserAPI;