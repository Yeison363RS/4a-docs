const {RESTDataSource} = require('apollo-datasource-rest');

const serverConfig= require('../server');

class ReservationAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL = serverConfig.reservation_api_url;
    }
    async createReservations(reservation){
        reservation=new Object(JSON.parse(JSON.stringify(reservation)));
        return await this.post('/c_reservation/',reservation);
    }

    async reservationById(idReservation){
        return await this.post(`/reservation/${idReservation}`);
    }
    async reservationByTourId(idTour){
        return await this.post(`/reservationsTour/${idTour}`);
    }
    async reservationByTourisId(idTourist){
        return await this.post(`/reservationsT/${idTourist}`);
    }
    async deleteReservation(idReservation){
        return await this.post(`/deleteR/${idReservation}`);
    }
}

module.exports = ReservationAPI;