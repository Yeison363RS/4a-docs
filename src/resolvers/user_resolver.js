const usersResolver = {
    Query:{
        userDetailById:(_,{userId},{dataSources,userIdToken})=>{
            if(userId==userIdToken)
                return dataSources.userAPI.getUser(userId)
            else
                return null
        },
        guideDetailById:(_,{userId},{dataSources,userIdToken})=>
            dataSources.userAPI.getGuide(userId),
        touristDetailById:(_,{userId},{dataSources,userIdToken})=>{
            if(userId==userIdToken)
                return dataSources.userAPI.getTourist(userId)
            else
                return null
        }
    },
    Mutation:{
        signUpGuide:async(_,{userInput},{dataSources})=>{
            return await dataSources.userAPI.createGuide(userInput);
        },
        signUpTourist:async(_,{userInput},{dataSources})=>{
            return await dataSources.userAPI.createTourist(userInput);
        },
        logIn:(_,{credentials},{dataSources})=>
            dataSources.userAPI.loginUser(credentials),
        refreshToken:(_,{refresh},{dataSources})=>
            dataSources.userAPI.refreshToken(refresh),
    }
};
module.exports = usersResolver;