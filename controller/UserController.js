 const asyncErrorHandler = require('../utils/asyncErrorHandler')
const User = require('../model/UserModel')

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