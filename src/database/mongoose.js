const mongoose = require('mongoose');
const config = require('../../config.json');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(``, dbOptions); //the mongodb link
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('[INFO] The bot has been connected to the DataBase.');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('[INFO] The bot has been disconnected from the DataBase.');
        });

        mongoose.connection.on('error', (err) => {
            console.log('[INFO] Error: ' + err);
        });
    }
}