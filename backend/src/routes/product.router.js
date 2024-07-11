import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";
import { newProduct } from "../controllers/product.controller.js";
import {singleUpload} from '../middlerware/multer.middleware.js'



const router = Router()

router.route("/new").post(singleUpload,newProduct)


export default router