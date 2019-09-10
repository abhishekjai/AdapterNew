const dotenv       = require('dotenv');
dotenv.config({path:'./config.env'});
const expect       = require('chai').expect;
const should       = require('chai').should();
const uniqid       = require('uniqid');
const arrayAdapter = require('../adapters/arrayAdapter');
const mongoAdapter = require('../adapters/mongoAdapter');
let user = {
    collection : 'user'
}
describe('testing a mongo adapter',async function (){
    const adapt = new mongoAdapter();
    
    it('connection test', async function(){

         ( async function(){
            await adapt.connect(user)
            console.log("IN FUN");
        }).should.not.throw(Error);
    })

    it('save test',async function  (){       
        let obj = {
            id   : uniqid(),
            name : 'abhishek'
        }
        console.log("IN BEFORE");
        let data = await adapt.save(obj,user);
        console.log("IN AFTER");
        data.should.have.property('name').equal('abhishek');
    })

    it('update test',async function  (){       
        let updated = await adapt.update('46f43c2vk0c7yt9r','vicky',user);
        
        updated.should.have.property('name').equal('vicky');
    })

    it('show test',async function  (){       
        let alldata = await adapt.show(user);
       
        expect(alldata).to.be.a('array');
    })

    it('close',async function (){
        let data = await adapt.close();
        
        expect(data).to.be.true;
    })
})

// describe('to a single connection', ()=>{
    
//     it('single connection', function(){
        
//         (() => new mongoAdapter()).should.throw(Error);        

//     })
// })

describe('testing a array adapter',async function (){
    const adapt = new arrayAdapter();
    
    it('save test',async function  (){
        let obj = {
            id   : uniqid(),
            name : 'abhishek'
        }       
        let data = await adapt.save(obj,user);

        data.should.have.property('name').equal('abhishek');        
    })
    it('show test',async function  (){       
        let alldata = await adapt.show(user);
        
        expect(alldata).to.be.a('array');
    })
})