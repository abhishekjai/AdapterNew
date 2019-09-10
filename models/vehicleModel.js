const uniqid  = require('uniqid');

class Vehicle{
     
    constructor(instance){
       this.instance = instance;
       this.collection = 'vehicle';
    }

    objCreator(name){
       if(!name && !!(name.trim()))
           throw new Error('name is required');
       return {
           id   : uniqid(),
           name : name
       }
    }

    show(){
        return this.instance.show(this);
    }

    save(name){
        return this.instance.save(this.objCreator(name),this);
    }

    update(id,obj){
        return this.instance.update(id,obj,this);
    }

}
module.exports=Vehicle;