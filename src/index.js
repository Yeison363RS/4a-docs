const {ApolloServer}=require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const TourAPI = require('./dataSources/tour_api');
const UserAPI = require('./dataSources/user_api');
const PlaceAPI = require('./dataSources/place_api');
const ReservationAPI = require('./dataSources/reservation_api');
const authentication = require('./utils/authentication');

const server = new ApolloServer({
    context: authentication,
    typeDefs,
    resolvers,
    dataSources: () => ({
        userAPI : new UserAPI(),
        tourAPI : new TourAPI(),
        placeAPI : new PlaceAPI,
        reservationAPI: new ReservationAPI
    }),
    introspection:true,
    playground:true
});
server.listen(process.env.PORT || 4000).then(({url}) =>{
    console.log(`Server ready at ${url}`);
});