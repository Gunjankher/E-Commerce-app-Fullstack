import { asyncHandler } from "../utilis/asyncHandler.js";
import { Product } from "../models/products.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";





const newProduct = asyncHandler(async(req,res)=>{

try {
    const {name,price,stock,category,description} = req.body
    const photo = req.file;
    
    
    
     const product =  await Product.create({
        name,
        price,
        stock,
        category : category.toLowerCase(),
        photo : photo?.path
    })
    
    
    if(!product) return new ApiError(400,"Error While Creating Product")
    return res
    .status(201)
    .json(new ApiResponse (200,{},"product Created Sucessfully"))
} catch (error) {
    new ApiError(401, error.message , "can not Create Product")
}

})


export {
    newProduct
} 