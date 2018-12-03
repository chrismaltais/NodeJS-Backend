const request = require('supertest');
const _ = require('lodash');
const {ObjectId} = require('mongodb');

const {appTest} = require('./config/mock-api');
const {Member} = require('./../models/members');

console.log(global.__MONGO_URI__);

/*let testMembers = [{
    _id: new ObjectId(),
    name: 'Jeff Jeffy',
    email: 'jeff.jeffy@queensu.ca',
    password: 'pass123',
    bio: null
}, {
    _id: new ObjectId(),
    name: 'Joe Budden',
    email: 'joe.budden@queensu.ca',
    password: 'pass123',
    bio: null
}];

*/

describe('POST /members', () => {
    it('should create a new member', async() => {
        // Mock Data
        let testMember = {
            name: 'Chris Maltais',
            email: 'chris.maltais@queensu.ca',
            password: 'pass123'
        };
        //Supertest!!
        const response = await appTest
            .post('/api/members')
            .send(testMember)
            .expect(201)
        
        let memberFromAPI = response.body;
        expect(memberFromAPI.name).toBe(testMember.name);
        expect(memberFromAPI.email).toBe(testMember.email);
          
        const dbSearch = await Member.find({_id: memberFromAPI._id}).then((members) => {
            expect(members.length).toBe(1); 
            expect(members[0].name).toBe(testMember.name);
            expect(members[0].email).toBe(testMember.email);
            expect(members[0].password).toBe(testMember.password);
        });
    });

    it('should not create member with invalid body data', async() => {
        let response = await appTest
            .post('/api/members')
            .send()
            .expect(400)
        
        const dbValidate = await Member.find().then((members) => {
            expect(members.length).toBe(2);
        });
    });
}); 

// GET /api/members
describe('GET /api/members', () => {
    it('should get all members', async () => {
        const response = await appTest
            .get('/api/members')
            .expect(200)

        membersFromDB = await Member.find({}); // Should be 2 members
        membersFromAPI = response.body;
        
        membersFromDB.forEach((member, i) => {
            let memberFromDBID = member._id.toHexString();
            expect(memberFromDBID).toEqual(membersFromAPI[i]._id);
            expect(member.email).toEqual(membersFromAPI[i].email);
        })
    });
});

describe('GET /api/members/:id', () => {
    it('should have the same ObjectID', async() => {
        const memberFromDB = await Member.findOne({});
        expect(typeof memberFromDB._id).toBe('object');
        const memberFromDBID = memberFromDB._id.toHexString();

        const response = await appTest
            .get(`/api/members/${memberFromDBID}`)
            .expect(200)
        
        let memberFromAPI = response.body;

        expect(memberFromDBID).toBe(memberFromAPI._id);
    });

    it('should return member document', async () => {
        const memberFromDB = await Member.findOne({});
        const memberFromDBID = memberFromDB._id.toHexString();
        const response = await appTest
            .get(`/api/members/${memberFromDBID}`)
            .expect(200)
        
        let memberFromAPI = response.body;
        expect(memberFromDB.name).toBe(memberFromAPI.name);
        expect(memberFromDB.email).toBe(memberFromAPI.email);
    });

    it('should return 404 if member not found', async() => {
        // Make sure you get 404 back
        let fakeID = new ObjectId();
        let response = await appTest
            .get(`/api/members/${fakeID.toHexString()}`)
            .expect(404)
    });

    it('should return 400 for non-object ids', (done) => {
        // /todos/123
        appTest
            .get('/api/members/123')
            .expect(400)
            .end(done)
    })
});

describe('DELETE /members/:id', () => {
    it('should delete member document', async() => {
        const memberFromDB = await Member.findOne({});
        const id = memberFromDB._id;
        let response = await appTest
            .delete(`/api/members/${id.toHexString()}`)
            .expect(200)
        
        let deletedMember = response.body;
        expect(deletedMember.name).toBe(memberFromDB.name);
        expect(deletedMember.email).toBe(memberFromDB.email);
        expect(deletedMember._id).toBe(id.toHexString());
        
        let checkDBForMember = await Member
            .findById(id).then((member) => {
                expect(member).toBeNull();
            });
    });

    it('should return 404 if member not found', async() => {
        let fakeID = new ObjectId();
        let response = await appTest
            .delete(`/api/members/${fakeID.toHexString()}`)
            .expect(404)
    });

    it('should return 400 for non-object ids', async() => {
        let response = await appTest
            .delete('/api/members/123')
            .expect(400)
    });
});

/*
describe('PATCH /members/:id', () => {
    it('should update a member', (done) => {
        let updatedInfo = {
            bio: 'I love coding!'
        };
        let id = testMembers[0]._id.toHexString();
        request(app)
            .patch(`/members/${id}`)
            .send(updatedInfo)
            .expect(200)
            .expect((res) => { // Confirm what you're getting back, does not necessarily mean written to DB!
                expect(res.body.member._id).toBe(id);
                expect(res.body.member.bio).toBe(updatedInfo.bio);
            }).end((err, res) => {
                if (err) {
                    return done(err);
                }
                Member.findById(id).then((member) => {
                    expect(member.bio).toBe(updatedInfo.bio)
                    done();
                }).catch((e) => done(e))
            });
    });

    it('should return 404 if member not found', (done) => {
        let fakeID = new ObjectId();
        request(app)
            .patch(`/members/${fakeID.toHexString()}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 for non object ids', (done) => {
        request(app)
            .patch('/members/123')
            .expect(404)
            .end(done)
    });
}); */