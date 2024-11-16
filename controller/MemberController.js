const asyncErrorHandler = require('../utils/asyncErrorHandler')
const Member = require('../model/MemberModel')

exports.createMember = asyncErrorHandler(async(req,res,next)=>{
    const {firstname} = req.body
    console.log(`Hello ${firstname}!`)
    if(firstname){
        await Member.create(req.body)
        res.status(201).json({
            status:'success',
            message:'Member created successfully'
        })
    }
    if(!firstname){
        res.send('Name is required')
    }
})

exports.getAllMember = asyncErrorHandler(async(req,res,next)=>{
    const response = await Member.find()
    if(response){
        res.status(200).json({
            status:'success',
            data:response
        })
    }
   if(!response){
        res.status(200).json({
            status:'failed',
            message: response
        })
   }
})

exports.getMember = asyncErrorHandler(async(req,res,next)=>{
    const user = await Member.findById(req.params.id)
    if(user){
        res.status(200).json({
            status:'success',
            data:user
        })
    }
    if(!user){
        res.status(404).json({
            status:'error',
            message:'Member not found'
        })
    }
})

exports.updateMember = asyncErrorHandler(async(req,res,next)=>{
   const {id} = req.params
   const {firstname,lastname,othername,dateOfBirth,gender,role,status,phone,ageRange} = req.body
   const response = await Member.findByIdAndUpdate(id,{$set:{firstname:firstname,lastname:lastname,othername:othername,phone:phone,dateOfBirth:dateOfBirth,status:status,gender:gender,ageRange:ageRange,role:role}})
   if(response){
    res.status(200).json({
        status:'success',
        message:'Member updated successfully'
    })
   }
   if(!response){
    res.status(400).json({
        status:'failed',
        message: response
    })
   }
})

exports.deleteMember = asyncErrorHandler(async(req,res,next)=>{
    const response = await Member.findByIdAndDelete(req.params.id)
    if(response){
        res.status(200).json({
            status:'success',
            message:'Member Deleted'
        })
    }
    if(!response){
        res.status(400).json({
            status:'failed',
            message:response
        })
    }
})