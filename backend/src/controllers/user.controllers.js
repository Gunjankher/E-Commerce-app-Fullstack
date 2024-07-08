import { asyncHandler } from "../utilis/asyncHandler.js";



const newUser = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message : "hi how are you"
    })
})


export {newUser}