const {gql}=require('apollo-server');

const tourTypeDefs = gql `
	
	type PlaceDetail{
		id:Int!
		namePlace:String!	
	}
	input PlaceInput{
		namePlace:String!
	}

	type Confirmation{
        confirm:Boolean!
    }

	extend type Mutation{
        createPlace(placeInput: PlaceInput): Confirmation!
    }
    extend type Query{
        placeById(placeId:Int!): PlaceDetail!
        allPlaces: [PlaceDetail]
    }
	`
