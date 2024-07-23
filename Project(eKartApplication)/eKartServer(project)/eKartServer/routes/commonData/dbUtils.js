//Ip_Adress : 127.0.0.1

let {MongoClient} = require('mongodb');
let mongo_url = 'mongodb://127.0.0.1:27017';
let mongo_client = new MongoClient(mongo_url);
dbUtils = {
    dbName : 'eShoppingDataBase',
    getMongoClientConnection() {
        return mongo_client;
    }
}
module.exports = dbUtils;


