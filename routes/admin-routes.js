const express=require('express')
const router=express.Router()
const authMIddle=require('../middleware/auth.middleware')
const adminMiddle=require('../middleware/admin-middleware')

router.get('/welcome',authMIddle,adminMiddle,(req,res)=>{
    res.json({
        message:'welcome to admin page'
    })
})

module.exports=router