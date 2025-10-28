const Image=require('../modules/image')
const {uploadToCloud}=require('../helpers/cloudinaryHelpers')

const uploadImage=async(req,res)=>{
    try{
        //chek if file is missing
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'file is reqired plz upload an image'
            })
        }

        //upload to cloudinary

        const {url,publicId}=await uploadToCloud(req.file.path)

        //store to mongo

        const newlyUploaded= new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        })

        await newlyUploaded.save()

        res.status(201).json({
            success:true,
            message:'Image uploaded to db',
            newlyUploaded
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:'something went wrong'
        })
    }
}

module.exports={uploadImage}