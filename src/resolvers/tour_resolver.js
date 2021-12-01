const tourResolver={
    Query:{
        tourById: (_,{tourId},{dataSources})=>{
            return dataSources.tourAPI.tourById(tourId);
        },
        allTours: (_,{dataSources})=>{
            return dataSources.tourAPI.allTours();
        }            
    },
    Mutation:{
        createTour:async(_,{tourInput},{dataSources})=>{
            return await dataSources.tourAPI.createTours(tourInput);
        },
    }
}
module.exports= tourResolver;