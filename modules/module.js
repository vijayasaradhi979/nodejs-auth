const mongoose=require('mongoose')

const authSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,'title is required'],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }

},{timestamps:true})

module.exports=mongoose.model('User',authSchema)