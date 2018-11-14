const mongoose = require("mongoose");
const {ObjectId} = require('mongodb');

const {Member} = require("./../../models/members");

const mongoURI = global.__MONGO_URI__;
console.log(mongoURI);

beforeAll(async () => {
    mongoose.connect(mongoURI, {useNewUrlParser: true}, (err) => {
        if (err) {
            console.log("Could not connect to database!");
        }
        console.log("Successfully connected to test database");
    });
    mongoose.Promise = Promise;
});

beforeEach( async () => {
    const member1 = new Member ({
        _id: new ObjectId(),
        name: 'Jeff Jeffy',
        email: 'jeff.jeffy@queensu.ca',
        password: 'pass123',
        bio: null
    });
    
    const member2 = new Member ({
        _id: new ObjectId(),
        name: 'Joe Budden',
        email: 'joe.budden@queensu.ca',
        password: 'pass123',
        bio: null
    });

    await member1.save();
    await member2.save();
});


afterEach( async () => {
    await Member.deleteMany({}); // removing all items from model!
    jest.clearAllMocks();
});

afterAll( async () => {
    mongoose.disconnect();
})