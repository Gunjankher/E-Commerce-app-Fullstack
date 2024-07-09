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
      message: `Welcome, ${user}`
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



const getAllUsers = asyncHandler(async(req,res)=>{
      const users = await User.find({})

      if(users)
        return res
    .status(201)
    .json(new ApiResponse (200,users))

})


const getUser = asyncHandler(async (req,res)=>{
    const id = req.params.id 
    const user =  await User.findById(id)

if(!user){
     new ApiError(400, "User is not Found")
}else{
    return res
    .status(200)
    .json(new ApiResponse(200,user,"User Found SucessFully"))
}

})


const deleteUser = asyncHandler(async(req,res)=>{
    try {
        
const id = req.params.id

const user = await User.findByIdAndDelete(id)

if(!user){
     return new ApiError(400, "User is not Found")
}
return res
.status(200)
.json(new ApiError(200, {}, "User Deleted SucessFully"))
} catch (error) {
        throw new ApiError(error.message , "Cannot delete User")
    }
})

export {
    newUser,
    getAllUsers,
    getUser,
    deleteUser,

}