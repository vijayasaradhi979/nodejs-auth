const Image=require('../modules/image')
const {uploadToCloud}=require('../helpers/cloudinaryHelpers')
//const { image } = require('../config/cloudinary')
const cloudinary=require('../config/cloudinary')

const uploadImage=async (req,res)=>{
    try{
        //check file is missing
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'File is required'
            })
        }

        //upload to Cloudinary
        const {url,publicId}=await uploadToCloud(req.file.path)

        const newlyUpload=new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        })

        await newlyUpload.save()

        res.status(201).json({
            success:true,
            message:'Image uploaded successfully',
            newlyUpload
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}


const fetchAllimgs=async(req,res)=>{
    try{
        const page=(req.query.page)||1;
        const limit=parseInt(req.query.limit)||5
        const skip=(page-1)*limit 

        const sortBy=req.query.sortBy || 'createdAt'
        const sortOrder=req.query.sortOrder==='asc' ? 1 : -1
        const totalImages=await Image.countDocuments()
        const totalPages=Math.ceil(totalImages/limit)

        const sortObj={}
        sortObj[sortBy]=sortOrder
        const images=await Image.find().sort(sortObj).skip(skip).limit(limit)


        if(images){
            res.status(201).json({
                success:true,
                currentPage:page,
                totalPages:totalPages,
                totalImages:totalImages,
                data:images
            })
        }

    }catch(error){
         console.log(error)
            res.status(500).json({
            success:false,
            message:'Something went wrong'
        })
    }
}

const deleteImageController=async(req,res)=>{
    try{
        const getCurrentImgId=req.params.id
        const userId=req.userInfo.userId

        const image=await Image.findById(getCurrentImgId)

        if(!image){
            return res.status(401).json({
                success:false,
                message:'Image not found'
            })
        }

        //check if this image is uploaded by the current user is deleting

        if(image.uploadedBy.toString()!==userId){
            return res.status(403).json({
                success:false,
                message:'You are not authorized to delete'
            })
        }

        //delete this image first from cloudinary
        await cloudinary.uploader.destroy(image.publicId)

        //delete the image from mongodb
        await Image.findByIdAndDelete(getCurrentImgId)

        res.status(200).json({
            success:true,
            message:'Image deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
        success:false,
        message:'Something went wrong'
        })
    }
}


module.exports={uploadImage,fetchAllimgs,deleteImageController}


/*
const Image=require(../modules/img)
const {uploadToCloud}=require('../helpers/cloudHelp')
const uploadtodb=async(req,res)=>{
    try{
    if(!req.file){
    plese upload an file
    }

    const {url,publicId}=await uploadtocloud(req.file.path)

    const newlyCreateimg=await new Image({
        url,
        publicid,
        uploadedBy:req.userInfo.userID
    })
        await newly.save()
        res.status(200).json({
            newlycReated
        })
    }catch(err){
    
    }
    }
 */

/*
const fetchAllimgs=async(req,res)=>{
    try{
        const getImages=await Images.findOne({})

        if(images){
            res.status(201).json({
            data:getImages
            })
        }

    }
}
*/