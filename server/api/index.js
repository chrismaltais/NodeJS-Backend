const Router = require('express').Router;
const memberRoutes = require('./routes/member.routes');

module.exports = (controller) => {
    const api = Router();

    // member routes
    api.use('/', memberRoutes(controller));
    return api; // why?
}