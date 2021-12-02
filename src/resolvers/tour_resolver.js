const tourResolver={
    Query:{
        tourById: async(_,{tourId},{dataSources})=>{
            const datasTour = (await dataSources.tourAPI.tourById(tourId));
            const datasGuide = (await dataSources.userAPI.getGuide(datasTour.guide));
            const datasPlace= (await dataSources.placeAPI.placesById(datasTour.place));
            return transforTour(datasTour,datasGuide,datasPlace);
        },
        allTours: async(_,{tourId},{dataSources})=>{
            const datasTours = (await dataSources.tourAPI.allTours(tourId));
            const datasToursExpose=[];
            for(var i=0 in datasTours){
                const datasGuide = (await dataSources.userAPI.getGuide(datasTours[i].guide));
                const datasPlace= (await dataSources.placeAPI.placesById(datasTours[i].place));
                datasToursExpose.push(await transforTour(datasTours[i],datasGuide,datasPlace));
            }; 
            return datasTours;
        }            
    },

    Mutation:{
        createTour:async(_,{tourInput},{dataSources})=>{
            return await dataSources.tourAPI.createTours(tourInput);
        },
    },

   
}
function  transforTour(datasTour,datasGuide,datasPlace){
    delete datasTour.guide;
    datasTour.guidedatas = {
        id:datasGuide.id,
        name:datasGuide.name,
        surename:datasGuide.surename,
        telephone:datasGuide.telephone 
    };
    delete datasTour.guide;
    datasTour.placedatas = {
        id:datasPlace.id,
        name:datasPlace.namePlace 
    };
    return datasTour;
}
module.exports= tourResolver;