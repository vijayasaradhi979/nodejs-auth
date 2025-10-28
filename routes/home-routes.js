const express=require('express')
const authMIddle=require('../middleware/auth.middleware')
const router=express.Router()


router.get('/welcome',authMIddle,(req,res)=>{
    const {userName,userId,role}=req.userInfo;

    res.status(201).json({
        message:'welcome to home page',
        user:{
            _id:userId,
           username:userName,
            role:role
        }
    })
})








// router.get('/welcome',authMIddle,(req,res)=>{
//     const {userName,userId,role}=req.userInfo;
//     res.json({
//         message:'Welcome to home Page',
//         user:{
//             _id:userId,
//             username:userName,
//             role:role
//         }
//     })
// })

module.exports=router