import jwt from "jsonwebtoken";

export default (req,res,next)=>{
    try{
        const token =req.headers.authorization?.split(" ")[1];
        console.log(token);
        if(!token){
            return res.status(401).json({message:"Unauthorized, no token"})
        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        console.log(res.user);
        next();
    }
    catch(error){
        return res.status(401).json({message:"invalid token "})
    }

}