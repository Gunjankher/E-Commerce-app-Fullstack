import { asyncHandler } from "../utilis/asyncHandler.js";
import {User} from '../models/user.model.js'
import {ApiError} from '../utilis/ApiError.js'
import {ApiResponse} from '../utilis/ApiResponse.js'



const newUser = asyncHandler(async(req,res)=>{
  
    const {name,email,photo,gender,_id,dob}  = req.body

   if(
    [name,email,photo,gender,_id, dob].some((field)=>field?.trim()=== "")
   ){throw new ApiError(400,"All Fields are required")}


   let user = await User.findById(_id)


   if (user)
    return res.status(200).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });


user = await User.create({
    name,
    email,
    photo,
    gender,
    _id,
    dob: new Date(dob),
})


   if(user)
    return res
.status(201)
.json( new ApiResponse (200, `welcome,${user.name}`))

})




export {newUser}