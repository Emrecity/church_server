 const asyncErrorHandler = require('../utils/asyncErrorHandler')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = asyncErrorHandler(async(req,res,next)=>{
    const {fullname,email} = req.body
    console.log(`Hello ${fullname}! Your email is ${email}`)
    if(fullname){
        await User.create(req.body)
        res.status(201).json({
            status:'success',
            message:'User created successfully'
        })
    }
    if(!fullname){
        res.send('Name is required')
    }
})

exports.getAllUsers = asyncErrorHandler(async(req,res,next)=>{
    const users = await User.find()
    if(users){
        res.status(200).json({
            status:'success',
            data:users
        })
    }
    if(!users){
        res.status(404).json({
            status:'error',
            message:'No users found'
        })
    }
})

exports.getUser = asyncErrorHandler(async(req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(user){
        res.status(200).json({
            status:'success',
            data:user
        })
    }
    if(!user){
        res.status(404).json({
            status:'error',
            message:'User not found'
        })
    }
})

exports.updateUser = asyncErrorHandler(async(req,res,next)=>{
   const {id} = req.params
   const {fullname,email} = req.body
   const response = await User.findByIdAndUpdate(id,{$set:{fullname:fullname,email:email}})
   if(response){
    res.status(200).json({
        status:'success',
        message:'User updated successfully'
    })
   }
   if(!response){
    res.status(400).json({
        status:'failed',
        message: response
    })
   }
})

exports.deleteUser = asyncErrorHandler(async(req,res,next)=>{
    const response = await User.findByIdAndDelete(req.params.id)
    if(response){
        res.status(200).json({
            status:'success',
            message:'User Deleted'
        })
    }
    if(!response){
        res.status(400).json({
            status:'failed',
            message:response
        })
    }
})

exports.login = asyncErrorHandler(async(req,res,next)=>{
    const data = req.body
    const user = await User.findOne({email:data.email}).select('+password')
   
    if(!user ){
     res.status(404).json({
         status:'fail',
         message:'User not found'
             })
     }
     if(user && !(await bcrypt.compare(data.password,user.password))){
         res.status(404).json({
             status:'fail',
             message:'Wrong Password'
         })
     }
     const Nuser = await User.findOne({email:data.email}) 
     if(Nuser && (await bcrypt.compare(data.password,user.password))){
       const id = Nuser.id
        //  const token = await jwt.sign({id},process.env.SCRETE_STR)
         res.json({
             status:'success',
            //  token,
             data:Nuser
         })
     }
    
  
 })
 
 exports.forgotPassword=asyncErrorHandler(async(req,res,next)=>{
     const email = req.body.email
      const user = await User.findOne({email}).where('status').equals('active')
    if(!user ){
         res.status(404).json({
             status:'fail',
             message:'User not found'
                 })
     }
    if(user){
     const id = user._id
    //  const token = await util.promisify(jwt.sign)({id},process.env.SCRETE_STR)
     res.status(200).json({
         status:'success',
        //  token,
         id
     })
     }
 
 })
 
//  exports.resetPassword= asyncErrorHandler(async(req,res,next)=>{
//     const token = req.headers.authorization
//     const data = req.body
//     const decodeToken = token.split(" ")[1]
//     if(decodeToken){
//        const verifyToken = jwt.verify(decodeToken,process.env.SCRETE_STR)
//        if(verifyToken && (data.password == data.confirmpassword)){
//          const id = verifyToken.id
//          const password = await bcrypt.hash(data.password,12)
//          const response = await User.updateOne({_id:id},{$set:{password:password}})
//          if(!response){
//              res.status(400).json({
//                  status:'fail',
//                  message:'Update fail'
//              })
//          }
//          if(response){
//              res.status(200).json({
//                  status:'success',
//                  message:'Update successful'
//              })
//          }
//        }else{
//          res.status(405).json({
//              status:'fail',
//              message:'Incorrect confirm password'
//          })
//        }
//     }
//  })