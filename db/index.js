const { mongoose, User, Order } = require('./schema');

const uri = 'mongodb://localhost:27017';

mongoose.connect(uri, { dbName: 'bt8' });

const db = mongoose.connection;
db.on('error', (error) => console.log('connect error: ', error));

module.exports = { db, User, Order };
