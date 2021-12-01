const {gql}=require('apollo-server');

const reservationTypeDefs = gql `
	type Tourist{
		id:Int!
		name:String!
		surename:String!
		telephone:String!
		nacionality:String!
	}

	type Tour{
		id:Int!
		title:String!
		costo:Int!
		descripcion:String!
		typeTour:String!
		guide:Int!
		nameGuide:String!
		telephone:String!
	}

	type ReservationDetail{
		id:String!
		name:String!
		numberHours:Int!
		time:String!
		tourist:Tourist!
		tour:Tour!
	}
	type Confirmation{
        confirm:Boolean!
    }
	input ReservationInput{
		numberHours:Int!
		tourId:Int!
		tourId:Int!
		time:String!
	}
	extend type Mutation{
        createReservation(reservationInput: ReservationInput): Confirmation!
        deleteReservation(idReservation:Int!): Confirmation!
    }
    extend type Query{
        reservationByIdTour(tourId:Int!): [ReservationDetail!]
        reservationByIdTourist(touristId:Int!): [ReservationDetail!]
        reservationById(reservationId:Int!): ReservationDetail!
    }
	`;
    module.exports=reservationTypeDefs;