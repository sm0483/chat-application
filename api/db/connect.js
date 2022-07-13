const mongoose=require('mongoose');

const connectDb=(url)=>{
    return mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser: true,  
    })
}

const closeDb=()=>{
    return mongoose.connection.close();
}

module.exports={
    connectDb,
    closeDb
}