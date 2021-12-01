const tourResolver = require('./tour_resolver');
const userResolver = require('./user_resolver');
const placeResolver = require('./place_resolver');
const reservationResolver = require('./reservation_resolver');
const lodash = require('lodash');

const resolvers = lodash.merge(tourResolver,userResolver,placeResolver,reservationResolver);
module.exports = resolvers;
