var express = require('express'); //get express
const app = express(); //use express
var router = express.Router(); //get router
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
router.post('/changeRoute', function(req, res, next) 
{
  //Store Payload
  console.log(req.body);
  var nummer2 = req.body.nummer2; //Number of the Route to update
  var neuenummer = req.body.neuenummer; //new Number for a Dataset

  //connect to the mongodb database and insert one new element
  client.connect(function(err) 
  {
    assert.strictEqual(null, err)
    const db = client.db(dbName) //database
    const collection = db.collection(collectionName) //collection
	  //check if neuenummer already exists
	  collection.find({nummer: req.body.neuenummer}).toArray(function(err, docs) 
    {
      assert.strictEqual(err, null);
      if(docs.length >= 1) {
		  //send error
          res.sendFile(__dirname + "/error_redundant_number.html") //redirect after Post
      }
    })
    //check if exists
    collection.find({nummer: req.body.nummer2}).toArray(function(err, docs) 
    {
      assert.strictEqual(err, null);
      if(docs.length >= 1) {
          //console.log("true");
          //Update the document in the database
          collection.updateOne({nummer: nummer2}, {$set:{nummer: neuenummer}}, function(err, result) 
          {
            assert.strictEqual(err, null)
            assert.strictEqual(1, result.result.ok)
            //console.log(result);
          })
          res.sendFile(__dirname + "/done.html") //redirect after Post
      }
      else {
        //console.log("false");
        res.sendFile(__dirname + "/error_nonexistent_number.html") //redirect after Post
      }
    })


  })
});
module.exports = router; //export as router