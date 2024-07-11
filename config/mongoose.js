const mongoose=require('mongoose');

const connectToDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to db");
    }
    catch(err)
    {
        console.error("error:",err);
        process.exit(1);
    }
};
module.exports=connectToDB;