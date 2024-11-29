const asyncErrorHandler = require('../utils/asyncErrorHandler')
const Member = require('../model/MemberModel')
const User = require('../model/UserModel')
const Event = require('../model/EventModel')

exports.getAllStats = asyncErrorHandler(async(req,res,next)=>{
    const memberResponse = await Member.find()
    const userResponse = await User.find()
    const eventResponse = await Event.find()
    let MaleMembers,FemaleMembers,ActiveMembers,InactiveMembers,TotalMembers,TotalUsers,TotalEvents,UpcomingEvents,OngoingEvents,TotalMaleMembers,TotalFemaleMembers
    if(memberResponse){
         MaleMembers = memberResponse.filter((item)=>{
            return item.gender == 'male'
        })
         FemaleMembers = memberResponse.filter((item)=>{
            return item.gender == 'female'
        })
         ActiveMembers = memberResponse.filter((item)=>{
            return item.status == 'active'
        })
         InactiveMembers = memberResponse.filter((item)=>{
            return item.status == 'inactive'
        })
         TotalMembers = memberResponse.length
         TotalMaleMembers = MaleMembers.length
         TotalFemaleMembers = FemaleMembers.length
    }
    if(userResponse){
        TotalUsers = userResponse
    }
    if(eventResponse){
        TotalEvents = eventResponse.length
        UpcomingEvents = eventResponse.filter((item)=>{
            return item.status == 'upcoming'
        })
        OngoingEvents = eventResponse.filter((item)=>{
            return item.status == 'ongoing'
        })
    }
    res.status(200).json({
        status:'success',
        data:{
            MaleMembers:MaleMembers,
            FemaleMembers:FemaleMembers,
            ActiveMembers:ActiveMembers,
            InactiveMembers:InactiveMembers,
            TotalMembers:TotalMembers,
            TotalMaleMembers:TotalMaleMembers,
            TotalFemaleMembers:TotalFemaleMembers,
            TotalUsers:TotalUsers.length,
            TotalEvents:TotalEvents,
            UpcomingEvents:UpcomingEvents.length,
            OngoingEvents:OngoingEvents.length,
            ListUpcomingEvents:UpcomingEvents,
            ListOngoingEvents:OngoingEvents,
            ListUsers:TotalUsers
        }
    })

})