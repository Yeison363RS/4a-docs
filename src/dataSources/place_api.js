const {RESTDataSource} = require('apollo-datasource-rest');

const serverConfig= require('../server');

class PlaceAPI extends RESTDataSource{
	constructor(){
        super();
        this.baseURL = serverConfig.place_api_url;
    }
    async createPlaces(place){
        place=new Object(JSON.parse(JSON.stringify(place)));
        return await this.post('/c_place/',place);
    }

    async placesById(idPlace){
        return await this.get(`/place/${idPlace}/`);
    }

    async getAllPlaces(){
        return await this.get('/all_places/');
    }
}
module.exports = PlaceAPI;
