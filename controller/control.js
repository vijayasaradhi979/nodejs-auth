//const { use } = require('react')
const User=require('../modules/module')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const { use } = require('react')

//register


const registerUser=async(req,res)=>{
    try{

        const {userName,email,password,role}=req.body

       const checkExist=await User.findOne({$or : [{userName},{email}]})

        if(checkExist){
            return res.status(400).json({
                success:false,
                message:'Already'
            })
        }

        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)

        const newCreateUser=await new User({
            userName,
            email,
            password:hash,
            role:role || 'user'
        })

        await newCreateUser.save()

        if(newCreateUser){
            res.status(200).json({
                success:true,
                message:'successfully register'
            })
        }
    }catch(e){
        res.status(500).json({
            success:false,
            message:'Unable to register'
        })
    }
}


const login=async(req,res)=>{
    try{
        const {userName,password}=req.body

        const user=await User.findOne({userName})

        if(!user){
            res.status(401).json({
                success:false,
                message:'Plz register'
            })
        }

        const verfiyPass=await bcrypt.compare(password,user.password)

        if(!verfiyPass){
            res.status(400).json({
                success:false,
                message:'wrong password'
            })
        }

        const accessToken=jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role
        },'JWT_TOKEN_KEY',{expiresIn:'15m'})

        res.status(200).json({
            success:true,
            message:'login Success',
            accessToken
        })
    }catch(e){
         console.log(e)
         res.status(501).json({
            success:false,
            message:'unable to change'
        })
    }
}


const changePassword=async(req,res)=>{
    try{
        const userId=req.userInfo.userId
        
        const {oldPassword,newPassword}=req.body

        const user=await User.findById(userId)

        if(!user){
            return res.status(401).json({
                success:false,
                message:'user not found'
            })
        }
        //check if old pass is correct
        const isPasswordMatch=await bcrypt.compare(oldPassword,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:'Old password is wrong'
            })
        }

        //hash the new password

        const salt=await bcrypt.genSalt(10)
        const newHash=await bcrypt.hash(newPassword,salt)

        //Update user Password

        user.password=newHash
        await user.save()

        res.status(201).json({
            success:true,
            message:'Password changed successfully'
        })


    }catch(e){
        console.log(e)
         res.status(501).json({
            success:false,
            message:'unable to change'
        })
    }
}































// const registerUser=async(req,res)=>{
//     try{
//         //extract user info for request body

//         const {userName,email,password,role}=req.body

//         //check user exist
//         const checkExist=await User.findOne({$or : [{userName},{email}]})

//         if(checkExist){
//             return res.status(400).json({
//                 success:false,
//                 message:'already User Exist'
//             })
//         }

//         //hash user pass
//         const salt=await bcrypt.genSalt(10);
//         const hashedpass=await bcrypt.hash(password,salt)

//         //create a new user
//         const newCreateUser=new User({
//             userName,
//             email,
//             password:hashedpass,
//             role:role || 'user'
//         })

//         await newCreateUser.save()

//         if(newCreateUser){
//             res.status(201).json({
//                 success:true,
//                 message:'user register sucessfully'
//             })
//         }else{
//             res.status(400).json({
//                 success:false,
//                 message:'unable to register the user'
//             })
//         }


//     }catch(e){
//         console.log(e)
//         res.status(500).json({
//             success:false,
//             message:'something went wrong'
//         })
//     }
// }


// //login

// const loginUser=async(req,res)=>{
//     try{
//         const {userName,password}=req.body

//         //find if current user is exist
//         const user=await User.findOne({userName})

//         if(!user){
//             res.status(400).json({
//             success:false,
//             message:'user not found'
//         })
//         }

//         //check pass is correct 

//         const isPass=await bcrypt.compare(password,user.password)

//         if(!isPass){
//             res.status(400).json({
//             success:false,
//             message:'wrong pass'
//         })
//         }
//         //create user token
//         const accessToken=jwt.sign({
//             userId:user._id,
//             userName:user.userName,
//             role:user.role
//         },'JWT_SECRECT_KEY',{
//             expiresIn:'15m' 
//         })

//         res.status(200).json({
//             success:true,
//             message:'Login Success',
//             accessToken
//         })


//     }catch(e){
//         console.log(e)
//         res.status(500).json({
//             success:false,
//             message:'something went wrong'
//         })
//     }
// }


module.exports={login,registerUser,changePassword}