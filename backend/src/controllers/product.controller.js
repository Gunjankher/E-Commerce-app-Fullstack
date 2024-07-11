import { asyncHandler } from "../utilis/asyncHandler.js";
import {Product} from '../models/products.model.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";





const newProduct = asyncHandler(async (req, res) => {
    try {
      const { name, price, stock, category } = req.body;
      const photos = req.file;
  

      await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photos: photos?.path,
      })
  
      return res
        .status(201)
        .json(new ApiResponse(201, "Product Created Successfully"));
    } catch (error) {
      return res.status(401).json(new ApiError(401, error.message, "Cannot Create Product"));
    }
  });
  
  export { newProduct };