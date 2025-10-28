const express=require('express')
const {registerUser,login,changePassword}=require('../controller/control')
const authMiddle=require('../middleware/auth.middleware')
const router=express.Router()


router.post('/register',registerUser)
router.post('/login',login)
router.post('/change-password',authMiddle,changePassword)

module.exports=router