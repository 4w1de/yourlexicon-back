const { Model } = require('objection');

class Feedback extends Model {
    static get tableName() {
        return 'FEEDBACK';
    }
}

module.exports = Feedback;
