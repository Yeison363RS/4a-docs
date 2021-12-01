const userTypeDefs=require('./user_type_defs');
const tourTypeDefs=require('./tour_type_defs');
const placeTypeDefs=require('./place_type_defs');
const reservationTypeDefs=require('./reservation_type_defs');

const schemasArrays=[tourTypeDefs, userTypeDefs, placeTypeDefs, reservationTypeDefs];
module.exports = schemasArrays;