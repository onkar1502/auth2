const userModel=require("../model/user.js")
const jwt=require('jsonwebtoken');

module.exports.protect=async(req,res,next)=>{
    if(req.cookies.token){
        try{
            const data=jwt.verify(req.cookies.token,'hi');
            req.user=await userModel.findOne({email:data.email}).select("-passward");
            next();
        }
        catch(err){
            res.this.status(401).send("not authorized");
        }
    }
    if(!req.cookies.token){
        res.status(401).send("not authorized");
    }
 };
