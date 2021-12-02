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
    type TourDetail{
        id:Int!
        title: String! 
        costo: Int!
        description: String!
        typeTour: String!
        guide:Int!
        place:Int!
        guidedatas:Guide
        placedatas:Place
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
        createTour(tourInput: TourInput!): Confirmation!
    }
    extend type Query{
        tourById(tourId:Int!): TourDetail
        allTours(tourId:Int!): [TourDetail]
    }
    `;
    module.exports=tourTypeDefs;