class ArrayAdapter{
    storage = [];
    save(data){
        this.storage.push(data);
    }
    show(){
        /* return new Promise(function (resolve,reject){
            if(!this.storage){
                resolve(this.storage);
            }else{
                reject("Data is unavailable");
            }
        }) */
        console.log(this.storage);
    }
    update(id,obj){
        let user = "";
        let index = "";
        this.storage.forEach((data,ind)=>{
            if(id==data.id){
                user=data;
                index=ind;
            }
        })
        if(!user){
            return "User not available";
        }
        const uarr = Object.keys(user);
        const oarr = Object.keys(obj);
        oarr.forEach((val)=>{
            if(uarr.includes(val)){
                this.storage[index][val]=obj[val];
            }
        })
    }
 }
 class User{
    constructor(instance,schema){
        this.instance = instance
        this.schema =schema;
    }
    show(){
        this.instance.show()
    }
    save(id,name){
        this.instance.save(new this.schema(id,name));
    }
    update(id,obj){
        this.instance.update(id,obj)
    }
 }
 class Schema{
    constructor(id,name){
        if(!id || !name){
            throw new error('id and name is required');
        }
        this.id=id;
        this.name=name;
    }
 }
 const adapt = new ArrayAdapter();
 const user = new User(adapt,Schema);
 user.save(1,'abhishek');
 user.save(2,'jaiswal');
 user.save(3,'rohan');
 user.show()
 user.update(1,{name:'satyam'});
 user.show()
 
 