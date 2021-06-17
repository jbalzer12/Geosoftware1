var express = require('express');
const app = express();
var router = express.Router();
const assert = require('assert');

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded());

//MongoConnect
//-------------->>>>Hier muss die passende Datenbank und die passende Collection angegeben werden!!!!!<<<<--------------
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'testserver_db' // database name
const collectionName = 'routes' // collection name
//----------------------------------------------------------------------------------------------------------------------
const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(url) // mongodb client


//Post Router
router.post('/newRoute', function(req, res, next) 
{
  //Store and Check Payload 
  if(req.body.geojson == '' || req-body.nummer1 == ''){
    res.sendFile(__dirname + "/error_empty_input.html")
    return;
  }
  var nummer = req.body.nummer1; //Number of the new Route
  var geojson = JSON.parse(req.body.geojson); //geoJSON Object of the Route

  //connect to the mongodb database and insert one new element
  client.connect(function(err) 
  {
    assert.strictEqual(null, err)
  
    const db = client.db(dbName) //database
    const collection = db.collection(collectionName) //collection
    collection.find({nummer: req.body.nummer1}).toArray(function(err, docs)
    {
        assert.strictEqual(err, null)
        //check if number already exists
        if(docs.length >= 1){
          res.sendFile(__dirname + "/error_redundant_number.html")
        } 
        else {
          //Insert the document in the database
          collection.insertOne({nummer, geojson}, function(err, result) 
          {
            assert.strictEqual(err, null)
            assert.strictEqual(1, result.result.ok)
            //console.log(result);
            res.sendFile(__dirname + "/done.html")
           })
        }
        
    })
  })
});
module.exports = router; //export as router
