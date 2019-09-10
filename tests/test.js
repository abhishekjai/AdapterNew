const dotenv       = require('dotenv');
dotenv.config({path:'./config.env'});
const mocha        = require('mocha');
const assert       = require('assert');
var expect         = require('chai').expect;
var should         = require('chai').should();
const userModel    = require('../models/userModel');
const vehicleModel = require('../models/vehicleModel');
const arrayAdapter = require('../adapters/arrayAdapter');
const mongoAdapter = require('../adapters/mongoAdapter');

describe('testing a mongo adapter',async function async (){
    const adapt = new mongoAdapter();
    const user  = new userModel(adapt);
    it('update test',async function  (){       
        let updated = await user.update('46f43c2vk0c7yt9r','vicky');
        expect(updated).to.have.keys(['name','id','_id'])
        updated.should.have.property('name').equal('vicky');
    })
    it('save test',async function  (){       
        let data = await user.save('abhi');
        data.should.have.property('name').equal('abhi');
        expect(data).to.have.keys(['name','id','_id'])
        
    })
    it('show test',async function  (){       
        let alldata = await user.show();
        expect(alldata).to.be.a('array');
    })
    it('close',async function (){
        let data = await adapt.close();
        expect(data).to.be.true;
    })
})

describe('to a single connection', ()=>{
    it('single connection', function(){
        (() => new mongoAdapter()).should.throw(Error);        
    })
})

describe('testing a array adapter',async function async (){
    const adapt = new arrayAdapter();
    const user  = new userModel(adapt);
    
    it('save test',async function  (){       
        let data = await user.save('abhi');
        data.should.have.property('name').equal('abhi');
        expect(data).to.have.keys(['name','id']);
        let data1 = await user.save('vicky');
        data1.should.have.property('name').equal('vicky');
        expect(data1).to.have.keys(['name','id']);
        
    })
    it('show test',async function  (){       
        let alldata = await user.show();
        expect(alldata).to.be.a('array');
    })
})