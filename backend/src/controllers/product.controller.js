import { asyncHandler } from "../utilis/asyncHandler.js";
import { Product } from "../models/products.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";





const newProduct = asyncHandler(async(req,res)=>{

try {
    const {name,price,stock,category} = req.body
    const photo = req.file;
    
    
    
    await Product.create({
        name,
        price,
        description,
        stock,
        category: category.toLowerCase(),
        photo: photo.path,
      });
    



    return res
    .status(201)
    .json(new ApiResponse (200,{},"product Created Sucessfully"))
} catch (error) {
    new ApiError(401, error.message, "can not Create Product")
}

})


export {
    newProduct
} 