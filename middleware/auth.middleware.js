const jwt=require('jsonwebtoken')

const authMiddle=(req,res,next)=>{
    const authHeader=req.headers['authorization']

    const token=authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(400).json({
            success:false,
            message:'Please Provide Token'
        })
    }

    try{
        const verifyBearer=jwt.verify(token,'JWT_TOKEN_KEY')

        req.userInfo=verifyBearer

        next();
    }catch(e){
        res.status(501).json({
            success:false,
            message:'access denied'
        })
    }


}








// const authMiddle=(req,res,next)=>{
//     const authHeader=req.headers['authorization']
//     console.log(authHeader)
//     const token=authHeader && authHeader.split(" ")[1]

//     if(!token){
//         return res.status(401).json({
//             success:false,
//             message:'access denied no token provied'
//         })
//     }

//     //decode info

//     try{
//         const decodetoken=jwt.verify(token,'JWT_SECRECT_KEY')
//         console.log(decodetoken)

//         req.userInfo=decodetoken
//         next();
//     }
    
//     catch(err){
//         return res.status(500).json({
//             success:false,
//             message:'access denied no token provied'
//         })
//     }
// }

module.exports=authMiddle