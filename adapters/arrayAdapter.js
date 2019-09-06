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
 module.exports=ArrayAdapter;