import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";
import {newProduct,getlatestProducts} from '../controllers/product.controller.js'
import {singleUpload} from '../middlerware/multer.middleware.js'



const router = Router()

router.route("/new").post(adminOnly,singleUpload,newProduct)
router.route("/latest").get(getlatestProducts)


export default router