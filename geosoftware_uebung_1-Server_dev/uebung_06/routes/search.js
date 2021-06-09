var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'testserver_db' // database name
const collectionName = 'routes' // collection name


//get Documents
router.get('/', function(req, res, next) 
{
  
  // connect to the mongodb database and retrieve all docs
  client.connect(function(err) 
  {
    assert.equal(null, err)
  
    //console.log('Connected successfully to server')
  
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // Find all documents
    var result = [];
    collection.find({}).toArray(function(err, docs) 
    {
      assert.equal(err, null);
      //console.log('Found the following records...');
      //for(i = 0; i < docs.length; i++) {
      //    console.log(docs[i]);
      //}
      res.json([docs]);
    })
  })
});
module.exports = router;
