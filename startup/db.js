const mongoose = require('mongoose');
const keys = require('../config/keys');

module.exports = function() {
    const db = keys.db;
    const DB_USER = keys.dbUser;
    const PASSWORD = keys.dbPassword;

    const mongoUri = `mongodb+srv://${DB_USER}:${PASSWORD}@cluster0.w0qza.mongodb.net/${db}?retryWrites=true&w=majority`

    mongoose.set("strictQuery", false);
    mongoose.connect(mongoUri)
        .then(() => {
            console.log('Connected to MongoDB...', db)
        })
}
