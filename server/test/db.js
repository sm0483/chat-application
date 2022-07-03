const mongoose=require('mongoose');
const { MongoMemoryServer }=require('mongodb-memory-server');


let mongod=undefined;
const serverCreation=async()=>{
    mongod=await MongoMemoryServer.create();
}
  serverCreation();
module.exports.connect=async()=>{
    const uri=mongod.getUri();
    await mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        poolSize:10
    });
}


module.exports.closeDatabase=async()=>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

module.exports.clearDatabase=async()=>{
    const collections=mongoose.connection.collections;
    for(const key in collections){
        const collection=collections[key];
        await collection.deleteMany();
    }
}

