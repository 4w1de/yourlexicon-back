const { Model } = require('objection');

class Words extends Model {
    static get tableName() {
        return 'WORDS';
    }
}

module.exports = Words;
