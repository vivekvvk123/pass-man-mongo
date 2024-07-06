const express = require('express')
const bodyParser= require('body-parser')
const cors= require('cors');
const dotenv= require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passMan';


client.connect();


// GET all the passwords
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Save a password
app.post('/', async(req, res) => {
  try{
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true , result: findResult})
  }
  catch(e){
    console.error(e)
  }
})

//Delete a password
app.delete('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success: true , result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})