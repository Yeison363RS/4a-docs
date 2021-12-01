const {RESTDataSource} = require('apollo-datasource-rest');

const serverConfig= require('../server');

class PlaceAPI extends RESTDataSource{
	constructor(){
        super();
        this.baseURL = serverConfig.place_api_url;
    }
    async createPlace(place){
        place=new Object(JSON.parse(JSON.stringify(place)));
        return await this.post('/c_place/',place);
    }

    async placeById(idPlace){
        return await this.post(`/place/${idPlace}`);
    }

    async allPlaces(){
        return await this.post('/all_places/');
    }
}
