const env = 'development';
const { knexSnakeCaseMappers, Model } = require('objection');

const setupDB = () => {
    const config = require('./knexfile')[env];

    const knex = require('knex')({
        ...config,
        /*...knexSnakeCaseMappers({ upperCase: true }),*/
    });

    Model.knex(knex);
};

module.exports = setupDB;
