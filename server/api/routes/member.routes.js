const Router = require('express').Router
const {ObjectId} = require('mongodb');

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

    memberAPI.get('/members/:id', (req, res) => {
        let id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send({
                error: 'ObjectId is not valid'
            });
        }

        member
            .getMember(id).then((member) => {
                res.status(200).send(member);
            }, (err) => {
                res.status(404).send(err);
            })
    });

    memberAPI.post("/members", (req, res) => {
        member
            .createMember(req.body).then((member) => {
                res.status(201).send(member);
            }, (err) => {
                res.status(400).send(err);
            });
    });

    memberAPI.delete("/members/:id", (req, res) => {
        let id = req.params.id; // Grab ID
        if (!ObjectId.isValid(id)) { // Check if valid id, throw 404 if not
            return res.status(400).send({
                error: "ObjectId is not valid"
            });
        }

        member.deleteMember(id).then((deletedMember) => { // delete the member and return deleted: true
            res.status(200).send(deletedMember);
        }, (err) => {
            res.status(404).send(err)
        });
    })

    return memberAPI;
}