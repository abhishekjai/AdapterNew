const dotenv       = require('dotenv');
dotenv.config({path:'./config.env'});
const userModel    = require('./models/userModel');
const vehicleModel = require('./models/vehicleModel');
const arrayAdapter = require('./adapters/arrayAdapter');
const mongoAdapter = require('./adapters/mongoAdapter');



const fun = async ()=>{
    try {
        
        const adapt = new mongoAdapter();
        const user  = new userModel(adapt);

        console.log(await user.save('abhishek'));
        console.log(await user.save('jaiswal'));
        console.log(await user.save('rohan'));
        console.log(await user.show());
        await adapt.close();
    } catch (error) {
        console.log(error);

    }

}

fun();

const fun1 = async ()=>{
    try {
        
        const adapt = new mongoAdapter();
        const user  = new vehicleModel(adapt);

        console.log(await user.save('abhishek'));
        console.log(await user.save('jaiswal'));
        console.log(await user.save('rohan'));
        console.log(await user.show());
        await adapt.close();

    } catch (error) {
        console.log(error);
    }
    
}
fun1();