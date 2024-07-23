var express = require('express');
var dbUtils = require('./commonData/dbUtils');
console.log('\n\ndbName from loginDetails:', dbUtils.dbName, '\n\n');
var router = express.Router();
var mongo_client = dbUtils.getMongoClientConnection();

const bcrypt = require('bcrypt');

router.post('/', function (req, res) {
    let userRequestData = req.body;
    console.log('Data from Server:', userRequestData);

    getDataBaseConnection(userRequestData).then((data_response) => {
        console.log('\n\nDatabase connected successfully.\n\n');
        console.log('\n\nuserRequestData:', userRequestData, '\n\n');
        console.log('\n\ndata_response:', data_response, '\n\n');

        if (data_response.length > 0) {
            bcrypt.compare(userRequestData.Login_inputPassword, data_response[0].Signup_inputPassword, function (err, result) {
                console.log('result:', result);
                if (result) {
                    let message = {};
                    message.msg = 'Valid';
                    res.send(JSON.stringify(message));
                } else {
                    let message = {};
                    message.msg = 'Invalid';
                    res.send(JSON.stringify(message));
                }
            });
        } else {
            let message = {};
            message.msg = 'Invalid';
            res.send(JSON.stringify(message));
        }
    }).catch((error) => {
        console.log('\n\nError while communicating with database.\n\n');
        console.log('\n\nerror\n\n', error);
        let message = {};
        message.msg = 'Invalid';
        res.send(JSON.stringify(message));
    }).finally(() => mongo_client.close());
});

async function getDataBaseConnection(userRequestData) {
    console.log('req.body:', userRequestData);
    await mongo_client.connect();
    console.log('Connected successfully to server');
    const db = mongo_client.db(dbUtils.dbName);
    const collection = db.collection('userDetails');
    const data = await collection.find({ Signup_inputEmail: userRequestData.Login_inputEmail }).toArray();
    return data;
}

module.exports = router;




