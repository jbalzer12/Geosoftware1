var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'mydatabase' // database name
const collectionName = 'newpois' // collection name

/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('2_add', { title: 'Add Page' });
});

router.post('/newpoi', function(req, res, next) 
{
  console.log("A new poi has been added")

  console.log(req.body)
  let poi = {}
  poi.poiname = req.body.pname
  poi.cityname = req.body.cname
  poi.coordinates = req.body.longlat
  poi.link = req.body.picurl


  // connect to the mongodb database and afterwards, insert one the new element
  client.connect(function(err) 
  {
    assert.equal(null, err)
  
    console.log('Connected successfully to server')
  
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // Insert the document in the database
    collection.insertOne(poi, function(err, result) 
    {
      assert.equal(err, null)
      assert.equal(1, result.result.ok)
      //console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the collection`)
      res.render('2_add_notification', { title: 'Addition Completed', data: poi});
     })
  
  })    


});
module.exports = router;
