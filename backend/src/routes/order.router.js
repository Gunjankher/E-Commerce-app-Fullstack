import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";
import {upload} from '../middlerware/multer.middleware.js'
import { asyncHandler } from "../utilis/asyncHandler.js";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.controllers.js";




const router = Router()

router.route("/new").post(newOrder)
router.route("/my").get(myOrders)
router.route ("/all").get(allOrders)
router.route("/:id").get(getSingleOrder)
.put(processOrder)
.delete(deleteOrder)


// 2.33  76% 2.44 70



export default router