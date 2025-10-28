

const isadmin=(req,res,next)=>{
    if(req.userInfo.role!=='admin'){
        return res.status(403).json({
            success:false,
            message:'access denied adimn rights'
        })
    }
    next()
}





// const isadmin=(req,res,next)=>{
//     if(req.userInfo.role !== 'admin'){
//         return res.status(403).json({
//             message:false,
//             message:'Admin should Log'
//         })
//     }
//     next()
// }

module.exports=isadmin