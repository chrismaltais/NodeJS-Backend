const {Member} = require('./../models/members');

module.exports = {
    getAllMembers() {
        return new Promise((resolve, reject) => {
            Member.find()
                .then((members) => {
                    resolve({
                        members,
                        message: "This is coming from member.controller.js"
                    });
                })
                .catch((err) => {
                    reject('Could not retrieve all members!');
                })

        });
    },

    getMember(id) {
        return new Promise((resolve, reject) => {
            Member.findById(id).then((member) => {
                resolve({
                    member,
                    message: "This message is coming from member.controller.js"
                })
            })
            .catch((err) => {
                reject(`Could not retrieve member ${id}`);
            })
        });
    },

    createMember(memberToCreate) {
        newCreatedMember = new Member ({
            name: memberToCreate.name,
            email: memberToCreate.email,
            password: memberToCreate.password
        });

        return new Promise((resolve, reject) => {
            newCreatedMember.save().then((savedMember) => {
                resolve({
                    savedMember,
                    message: "This message is coming from member.controller.js"
                })
            }).catch((err) => {
                reject("Could not create new member");
            })
        });
    }

}