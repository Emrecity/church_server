const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    othername:String,
    phone:{
        type:String,
        unique:true
    },
    status:String,
    gender:{
        type: String,
        enum:['male','female']
    },
    image:{
       type:String,
       default:''
    },
    role:{
        type:[String],
        default:'member',
        tolowercase:true
    },
    dateOfBirth:Date,
    ageRange: String
})

const Member = mongoose.model('members',MemberSchema)

module.exports = Member