const reservationResolver = {
    Query: {
        reservationByIdGuide: async (_, { guideId }, { dataSources }) => {
            const allGuideTours = await getAllTours(dataSources, guideId);
            let allReservations = null;
            for (var i = 0 in allGuideTours) {
                const reservationsTour = await dataSources.reservationAPI.reservationByTourId(allGuideTours[i].id.toString());
                    let reservationsAux = null;
                    if (allReservations != null) {
                        reservationsAux = allReservations.concat(reservationsTour);
                        allReservations = reservationsAux;
                    } else {
                        allReservations = reservationsTour;
                    }
            }
            const resevationsExpose = [];
            const datasGuide = await dataSources.userAPI.getGuide(guideId);
            for (var i = 0 in allReservations) {
                const datasTour = await dataSources.tourAPI.tourById(parseInt(allReservations[i].tourId, 10));
                const datasTourist = await dataSources.userAPI.getTourist(parseInt(allReservations[i].touristId, 10));
                resevationsExpose.push(transforReservation(allReservations[i], datasTour, datasTourist, datasGuide));
            }
            return resevationsExpose;
        },

        reservationByIdTourist: async (_, { touristId }, { dataSources }) => {
            const allReservations = await dataSources.reservationAPI.reservationByTourisId(touristId);
            const resevationsExpose = [];
            for (var i = 0 in allReservations) {
                const datasTour = await dataSources.tourAPI.tourById(parseInt(allReservations[i].tourId, 10));
                const datasTourist = await dataSources.userAPI.getTourist(touristId);
                const datasGuide = await dataSources.userAPI.getGuide(datasTour.guide);
                resevationsExpose.push(transforReservation(allReservations[i], datasTour, datasTourist, datasGuide));
            }
            return resevationsExpose;
        },

        reservationById: async (_, { reservationId }, { dataSources }) => {
            const datasReservation = await dataSources.reservationAPI.reservationById(reservationId);
            const datasTour = await dataSources.tourAPI.tourById(parseInt(datasReservation.tourId, 10));
            const datasTourist = await dataSources.userAPI.getTourist(parseInt(datasReservation.touristId, 10));
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
async function getAllTours(dataSources, guideId) {
    const datasTours = (await dataSources.tourAPI.allTours(1));
    const datasToursGuide = [];
    for (var i = 0 in datasTours) {
        if (datasTours[i].guide === guideId) {
            datasToursGuide.push(datasTours[i]);
        }
    }
    return datasToursGuide;
}
function transforReservation(datasReser, datasTour, datasTourist, datasGuide) {
    datasTour.nameGuide = datasGuide.name + " " + datasGuide.surename;
    datasTour.guide = datasGuide.id;
    datasTour.telephone = datasGuide.telephone;

    datasReser.touristdatas = {
        id: datasTourist.id,
        name: datasTourist.name,
        surename: datasTourist.surename,
        telephone: datasTourist.telephone,
        nacionality: datasTourist.nacionality
    };
    datasReser.tourdatas = datasTour;
    return datasReser;
}

module.exports = reservationResolver;