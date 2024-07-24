import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";
import { newCoupon } from "../controllers/coupon.controllers.js";







const router = Router()

router.route("/coupon/new").post(newCoupon)
router.route("/discount").post(newCoupon)


export default router