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
    async connect(typeObj){
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
            await _connect(this,typeObj);
            flag--;
        }
        async function _connect(refrence,typeObj){
           try {
               let db = await mongoClient.connect(process.env.DATABASE);
               refrence._db=db;
               refrence.collection=db.db(typeObj.db).collection(typeObj.collection);
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
            let data = await this.collection.findOneAndUpdate({id:id},{$set:{name:obj}});
            return data.value;
        } catch(error){
            throw error;
        }
    }
 }
 class User{
    db='Users';
    collection='user'
    constructor(instance,schema){
        this.instance = instance
        this.schema =schema;
    }
    show(){
        return this.instance.show(this)
    }
    save(id,name){
        return this.instance.save(new this.schema(id,name),this);
    }
    update(id,obj){
        return this.instance.update(id,obj,this)
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
 class Vehicle{
     db='Vehicles';
     collection='vehicle';
     constructor(instance,schema){
        this.instance = instance;
        this.schema=schema;
     }
     show(){
         return this.instance.show(this);
     }
     save(id,name){
         return this.instance.save(new this.schema(id,name),this);
     }
     update(id,obj){
         return this.instance.update(id,obj,this);
     }
 }
 class VehicleSchema{
     constructor(id,name){
         if(!id || !name){
             throw new Error('id and name is required');
         }
         this.id=id;
         this.name=name;
     }
 }
 const MongoVehicleMain = async ()=>{
    try {
        const adapt = new MongoAdapter();
        const vehicle = new Vehicle(adapt,VehicleSchema);
        console.log("mongo vehicle");
        console.log(await vehicle.save(1,'abhishek'));
        console.log(await vehicle.save(2,'jaiswal'));
        console.log(await vehicle.save(3,'rohan'));
        console.log(await vehicle.show());
        console.log(await vehicle.update(1,'satyam'));
        console.log(await vehicle.show());
        adapt.close();
    } catch (err) {
        console.log(err);   
    }
 }
 MongoVehicleMain();
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
        console.log(await user.save(1,'abhishek'));
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