const { Model } = require('objection');

class Words extends Model {
    static get tableName() {
        return 'NEW_WORDS';
    }
}

module.exports = Words;
