import { asyncHandler } from "../utilis/asyncHandler.js";
import {Product} from '../models/products.model.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import {rm} from 'fs'
import mongoose from "mongoose";
import { myCache } from "../app.js";
import { invalidateCache } from "../utilis/invalidateCache.js";




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

    await invalidateCache({product:true,admin:true})

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

// revavidate on new update and delete product and new order 
const getlatestProducts = asyncHandler(async(req,res,next)=>{

 try {

  let products;
if(myCache.has("latest-products"))
  products = JSON.parse(myCache.get("latest-products"))
else{
  products = await Product.find({}).sort({createdAt : -1}).limit(5)
myCache.set("latest-products",JSON.stringify(products))
}
 
   return res.status(201).json(new ApiResponse(201, products, "Product Created Successfully"));
 
 } catch (error) {
  console.error("Error finding latest product:", error.message);
    return next(new ApiError(401, error.message, "Cannot find Product"));
 }
})

const getAllCategories = asyncHandler(async(req,res,next)=>{

 try {

  let categories;
   if(myCache.has("categories"))
    categories = JSON.parse(myCache.get("categories"))
  else{

    categories = await Product.distinct("category")
    myCache.set("categories",JSON.stringify(categories))
  }
 
 
   return res.status(201).json(new ApiResponse(201, categories, "Categories Found Successfully"));
 
 } catch (error) {
  console.error("Error finding latest categories:", error.message);
    return next(new ApiError(401, error.message, "Cannot find  categories"));
 }
})



const getAdminProducts = asyncHandler(async(req,res,next)=>{

  try {

    let products;
    if(myCache.has("all-products"))
      products = JSON.parse(myCache.get("all-products"))
else{

  products = await Product.find({})
  myCache.set("all-products",JSON.stringify(products))
}


    return res.status(201).json(new ApiResponse(201, products, "Admin Product Founded"));
  
  } catch (error) {
   console.error("Error finding latest product:", error.message);
     return next(new ApiError(401, error.message, "Cannot find Admin Product"));
  }
 })



 const getSingleProduct = asyncHandler(async (req, res, next) => {
  try {
const id = req.params.id
let product;
if(myCache.has(`product-${id}`))
product = JSON.parse(myCache.get(`product-${id}`))
  else{
 product = await Product.findById(id);
 myCache.set(`product-${id}`,JSON.stringify(product))
}
  

    if (!product) return next(new ApiError(404, "Cannot find Product"));

    return res.status(201).json(new ApiResponse(201, product, "Product Found Successfully"));
  } catch (error) {
    console.error("Error finding product:", error.message);
    return next(new ApiError(401, "Cannot find Product"));
  }
});




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



await invalidateCache({product:true,productId:String(product._id),admin:true})

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

await invalidateCache({product:true,productId:String(product._id),admin:true})
    return res.status(201).json(new ApiResponse(201, "Product deleted Successfully"));
  
      
}catch (error) {
   console.error("Error deleting  product:", error.message);
     return next(new ApiError(401, error.message, "Cannot delete Product"));
  }
 })




 const getAllProducts = asyncHandler(async(req,res,next)=>{
try {
  
  const {search ,sort, category,price} = req.query
  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8
  const page = Number(req.query.page) || 1;
  const skip = (page-1)*limit

const  baseQuery = {}

 if(search)
  baseQuery.name = {
    $regex : search,
    $options :"i"
    }


    if(price)
      baseQuery.price  = {
        $lte :Number(price)
      }

      if(category) baseQuery.category = category


      const productPromise = Product.find(baseQuery).sort(
        sort && {price : sort === "asc"? 1 : -1})
        .limit(limit)
        .skip(skip)
 
const [products,filteredOnlyProducts] = await Promise.all([
  productPromise,
     Product.find(baseQuery)
])

  const totalPage = Math.ceil(filteredOnlyProducts.length / limit)

      // Return the response
      return res.status(201).json(new ApiResponse(201, [products,],"Product Searched Sucessfullyy"));

} catch (error) { 
  
  console.error("Error Searching  product:", error.message);
       return next(new ApiError(401, error.message, "Cannot search Product"));
}

 })


export { newProduct,getlatestProducts,getAllCategories,getAdminProducts,getSingleProduct,updateProduct,deleteProduct,getAllProducts};