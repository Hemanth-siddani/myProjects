
const express = require('express')
const cors = require('cors')
const { MongoClient,ObjectId} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 8080
const server_message = `Server active at port ${port}`

async function dbConnection(clientRequest) {
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db('clientsData')
    const collection = db.collection('clients')

    // Check if clientRequest is not empty
    if (Object.keys(clientRequest).length > 0) {
        collection.insertOne(clientRequest)
    } else {
        console.log('Empty object received. Not inserting into database.')
    }

    return collection.find({}).toArray()
}


app.post('/', async (req, res) => {
    const clientRequest = req.body

    // Validate clientRequest object
    if (clientRequest || clientRequest.clientName || clientRequest.clientMobileNumber || clientRequest.principleAmount || clientRequest.rateOfInterest) {
        try {
            const dbResponse = await dbConnection(clientRequest)
            res.send(JSON.stringify(dbResponse))
        } catch (error) {
            console.log('Error while communicating with data base.', error)
        }
    }
    else {
          res.send({ message: 'Invalid request. Please provide all required fields.' })
          return 
    }
})

app.get('/', async (req, res) => {
    const getDBData = await dbConnection()
    console.log('getDBData', getDBData)
    res.send(JSON.stringify(getDBData))
})
app.delete('/client_deletion/:id',async(req,res) => {
    let unWantedClient = req.params.id
    console.log('unwantedClient :',unWantedClient)
    try {
        const db = client.db('clientsData');  
        const collection = db.collection('clients');
        await collection.deleteOne({ _id: new ObjectId(unWantedClient) })
    } catch (error) {
        console.log('Error while deleting client.', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
})
app.listen(port, () => {
    console.log(server_message)
})


