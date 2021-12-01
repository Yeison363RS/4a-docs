const placeResolver={
    Query:{
        placeById: (_,{placeId},{dataSources})=>{
            return dataSources.tourAPI.placeById(placeId);
        },
        allPlaces: (_,{dataSources})=>{
            return dataSources.tourAPI.allPlaces();
        }            
    },
    Mutation:{
        createPlace:async(_,{placeInput},{dataSources})=>{
            return await dataSources.tourAPI.createPlace(placeInput);
        },
    }
}
module.exports= placeResolver;