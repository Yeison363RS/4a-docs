const {RESTDataSource} = require('apollo-datasource-rest');

const serverConfig= require('../server');

class TourAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.tour_api_url;
    }
    async createTours(tour){
        tour=new Object(JSON.parse(JSON.stringify(tour)));
        return await this.post('/c_tour/',tour);
    }

    async tourById(idTour){
        return await this.post(`/tour/${idTour}`);
    }

    async allTours(){
        return await this.post('/all_tours/');
    }
}

module.exports = TourAPI;