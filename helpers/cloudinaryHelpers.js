const cloudinary=require('../config/cloudinary')
require('dotenv').config();

const uploadToCloud=async(filePath)=>{
    try{
        const result=await cloudinary.uploader.upload(filePath)

        return{
            url:result.secure_url,
            publicId:result.public_id
        }
    }catch(error){
        console.error('Error while uploading to cloudinary',error)
        throw new Error(`Error while uploading`)
    }
}


module.exports={
    uploadToCloud
}

/*
const cloudinary=require('cloudinary')
const uploadtoCloud=async(filepath)=>{
    try{
    const res=await cloudinary.uploader.upload(filePath)
    return{
        url:res.url,
        publicId:res.publicId
    }
    }catch(error){

    }
    }
 */