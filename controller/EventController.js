const Event = require('../model/EventModel')
const asyncErrorHandler = require('../utils/asyncErrorHandler')

exports.createEvent = asyncErrorHandler(async(req,res,next)=>{
    const {title} = req.body
    console.log(`Hello ${title}!`)
    if(title){
        await Event.create(req.body)
        res.status(201).json({
            status:'success',
            message:'Event created successfully'
        })
    }
    if(!title){
        res.send('Title is required')
    }
})

exports.getAllEvent = asyncErrorHandler(async(req,res,next)=>{
    const response = await Event.find()
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

exports.getEvent = asyncErrorHandler(async(req,res,next)=>{
    const user = await Event.findById(req.params.id)
    if(user){
        res.status(200).json({
            status:'success',
            data:user
        })
    }
    if(!user){
        res.status(404).json({
            status:'error',
            message:'Event not found'
        })
    }
})

exports.updateEvent = asyncErrorHandler(async(req,res,next)=>{
   const {id} = req.params
   const {title,description,venue,speaker,category,status,date,time} = req.body
   const response = await Event.findByIdAndUpdate(id,{$set:{title:title,description:description,venue:venue,speaker:speaker,category:category,status:status,date:date,time:time}})
   if(response){
    res.status(200).json({
        status:'success',
        message:'Event updated successfully'
    })
   }
   if(!response){
    res.status(400).json({
        status:'failed',
        message: response
    })
   }
})

exports.deleteEvent = asyncErrorHandler(async(req,res,next)=>{
    const response = await Event.findByIdAndDelete(req.params.id)
    if(response){
        res.status(200).json({
            status:'success',
            message:'Event Deleted'
        })
    }
    if(!response){
        res.status(400).json({
            status:'failed',
            message:response
        })
    }
})