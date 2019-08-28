const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://localhost:27017'
let _db

const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, (err, db) => {
            _db = db
            return callback(err)
        })
    } catch (e) {
        throw e
    }
}

const getDB = () => _db.db('Users')

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }















/* const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully");
  module.exports=client.db('Users').collection('user');
  client.db('Users').collection('user').insertOne({id:1,name:"abhishek"},(err,data)=>{
      console.log(data)
  });
});
 */