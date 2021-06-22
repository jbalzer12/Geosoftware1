var express = require('express');
const app = express();
var router = express.Router();
const assert = require('assert');

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded());

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
//const url = 'mongodb://localhost:27017' // connection URL
const url = 'mongodb://mongo:27017' // connection URL
const dbName = 'testserver_db' // database name
const collectionName = 'routes' // collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(url) // mongodb client

// Delete Router
router.post('/removeEntry', function(req, res, next)
{
    client.connect(function(err)
    {
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        //check if number exists
        collection.find({nummer: req.body.gNummer}).toArray(function(err, docs)
        {
            assert.strictEqual(err, null)
        
            if(docs.length >= 1){
                console.log(req.body);

                assert.strictEqual(null, err);
                
                console.log(req.body);
                //delete Document
                collection.deleteOne({nummer: req.body.gNummer}, function(err, results){
                    assert.strictEqual(err, null)
                })
                res.sendFile(__dirname + "/done.html")
            }
            else {
                res.sendFile(__dirname + "/error_nonexistent_number.html")
            }
            
        })

    })
})
module.exports = router; //export as router