const reservationResolver={
    Query:{
        reservationByIdTour:async(__,{tourId},{dataSources})=>{
            allReservations: await dataSources.reservationByIdTour(tourId);
            const resevationsExpose=[];
            for (var datasResevation in allReservations) {
                datasReservation: await dataSources.reservationAPI.reservationById(reservationId);
                datasTour: await dataSources.tourAPI.tourById(datasReservation.tourId);
                datasTourist: await dataSources.userAPI.getTourist(datasReservation.touristId);
                datasGuide:await dataSources.userAPI.getGuide(datasTour.guide);
                resevationsExpose.push(transforReservation(datasReservation,datasTour,DatasTourist,datasGuide)); 
            }
            return resevationsExpose;
        },

        reservationByIdTouriste:async(__,{touristId},{dataSources})=>{
            allReservations: await dataSources.reservationByIdTourist(tourId);
            const resevationsExpose=[];
            for (var datasResevation in allReservations) {
                datasReservation: await dataSources.reservationAPI.reservationById(reservationId);
                datasTour: await dataSources.tourAPI.tourById(datasReservation.tourId);
                datasTourist: await dataSources.userAPI.getTourist(datasReservation.touristId);
                datasGuide:await dataSources.userAPI.getGuide(datasTour.guide);
                resevationsExpose.push(transforReservation(datasReservation,datasTour,DatasTourist,datasGuide)); 
            }
            return resevationsExpose;
        },

        reservationById:async(__,{reservationId},{dataSources})=>{
            datasReservation: await dataSources.reservationAPI.reservationById(reservationId);
            datasTour: await dataSources.tourAPI.tourById(datasReservation.tourId);
            datasTourist: await dataSources.userAPI.getTourist(datasReservation.touristId);
            datasGuide:await dataSources.userAPI.getGuide(datasTour.guide);
            return transforReservation(datasReservation,datasTour,DatasTourist,datasGuide);   
        }

    },
    Mutation:{
        createReservation: async(_,{reservationInput},{dataSources})=>{
            return await dataSources.reservationAPI.createReservation(reservationInput);
        },

        deleteReservation:async(_,{reservationId},{dataSources})=>{
            return await dataSources.reservationAPI.deleteReservation(reservationId);
        }
    }
}

function transforReservation(datasReser,datasTour,DatasTourist,datasGuide) {
    const datasTouristExpose = {
        id:datasTourist.id,
        name:datasTourist.name,
        surename:datasTourist.surename,
        telephone:datasTourist.telephone,
        nacionality:datasTourist.nacionality
    }    
    datasTour.nameGuide=datasGuide.name+" "+datasGuide.surename;
    datasTour.guide=datasGuide.id;
    datasTour.telephone=datasGuide.telephone;

    datasReser.push(datasTouristExpose);
    datasReser.push(datasTour);
    return datasReser;
}

module.exports= reservationResolver;