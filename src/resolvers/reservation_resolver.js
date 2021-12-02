const reservationResolver = {
    Query: {
        reservationByIdTour: async (_, { tourId }, { dataSources }) => {
            const allReservations = await dataSources.reservationAPI.reservationByTourId(tourId);
            const resevationsExpose = [];
            for(var i=0 in allReservations){
                const datasTour = await dataSources.tourAPI.tourById(tourId);
                const datasTourist = await dataSources.userAPI.getTourist(parseInt(allReservations[i].touristId,10));
                const datasGuide = await dataSources.userAPI.getGuide(datasTour.guide);
                resevationsExpose.push(transforReservation(allReservations[i], datasTour, datasTourist, datasGuide));
            }
            return resevationsExpose;
        },

        reservationByIdTourist: async (_,{ touristId },{ dataSources}) => {
            const allReservations= await dataSources.reservationAPI.reservationByTourisId(touristId);
            const resevationsExpose = [];
            for(var i=0 in allReservations){
                const datasTour = await dataSources.tourAPI.tourById(parseInt(allReservations[i].tourId,10));
                const datasTourist = await dataSources.userAPI.getTourist(touristId);
                const datasGuide = await dataSources.userAPI.getGuide(datasTour.guide);
                resevationsExpose.push(transforReservation(allReservations[i], datasTour, datasTourist, datasGuide));
            }
            return resevationsExpose;
        },

        reservationById: async (_, { reservationId }, { dataSources }) => {
            const datasReservation = await dataSources.reservationAPI.reservationById(reservationId);
            const datasTour = await dataSources.tourAPI.tourById(parseInt(datasReservation.tourId,10));
            const datasTourist = await dataSources.userAPI.getTourist(parseInt(datasReservation.touristId,10));
            const datasGuide = await dataSources.userAPI.getGuide(datasTour.guide);
            return transforReservation(datasReservation, datasTour, datasTourist, datasGuide);
        }

    },
    Mutation: {
        createReservation: async (_, { reservationInput }, { dataSources }) => {
            return await dataSources.reservationAPI.createReservations(reservationInput);
        },

        deleteReservation: async (_, { reservationId }, { dataSources }) => {
            return await dataSources.reservationAPI.deleteReservation(reservationId);
        }
    }
}

function transforReservation(datasReser, datasTour, datasTourist, datasGuide) {
    datasTour.nameGuide = datasGuide.name + " " + datasGuide.surename;
    datasTour.guide = datasGuide.id;
    datasTour.telephone = datasGuide.telephone;

    datasReser.touristdatas={
        id: datasTourist.id,
        name: datasTourist.name,
        surename: datasTourist.surename,
        telephone: datasTourist.telephone,
        nacionality: datasTourist.nacionality
    };
    datasReser.tourdatas=datasTour;
    return datasReser;
}

module.exports = reservationResolver;