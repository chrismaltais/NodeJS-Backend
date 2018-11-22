// Sets up environments
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const port = process.env.PORT || 3000;

const IS_TEST = process.env.ENV === "test";

// Use object destructuring otherwise would need to do Member.Member

// If in testing environment, database is will be connected in memory 
if (!IS_TEST) {
    let {mongoose} = require('./db/mongoose');
}
 
let {Member} = require('./models/members');
let {Project} = require('./models/projects');

// Require local folders
let api = require('./api');
let controllers = require('./controllers');

let app = express();

//Return value of bodyParser.json() is a function, which is a middleware we need to give to express
app.use(bodyParser.json());

// All API routes & logic are done through this line
// Done so far:
// GET /members
app.use('/api/', api(controllers));

app.post('/members', (req, res) => {
    let member = new Member({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    member.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
});

// app.get('/members', (req, res) => {
//     Member.find().then((members) => {
//         res.send({
//             members, // This is what your object will be called!
//             message: 'This is a test!'
//         })
//     }, (err) => {
//         res.status(400).send(err);
//     });
// });

// app.get('/members/:id', (req, res) => {
//     let id = req.params.id;

//     if (!ObjectId.isValid(id)) {
//         res.status(404).send({
//             error: 'ObjectId is not valid'
//         });
//     }

//     Member.findById(id).then((member) => {
//         if (!member) {
//             return res.status(404).send({error: 'Member not found'});
//         }
//         res.status(200).send({member}); // Object name returned is 'member'
//     }).catch((err) => {
//         res.status(400).send(); // Send needs to be blank, why?
//     });
// });

app.delete('/members/:id', (req, res) => {
    let id = req.params.id;
     
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({
            error: 'Invalid Object Id'
        });
    }

    Member.findByIdAndDelete(id).then((member) => {
        if (!member) {
            return res.status(404).send({error: 'Member not found in database!'});
        }
        res.status(200).send({member, deleted: true});
    }).catch((err) => res.status(400).send());
});

app.patch('/members/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['bio', 'photo']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send({
            error: 'Invalid Object ID'
        });
    }

    body.bio = req.body.bio;
    body.photo = req.body.photo;

    Member.findByIdAndUpdate(id, {$set: body}, {new: true}).then((member) => {
        if (!member) {
            return res.status(404).send({
                error: 'Member not found!'
            })
        }
        res.status(200).send({member});
    }).catch((e) => res.status(400).send());
});

if (process.env.ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

module.exports = {app};