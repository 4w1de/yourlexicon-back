const { Model } = require('objection');

class Users extends Model {
    static get tableName() {
        return 'USERS';
    }
}

module.exports = Users;
