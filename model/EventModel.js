const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title:String,
    description:String,
    venue:String,
    speaker:String,
    category:String,
    status:String,
    date:Date, 
    time:String
})

const Event = mongoose.model('events',EventSchema)
module.exports = Event