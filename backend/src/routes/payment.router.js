import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";
import { allCoupons, applyDiscount, createPaymentIntent, deleteCoupon, getCoupon, newCoupon, updateCoupon } from "../controllers/coupon.controllers.js";







const router = Router()



router.route("/create").post(createPaymentIntent)
router.route("/coupon/new").post(adminOnly,newCoupon)
router.route("/discount").get(applyDiscount)
router.route("/coupon/all").get(adminOnly,allCoupons)
router.route("/coupon/all").get(adminOnly,allCoupons)
router.route("/coupon/:id").get(adminOnly,getCoupon).put(adminOnly,updateCoupon).delete(adminOnly,deleteCoupon)



export default router