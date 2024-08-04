import jwt from "jsonwebtoken"
const gtasc=(userId,res)=>{
    const token= jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '100d'
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:100*24*60*60*1000,
        sameSite:"strict",
    })
    return token
}
export default gtasc