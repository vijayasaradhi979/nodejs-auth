require('dotenv').config();
const express=require("express")
const app =express()
const connectToDb=require('../auth/database/db')
const authRoutes=require('../auth/routes/route')
const homeRoutes=require('../auth/routes/home-routes')
const adminRoutes=require('../auth/routes/admin-routes')
const imgRoutes=require('../auth/routes/imageRoutes')

connectToDb()

app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/home',homeRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/image',imgRoutes)

app.listen(3000,()=>{
    console.log("server is Running")
})