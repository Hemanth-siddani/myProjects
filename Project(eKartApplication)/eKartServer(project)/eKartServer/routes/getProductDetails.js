var express = require('express');
var router = express.Router();
var dbUtils = require('./commonData/dbUtils');
var mongo_client = dbUtils.getMongoClientConnection();
router.get('/', function(req, res) {
   let filterRequest = req.query;
   console.log('\n\nfilterKeyObject from server:',filterRequest.filterDetails,isNaN(filterRequest.filterDetails),typeof filterRequest.filterDetails,'\n\n');
   console.log('\n\n<===filterRequest.product_inStock:',filterRequest,'\n\n');
   getDataBaseConnection(filterRequest).then((database_response) => {
      let product_Data = {};
      console.log('\n\ndatabase_response:',database_response,'\n\n');
      product_Data.info = database_response;
      res.send(JSON.stringify(product_Data));
   }).catch((error) => {
      console.log('\n\nError while communicating with data base.\n\n',error);
   }).finally(() => {
      mongo_client.close();
   })
});

async function getDataBaseConnection(filterRequest) {
   console.log('\n\ngetDataBaseConnection ==> definition:',filterRequest,'\n\n');
    await mongo_client.connect();
    console.log('Connected successfully to server');
    const db = mongo_client.db(dbUtils.dbName);
    const collection = db.collection('productData');

    let tempVal = isNaN(filterRequest.filterDetails);

    if(filterRequest.product_Id) {
         const data = await collection.find({product_Id:filterRequest.product_Id}).toArray();
         return data;
    }

    if(filterRequest.filterDetails) {
       if(tempVal == true) {
         let convertedString = filterRequest.filterDetails.charAt(0).toUpperCase() + filterRequest.filterDetails.slice(1).toLowerCase();
         const data = await collection.find({product_Name:convertedString}).toArray();
         return data;
      }
      else {
         let numValue = parseInt(filterRequest.filterDetails);
         console.log('numValue:',numValue,typeof numValue);
         if(numValue < 200 || numValue > 65000) {
            return { error: 'No data found.' };
         }
         else {
            const data = await collection.find({actual_Price:{$lte:numValue}}).toArray();
            return data;
         }
      }
    }
    else {
      const data = await collection.find({}).toArray();
      return data;
    }

}

module.exports = router;





