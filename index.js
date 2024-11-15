const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const SwaggerDocs = require('./utils/swagger')
const CustomError = require('./utils/CustomError')
const UserRoute = require('./route/UserRoute')
const MemberRoute = require('./route/MemberRoute')
const EventRoute = require('./route/EventRoute')
const cors = require('cors')

const CorsOptions ={
    origin:'https://church-client-git-main-emmanuels-projects-9cf1ec29.vercel.app/',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus:204
}

const app = express()
app.use(express.json({limit:'25KB'}))
app.use(express.urlencoded({limit:'25KB',extended:true}))
app.use(cors(CorsOptions))
app.use(express.raw({limit:'25KB'}))
app.use(morgan('dev'))
app.use('/api/v1/user',UserRoute)
app.use('/api/v1/member',MemberRoute)
app.use('/api/v1/event',EventRoute)
const port = 3000

const Swagger = SwaggerDocs(app)

mongoose.connect("mongodb://localhost:27017/PresbyDb").then(()=>{
    console.log('Db connected')
    app.listen( port,()=>{
    console.log('Server is up and running')  
    Swagger  
})
}).catch((err)=>{
    console.log(err)
})

app.all('*',(req,res,next)=>{
    const err = new CustomError(`can't find ${req.originalUrl} on server`,404)
    next(err)
})