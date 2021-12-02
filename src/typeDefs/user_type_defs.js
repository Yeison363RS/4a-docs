const {gql}=require('apollo-server');

const userTypeDefs = gql`
    type Tokens{
        refresh:String!
        access:String!
    }
    type Access{
        access:String!
    }
    input CredentialsInput{
        email:String!
        password:String!
    }
    type UserDetail{
        id:Int!
        email:String!
        password:String!
        name:String!
        surename:String!
        telephone:String!
        type_user:String!
    }
    type GuideDetail{
        id:Int!
        email:String!
        password:String!
        name:String!
        surename:String!
        telephone:String!
        type_user:String!
        score:Int!
        name_agency:String!
        description:String!
        facebook:String!
        instagram:String!
    }

    input GuideInput{
        email:String!
        password:String!
        name:String!
        surename:String!
        telephone:String!
        type_user:String!
        score:Int!
        name_agency:String!
        description:String!
        facebook:String!
        instagram:String!
    }

    type TouristDetail{
        id:Int!
        email:String!
        password:String!
        name:String!
        surename:String!
        telephone:String!
        type_user:String!
        placeResidence:String!
        nacionality:String!
    }

    input TouristInput{
        email:String!
        password:String!
        name:String!
        surename:String!
        telephone:String!
        type_user:String!
        placeResidence:String!
        nacionality:String!
    }
    type Mutation{
        signUpGuide(userInput :GuideInput):Tokens!
        signUpTourist(userInput :TouristInput):Tokens!
        logIn(credentials: CredentialsInput!):Tokens!
        refreshToken(refresh: String!):Access!
    }
    type Query{
        userDetailById(userId:Int!):UserDetail!
        guideDetailById(userId:Int!):GuideDetail!
        touristDetailById(userId:Int!):TouristDetail!
    }
    `
    module.exports = userTypeDefs;