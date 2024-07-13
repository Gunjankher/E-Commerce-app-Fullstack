import { asyncHandler } from "../utilis/asyncHandler.js";
import {Product} from '../models/products.model.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import {rm} from 'fs'




const newProduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, price, stock, category, description } = req.body;
    const photos = req.file; // Adjusted to handle a single file

    // Log incoming data for debugging purposes
    console.log("Incoming data:", { name, price, stock, category, photos, description });

    if (!photos) {
      return next(new ApiError(401, "Please Add Photo"));
    }


    
    if (photos.length < 1)
      return next(new ApiError( 400,"Please add atleast one Photo"));

    if (photos.length > 5)
      return next(new ApiError(400,"You can only upload 5 Photos",));


    const photoObj = {
      public_id: photos.filename, // Assuming the filename is used as the public ID
      url: photos.path, // Assuming the path is used as the URL
    };

    if (!name || !price || !stock || !category || !description) {
      rm(photos.path, () => {
        console.log("Deleted");
      });
      return next(new ApiError(400, "Enter all details first"));
    }

    // Create the product
    const product = await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photos: [photoObj],
      description
    });

    // Log the created product
    console.log("Product created:", product);

    // Return the response
    return res.status(201).json(new ApiResponse(201, product, "Product Created Successfully"));
  } catch (error) {
    // Log the error if product creation fails
    console.error("Error creating product:", error.message);
    return next(new ApiError(401, error.message, "Cannot Create Product"));
  }
});


const getlatestProducts = asyncHandler(async(req,res,next)=>{

 try {
   const products = await Product.find({}).sort({createdAt : -1}).limit(5)
 
 
 
   return res.status(201).json(new ApiResponse(201, products, "Product Created Successfully"));
 
 } catch (error) {
  console.error("Error finding latest product:", error.message);
    return next(new ApiError(401, error.message, "Cannot find Product"));
 }
})




export { newProduct,getlatestProducts };