const userModel=require('../model/user');
const bcrypt=require('bcrypt');

const generateToken=require('../utility/generateToken.js');


module.exports.registeruser=async (req,res)=>{
    const {name,email,passward}=req.body;
    try{
   /** */ let user=await userModel.findOne({email});
    if(user)
        {
            return res.status(400).send("account exist");
           
        }     

        let salt= await bcrypt.genSalt(10);
        const encrypt=await bcrypt.hash(passward,salt);
         user= await userModel.create({
            name,
            email,
            passward:encrypt,

        });

    let token =generateToken({email});
    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        MaxAge:30*24*60*60*1000,
    });
    res.status(201).send(user);
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }

};


module.exports.loginuser=async(req,res)=>{
    const {email,passward}=req.body;
    try{
        let user=await userModel.findOne({email});
        if(!user)
        {
            return res.send(500).send("email or passward incorrect");
        }

        let result=await bcrypt.compare(passward,user.passward);

        if(result)
        {
            let token=generateToken({email});
            res.cookie("token",token,{
                httpOnly:true,
                secure:true,
                MaxAge:30*24*60*60*1000,
            });
            res.status(201).send("logged in successfully");
        }
    
    else
    {
      return res.status(500).send("incorrect");
    }

}
catch(err)
{
    res.status(500).send(err.message);
}
};

module.exports.logoutuser=function(req,res){
    res.cookie("token","",

        {
            httpOnly:true,
            secure:true,
        }
        
    )
    res.status(201).send("logged out");
}


module.exports.profileuser=function(req,res)
{
    res.render("profile");
}

