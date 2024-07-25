import { adminOnly } from "../middlerware/auth.middleware.js";
import {singleUpload} from '../middlerware/multer.middleware.js'
import { asyncHandler } from "../utilis/asyncHandler.js";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from "../controllers/order.controllers.js";





const router = Router()

router.route("/new").post(newOrder)



export default router