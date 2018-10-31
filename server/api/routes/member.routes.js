const Router = require('express').Router

module.exports = (controller) => {
    const memberAPI = Router();
    const { member } = controller;

    memberAPI.get('/members', (req, res) => {
        member
            .getAllMembers().then((members) => {
            res.send({
                members, // This is what your object will be called!
                message: 'This is a test!'
            })
        }, (err) => {
            res.status(400).send(err);
        });
    });

    return memberAPI;
}