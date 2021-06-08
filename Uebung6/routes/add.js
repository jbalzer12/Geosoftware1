var express = require('express')
var router = express.Router()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'mydatabase' // database name
const collectionName = 'newroute' // collection name

/* GET add page. */
router.get('/', function(req, res, next) {
  res.render('add', { title: 'Add route' })
})


router.post('/newroute', function(req, res, next) 
{
  console.log("A new route has been added")

  console.log(req.body)
  let route = {}
  route.poiname = req.body.pname
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
    collection.insertOne(route, function(err, result) 
    {
      assert.equal(err, null)
      assert.equal(1, result.result.ok)
      //console.log(result)
      console.log(`Inserted ${result.insertedCount} document into the collection`)
      res.render('add_notification', { title: 'Addition Completed', data: route})
     })
  
  })    


})

module.exports = router