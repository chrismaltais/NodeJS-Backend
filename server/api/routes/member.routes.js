const Router = require('express').Router

module.exports = (controller) => {
    const memberAPI = Router();
    const { member } = controller;

    // Note, these routes should just return status codes, heavy lifting of logic is done in the controller!
    memberAPI.get('/members', (req, res) => {
        member
            .getAllMembers().then((members) => {
                res.status(200).send(members); // members object is structured the way we want it in controller!
            }, (err) => {
                res.status(400).send(err);
        });
    });

    return memberAPI;
}