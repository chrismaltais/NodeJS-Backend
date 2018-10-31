const {Member} = require('./../models/members');

module.exports = {
    getAllMembers() {
        return new Promise((resolve, reject) => {
            Member.find()
                .then((members) => {
                    resolve({members});
                })
                .catch((err) => {
                    reject('Could not retrieve all members!');
                })

        });
    }
}