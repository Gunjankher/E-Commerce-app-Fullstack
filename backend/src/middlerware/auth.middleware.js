import { asyncHandler } from "../utilis/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utilis/ApiError.js";


const adminOnly = asyncHandler(async(req,res,next)=>{
    try {
        
const {id} = req.query

if(!id) return next(new ApiError(400,"login first"))

    const user = await User.findById(id)
if(!user) return next(new ApiError(401,"your id is fake"))

    if(user.role !== "admin") return new ApiError(401, "you are not Admin")

        next()
    } catch (error) {
       next( new ApiError(401, error.message, "You are not Admin"))
    }
})


export {adminOnly}