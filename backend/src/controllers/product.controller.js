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

const getAllCategories = asyncHandler(async(req,res,next)=>{

 try {

 const categories = await Product.distinct("category")
 
 
   return res.status(201).json(new ApiResponse(201, categories, "Categories Found Successfully"));
 
 } catch (error) {
  console.error("Error finding latest categories:", error.message);
    return next(new ApiError(401, error.message, "Cannot find  categories"));
 }
})



const getAdminProducts = asyncHandler(async(req,res,next)=>{

  try {
    const products = await Product.find({})
    return res.status(201).json(new ApiResponse(201, products, "Admin Product Founded"));
  
  } catch (error) {
   console.error("Error finding latest product:", error.message);
     return next(new ApiError(401, error.message, "Cannot find Admin Product"));
  }
 })



 const getSingleProduct = asyncHandler(async(req,res,next)=>{

  try {
    const product = await Product.findById(req.params.id)
  
  
  
   if(product)return res.status(201).json(new ApiResponse(201, product, "Product  Successfully"));
  if(!product) return next(new ApiError(401, error.message, "Cannot find Product"));


  } catch (error) {
   console.error("Error finding latest product:", error.message);
     return next(new ApiError(401,  "Cannot find Product"));
  }
 })




 const updateProduct = asyncHandler(async (req, res, next) => {
  try {

    const {id} = req.params
    const { name, price, stock, category, description } = req.body;
    const photos = req.file; // Adjusted to handle a single file

const findProducts = await Product.findById(id)



if(!findProducts) return next(new ApiError(404 , "invalid  Product Id"))


  
    if (photos) {
      const photoObj = {
        public_id: photos.filename, // Assuming the filename is used as the public ID
        url: photos.path, // Assuming the path is used as the URL
      };

      if (findProducts.photos && findProducts.photos.url) {
        rm(findProducts.photos.url, (err) => {
          if (err) {
            console.error("Error deleting old photo:", err.message);
          } else {
            console.log("Old photo deleted");
          }
        });
      }

      findProducts.photos = photoObj;
    }

if(name) findProducts.name = name
if(price) findProducts.price = price
if(stock)findProducts.stock = stock
if(category)findProducts.category = category

await findProducts.save()


    // Return the response
    return res.status(201).json(new ApiResponse(201, findProducts, "Product Updated Successfully"));
  } catch (error) {
    // Log the error if product creation fails
    console.error("Error Updating product:", error.message);
    return next(new ApiError(401, error.message, "Cannot Update Product"));
  }
});



const deleteProduct = asyncHandler(async(req,res,next)=>{

  try {
    const product = await Product.findById(req.params.id)
  
    if(!product) return next(new ApiError(404 , "invalid  Product Id"))
  

      if (product.photos && product.photos.url) {
        rm(product.photos.url, (err) => {
          if (err) {
            console.error("Error deleting product photo:", err.message);
          } else {
            console.log("Product photo deleted");
          }
        });
      }
await Product.deleteOne()


    return res.status(201).json(new ApiResponse(201, "Product deleted Successfully"));
  
      
}catch (error) {
   console.error("Error deleting  product:", error.message);
     return next(new ApiError(401, error.message, "Cannot delete Product"));
  }
 })




 const getAllProducts = asyncHandler(async(req,res,next)=>{
try {
  
  const {search ,sort, category,price} = req.query
  const page = Number(process.env.PRODUCT_PER_PAGE) || 8
  const skip = (page-1)*limit



  

} catch (error) {
  
  console.error("Error deleting  product:", error.message);
       return next(new ApiError(401, error.message, "Cannot delete Product"));
}

 })


export { newProduct,getlatestProducts,getAllCategories,getAdminProducts,getSingleProduct,updateProduct,deleteProduct};