let connect = require('./Connect.js'), database;
const { ObjectId } = require("mongodb");
connect().then( async (result) => {
    console.log(`Database ${result.databaseName} Connect......`)
    const collection = result.collection('event');
    const Coursera = await collection.findOne({_id : ObjectId("62f475fde958bba7bb82b2c8")});
    console.log(Coursera);
}).catch((err) => console.log(err));