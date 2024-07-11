import { asyncHandler } from "../utilis/asyncHandler.js";
import {Product} from '../models/products.model.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";




const newProduct = asyncHandler(async (req, res) => {
    try {
      const { name, price, stock, category,description } = req.body;
      const photos = req.file;
  
      // Log incoming data for debugging purposes
      console.log("Incoming data:", { name, price, stock, category, photos,description });
  
      // Create the product
      const product = await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photos: photos?.url,
        description
      });
  
      // Log the created product
      console.log("Product created:", product);
  
      // Return the response
      return res
        .status(201)
        .json(new ApiResponse(201, product, "Product Created Successfully"));
    } catch (error) {
      // Log the error if product creation fails
      console.error("Error creating product:", error.message);
      return res.status(401).json(new ApiError(401, error.message, "Cannot Create Product"));
    }
  });
  
  export { newProduct };