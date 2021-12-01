const tourResolver={
    Query:{
        tourById: async(_,{tourId},{dataSources})=>{
            datasTour = (await dataSources.tourAPI.tourById(tourId));
            datasGuide = (await dataSources.userAPI.getGuide(datasTour.guide));
            datasPlace= (await dataSources.placeAPI.placeById(datasTour.place));
            return transforTour(datasTour,datasGuide,datasPlace);
        },

        allTours: async(_,{dataSources})=>{
            datasTours = (await dataSources.tourAPI.allTours());
            datasToursExpose=[]
            for (var datasTour in datasTours) {
                datasGuide = (await dataSources.userAPI.getGuide(datasTour.guide));
                datasPlace= (await dataSources.placeAPI.placeById(datasTour.place));
                datasToursExpose.push(transforTour(datasTour,datasGuide,datasPlace))
            }
            return datasToursExpose;
        }            
    },

    Mutation:{
        createTour:async(_,{tourInput},{dataSources})=>{
            return await dataSources.tourAPI.createTours(tourInput);
        },
    }
}

function transforTour(datasTour,datasGuide,datasPlace){
    datasTour.guide = {
        id:datasGuide.id,
        name:datasGuide.name,
        surename:datasGuide.surename,
        telephone:datasGuide.telephone 
    }
    datasTour.place = {
        id:datasPlace.id,
        name:datasPlace.namePlace 
    }
    return datasTour;
}
module.exports= tourResolver;