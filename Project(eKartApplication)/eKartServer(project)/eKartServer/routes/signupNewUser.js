var express = require('express');
var dbUtils = require('./commonData/dbUtils');
console.log('\n\ndbName from signupNewUser:',dbUtils.dbName,'\n\n');
var router = express.Router();
var mongo_client = dbUtils.getMongoClientConnection();

const bcrypt = require('bcrypt');



router.post('/', function(req, res) {
    let newUserInfo = req.body;
    bcrypt.hash(newUserInfo.Signup_inputPassword,5).then(function(hash) {
        newUserInfo.Signup_inputPassword = hash; 
        getDataBaseConnection(newUserInfo).then((db_response) => {
            console.log('\n\n1.Message : Data base connected successfully.\n\n');
            let messageInfo = {};
            messageInfo.msg = 'Valid';
            console.log('\n\n2.',messageInfo.msg,'\n\n');
            console.log('\n\n3.db_response :',db_response,'\n\n');
            res.send(JSON.stringify(messageInfo));
        }).catch((error) => {
            console.log("\n\n4.Message : Error while communicating with the data base.\n\n");
            let messageInfo = {};
            messageInfo.msg = 'Invalid';
            console.log('\n\n5.',error,'\n\n');
            res.send(JSON.stringify(messageInfo));
        }).finally(() => {
            mongo_client.close();
        })
    });
    
    

    
});

async function getDataBaseConnection(newUserInfo) {
    console.log('function definition(newUserInfo):',newUserInfo);
    await mongo_client.connect();
    console.log('Connected successfully to server');
    const db = mongo_client.db(dbUtils.dbName);
    const collection = db.collection('userDetails');
    const data = await collection.insertOne(newUserInfo);
    return data;
  }
module.exports = router;