var express = require('express');
var router = express.Router();
var dbUtils = require('./commonData/dbUtils');
var mongo_client = dbUtils.getMongoClientConnection();
/* GET home page. */
router.get('/', function(req, res, next) {
    let productRequest = req.query;
    productRequest.actual_Price = parseInt(productRequest.actual_Price);
    productRequest.discount_Percentage = parseInt(productRequest.discount_Percentage);
    productRequest.rating = parseFloat(productRequest.rating);
    productRequest.product_itemsInStock = parseInt(productRequest.product_itemsInStock);
    productRequest.product_maxDeliveryDays = parseInt(productRequest.product_maxDeliveryDays);
    getDataBaseConnection(productRequest).then((db_response) => {
        console.log('db_response:',db_response);
        let message = {};
        message.msg = 'Success';
        res.send(JSON.stringify(message));
    }).catch((error) => {
        console.log('error:',error);
        let message = {};
        message.msg = 'Error';
        res.send(JSON.stringify(message));
    }).finally(() => {
        mongo_client.close();
    })
});

async function getDataBaseConnection(productRequest) {
    console.log('function definition(productRequest):',productRequest);
    await mongo_client.connect();
    console.log('Connected successfully to server');
    const db = mongo_client.db(dbUtils.dbName);
    const collection = db.collection('productData');
    const data = await collection.insertOne(productRequest);
    return data;
  }
module.exports = router;
