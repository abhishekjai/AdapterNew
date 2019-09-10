const mongoClient = require('mongodb').MongoClient;

class MongoAdapter{

    _db; 
    collection;
    err;
    static instance=0;

    constructor(){

        if(MongoAdapter.instance==1){
            throw new Error("You can't make a another object");
        }

        MongoAdapter.instance++;

    }

    async connect(typeObj){
        let flag = 5;

        while(flag && !this._db){

            await _connect(this,typeObj);
            flag--;

        }

        async function _connect(refrence,typeObj){
           try {

               let db              = await mongoClient.connect(process.env.DATABASE);
               refrence._db        = db;
               refrence.collection = db.db('Users').collection(typeObj.collection);

           } catch (error) {

               refrence.err=error;

           }
        }
        
        if(!this._db){

            throw this.err;
        }

    }

    async close(){
        try {

            if(!this._db){
                return 'Connection has not started so cant close the connection'
            }else{

                await this._db.close();

                MongoAdapter.instance = 0;

                return true;

            }
        } catch (error) {
            throw error;   
        }
    } 

    async save(data,typeObj){
        try {

            if(!this._db){
                await this.connect(typeObj);
            }

            let user = await this.collection.insertOne(data);

            return user.ops[0];           
        } catch (error) {

            throw error;

        }
    }

    async show(typeObj){
        try{

            if(!this._db){
                await this.connect(typeObj);
            }

            return await this.collection.find().toArray() 
        } catch(error){
            throw error;
        }   
    }

    async update(id,obj,typeObj){
        try{

            if(!this._db){
                await this.connect(typeObj);
            }
            
            let data = await this.collection.findOneAndUpdate({id:id},{$set:{name:obj}},{returnOriginal: false});

            return data.value;

        } catch(error){
            throw error;
        }
    }

 }

 module.exports=MongoAdapter;