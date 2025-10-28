const mongoose=require('mongoose')

const imageSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true,
    },
    
    publicId:{
        type:String,
        required:true
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Image',imageSchema)

/*
const mongosse=require('mongoose')

const imgSchema=new mongoose.schema({
url:{
type:string,
required:true
},
publicId:{
type:string,
required:true,
},
uploadedBy:{
type:mongoose.,
ref:user,
required:false
}
},{timestamps:true})
module.exports=mongoose.model('Image',imgSchema)
 */