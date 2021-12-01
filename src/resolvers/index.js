const tourResolver = require('./tour_resolver');
const userResolver = require('./user_resolver');
const lodash = require('lodash');

const resolvers = lodash.merge(tourResolver,userResolver);
module.exports = resolvers;
