const {gql}=require('apollo-server');

const tourTypeDefs = gql `
    type Guide{
        id:Int!
        name:String!
        surename:String!
        telephone:String!
    }
    type Place{
        name:String!
    }
    type Confirmation{
        confirm:Boolean!
    }
    type Tour{
        id:Int!
        title: String! 
        costo: Int!
        description: String!
        typeTour: String!
        guide:Guide!
        place:Place
    }
    input TourInput{
        title: String! 
        costo: Int!
        description: String!
        typeTour: String!
        place: Int!
        guide: Int!
    }

    extend type Mutation{
        createTour(tourInput: TourInput): Confirmation!
    }
    extend type Query{
        tourById(tourId:Int!): Tour
        allTours: [Tour]
    }
    `;
    module.exports=tourTypeDefs;