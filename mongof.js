const mongoClient = require('mongodb').MongoClient;
const mongoDbUrl = 'mongodb://localhost:27017';
let mongodb;
let _db;

function connect(){
    return new Promise((resolve,reject)=>{
        mongoClient.connect(mongoDbUrl, (err, db) => {
            if(err) throw reject(err);
            _db=db;
            mongodb = db.db('Users');
            resolve(db);
        });
    })
    
}
function get(){
   return mongodb
}

function close(){
    _db.close();
}

module.exports = {
    connect,
    get,
    close
};