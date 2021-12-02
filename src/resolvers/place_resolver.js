const placesResolver={
    Query:{
        placeById: (_,{placeId},{dataSources})=>
            dataSources.placeAPI.placesById(placeId),
        allPlaces: (_,{userId},{dataSources})=>
            dataSources.placeAPI.getAllPlaces(),
       
    },
    Mutation:{
        createPlace:async(_,{placeInput},{dataSources})=>{
            return await dataSources.placeAPI.createPlaces(placeInput);
        },
    }
}
module.exports= placesResolver;