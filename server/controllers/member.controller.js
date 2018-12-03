const {Member} = require('./../models/members');

module.exports = {
    getAllMembers() {
        return new Promise((resolve, reject) => {
            Member.find()
                .then((members) => {
                    resolve(members);
                })
                .catch((err) => {
                    reject({message: "Not found"});
                })

        });
    },

    getMember(id) {
        return new Promise((resolve, reject) => {
            Member.findById(id).then((member) => {
                if (!member) {
                    reject({message: `Could not retrieve member ${id}`});
                }
                resolve(member);
            })
            .catch((err) => {
                reject({message: 'Not found'});
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
            newCreatedMember.save().then((member) => {
                resolve(member);
            }).catch((err) => {
                reject({message: 'Creation of member failed'});
            })
        });
    },

    deleteMember(id) {
        return new Promise((resolve, reject) => {
            // If not in database
            Member.findByIdAndDelete(id).then((member) => {
                if (!member) {
                    reject(`Could not find member ${id}`);
                }
                resolve(member);
            }).catch((err) => {
                reject(`Could not delete member ${id}`);
            })
        });
    }

}