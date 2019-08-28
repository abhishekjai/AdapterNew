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