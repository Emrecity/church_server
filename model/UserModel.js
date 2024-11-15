const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type:String,
        require:true,
        select:false
     },
     confirmpassword:{
        type:String,
        select:false,
        validate:{
            validator:function(val){
                return val == this.password
            }
        }
        
     },
})

UserSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmpassword = undefined
    next()
 })

 const User = mongoose.model('User',UserSchema)
 module.exports = User