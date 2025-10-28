const express=require('express')
const authMIddle=require('../middleware/auth.middleware')
const adminMiddle=require('../middleware/admin-middleware')
const imgMiddleWare=require('../middleware/img-middleware')
const {uploadImage,fetchAllimgs, deleteImageController}=require('../controller/img-controller')
//const fetchAllimgs=require('../controller/img-controller')
const router=express.Router()

router.post('/upload',authMIddle,adminMiddle,imgMiddleWare.single('image'),uploadImage)

router.get('/images',authMIddle,fetchAllimgs)

router.delete('/:id',authMIddle,adminMiddle,deleteImageController)
//68ff37c661ac63a2792b3e43
module.exports=router