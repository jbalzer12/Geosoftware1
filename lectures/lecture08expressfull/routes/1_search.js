var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'mydatabase' // database name
const collectionName = 'pois' // collection name


/* GET search page. */
router.get('/', function(req, res, next) 
{
  
  // connect to the mongodb database and retrieve all docs
  client.connect(function(err) 
  {
    assert.equal(null, err)
  
    console.log('Connected successfully to server')
  
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // Find some documents
    collection.find({}).toArray(function(err, docs) 
    {
      assert.equal(err, null);
      console.log('Found the following records...');
      //console.log(docs[0].features)
      res.render('1_search', { title: 'Search Page', data: docs[0].features });

    })
  
  })

});

module.exports = router;
