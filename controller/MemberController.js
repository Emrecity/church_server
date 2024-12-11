const asyncErrorHandler = require('../utils/asyncErrorHandler')
const Member = require('../model/MemberModel')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dtrnp3ons', 
    api_key: '413841558647888', 
    api_secret: '_h7uBz5-Plhj1iVgJbAtaDzWego'
  });


exports.createMember = asyncErrorHandler(async(req,res,next)=>{
        let response
        const {firstname} = req.body
        console.log(firstname)
        if(firstname){
            if(req.file){
              response = await cloudinary.uploader.upload(req.file.path, {
              folder: 'images',
            })
             if(response){
                req.body.image = response.secure_url
             }
            }
            const result = await Member.create(req.body)
            if(result){
                res.status(201).json({
                    status:'success',
                    message:'Member created successfully'
                })
            }
            if(!result){
                res.status(400).json({status:'failed',message:`Member can't be created`}) 
            }

        }
        if(!firstname){
            res.json({status:'failed',message:'Name is required'})
        }
    
        // const image = req.files.image[0];
        // try{
        //     const response= await cloudinary.uploader.upload(image.path, {
        //       folder: 'images',
        //     })
        //     req.body.image = response.secure_url
        //     const {firstname} = req.body
        //     if(firstname){
        //         await Member.create(req.body)
        //         res.status(201).json({
        //             status:'success',
        //             message:'Member created successfully'
        //         })
        //     }
        //     if(!firstname){
        //         res.send('Name is required')
        //     }
            
        //     // res.status(201).json({image: {public_id: response.public_id, url: response.secure_url}});
        //   }catch {
        //     res.status(500).json({ error: 'Internal Server Error' });
        //   }
        //   finally {
        //     fs.unlinkSync(image.path);
        //   }
    
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
   if(req.file){
   const result = await cloudinary.uploader.upload(req.file.path, {
    folder: 'images',
  })
   if(result){
      req.body.image = result.secure_url
   }
  }
   const {firstname,lastname,othername,dateOfBirth,gender,role,status,phone,ageRange,image} = req.body
   const response = await Member.findByIdAndUpdate(id,{$set:{firstname:firstname,lastname:lastname,othername:othername,phone:phone,dateOfBirth:dateOfBirth,status:status,gender:gender,ageRange:ageRange,role:role,image:image}})
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

exports.loginMember = asyncHandler(async (req,res)=>{
    const {firstname,phone} = req.body
    const response = await Member.findOne({firstname:firstname,phone:phone})
    if(response){
        res.status(200).json({
            status:'success',
            message:'Login Successful',
            data:response
        })
    }
    if(!response){
        res.status(400).json({
            status:'failed',
            message:'Login Failed'
        })
    }
})