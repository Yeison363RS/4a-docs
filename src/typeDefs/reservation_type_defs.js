const {gql}=require('apollo-server');

const reservationTypeDefs = gql `
	type Tourist_Reservation{
		id:Int!
		name:String!
		surename:String!
		telephone:String!
		nacionality:String!
	}

	type Tour_Reservation{
		id:Int!
		title:String!
		costo:Int!
		description:String!
		typeTour:String!
		guide:Int!
		nameGuide:String!
		telephone:String!
	}

	type ReservationDetail{
		id:String!
		numberHours:Int!
		time:String!
		touristId:String!
		tourId:String!
		touristdatas:Tourist_Reservation
		tourdatas:Tour_Reservation
	}
	type Confirmation{
        confirm:Boolean!
    }
	input ReservationInput{
		numberHours:Int!
		tourId:String!
		touristId:String!
		time:String!
	}
	extend type Mutation{
        createReservation(reservationInput: ReservationInput): ReservationDetail!
        deleteReservation(reservationId: String!): String!
    }
    extend type Query{
        reservationByIdGuide(guideId: Int!): [ReservationDetail!]
        reservationByIdTourist(touristId: Int!): [ReservationDetail!]
        reservationById(reservationId: String!): ReservationDetail!
    }
	`
    module.exports=reservationTypeDefs;