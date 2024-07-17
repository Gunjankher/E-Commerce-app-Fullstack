import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";
import {newProduct,getlatestProducts, getAllCategories, getAdminProducts, getSingleProduct, updateProduct, deleteProduct, getAllProducts} from '../controllers/product.controller.js'
import {singleUpload} from '../middlerware/multer.middleware.js'
import { asyncHandler } from "../utilis/asyncHandler.js";




const router = Router()

router.route("/new").post(adminOnly,singleUpload,newProduct)
router.route("/latest").get(getlatestProducts)
router.route("/categories").get(getAllCategories)
router.route("/admin-products").get(getAdminProducts)
router.route("/:id").get(getSingleProduct).put(adminOnly,singleUpload,updateProduct).delete(adminOnly,deleteProduct)
router.route("/all").get(getAllProducts)

// 2.33  76% 2.44 70


router.get('/:id', asyncHandler(async (req, res, next) => {
    try {
      const productId = req.params.id;
  
      // Validate productId is a valid ObjectId before querying
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid product ID format');
      }
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error finding product:', error.message);
      return next(new ApiError(400, error.message));
    }
  }));


export default router