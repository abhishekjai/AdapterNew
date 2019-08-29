const mongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
class ArrayAdapter{
    storage = [];
    save(data){
        return new Promise((resolve,reject)=>{
            if(data){
                this.storage.push(data);
                resolve(data);
            }else{
                reject("Data is unavailable");
            }
        })
    }
    show(){
        return new Promise((resolve,reject)=>{
            if(this.storage){
                resolve(this.storage);
            }else{
                reject("Data is unavailable");
            }
        })
    }
    update(id,obj){
        return new Promise((resolve,reject)=>{
            let user = "";
            let index = "";
            this.storage.forEach((data,ind)=>{
                if(id==data.id){
                    user=data;
                    index=ind;
                }
            })
            if(!user){
                reject("User not available");
            }
            Object.keys(obj).forEach((val)=>{
                if(Object.keys(user).includes(val)){
                    this.storage[index][val]=obj[val];
                }
            })
            resolve(this.storage[index]);
        })
    }
 }
 class MongoAdapter{
    _db; 
    collection;
    err;
    async connect(){
        let flag=5;
        /* try {
            if(this._db){
                return 'Connection has been intilized before'
            }else{
                let db = await mongoClient.connect(process.env.DATABASE);
                this._db=db;
                this.collection=db.db('Users').collection('user');
                return 'Connection has started'
            }
        } catch (error) {
            throw error;
        } */
        while(flag && !this._db){
            await _connect(this);
            flag--;
        }
        async function _connect(refrence){
           try {
               let db = await mongoClient.connect(process.env.DATABASE);
               refrence._db=db;
               refrence.collection=db.db('Users').collection('user');
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
            }
        } catch (error) {
            throw error;   
        }
    } 
    async save(data){
        try {
            if(!this._db){
                await this.connect();
            }
            let user = await this.collection.insertOne(data);
            return user.ops[0];           
        } catch (error) {
            throw error;
        }
    }
    async show(){
        try{
            if(!this._db){
                await this.connect();
            }
            return await this.collection.find().toArray() 
        } catch(error){
            throw error;
        }   
    }
    async update(id,obj){
        try{
            if(!this._db){
                await this.connect();
            }
            let data = await this.collection.findOneAndUpdate({id:id},{$set:{name:obj}});
            return data.value;
        } catch(error){
            throw error;
        }
    }
 }
 class User{
    constructor(instance,schema){
        this.instance = instance
        this.schema =schema;
    }
    show(){
        return this.instance.show()
    }
    save(id,name){
        return this.instance.save(new this.schema(id,name));
    }
    update(id,obj){
        return this.instance.update(id,obj)
    }
 }
 class Schema{
    constructor(id,name){
        if(!id || !name){
            throw new Error('id and name is required');
        }
        this.id=id;
        this.name=name;
    }
 }
 const MongoMain = async ()=>{
    try {
        const adapt = new MongoAdapter();
        const user = new User(adapt,Schema);
        console.log(await user.save(1,'abhishek'));
        console.log(await user.save(2,'jaiswal'));
        console.log(await user.save(3,'rohan'));
        console.log(await user.show());
        console.log(await user.update(1,'satyam'));
        console.log(await user.show());
        adapt.close();
    } catch (err) {
        console.log(err);   
    }
 }
MongoMain();
const main = async ()=>{
    try {
        const adapt = new ArrayAdapter();
        const user = new User(adapt,Schema);
        console.log(user.save(1,'abhishek'));
        console.log(await user.save(2,'jaiswal'));
        console.log(await user.save(3,'rohan'));
        console.log(await user.show());
        console.log(await user.update(1,{name:'satyam'}));
        console.log(await user.show());
    } catch (err) {
        console.log(err);   
    }
}
main();