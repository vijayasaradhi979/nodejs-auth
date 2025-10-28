const mongoose=require('mongoose')

const connectToDb=async()=>{
    try{
        await mongoose.connect('mongodb+srv://kyathamvijayasaradhi:kyathamvijayasaradhi@cluster0.jzwl1no.mongodb.net/')
        console.log('database Connected')
    }catch(e){
        console.error('database failed')
        process.exit(1)
    }
}

module.exports=connectToDb