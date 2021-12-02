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
        return await this.get(`/reservation/${idReservation}/`);
    }
    async reservationByTourId(idTour){
        return await this.get(`/reservationsTour/${idTour}/`);
    }
    async reservationByTourisId(idTourist){
        return await this.get(`/reservationsT/${idTourist}/`);
    }
    async deleteReservation(reservationId){
        return await this.delete(`/deleteR/${reservationId}/`);
    }
}

module.exports = ReservationAPI;