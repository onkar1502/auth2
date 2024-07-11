const jwt=require('jsonwebtoken');
const generateToken=(data)=>
    {
        return jwt.sign(data,'hi');
    };

module.exports=generateToken;