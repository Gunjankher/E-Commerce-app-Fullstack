import { asyncHandler } from "../utilis/asyncHandler.js";
import {Coupon} from '../models/coupon.model.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";




const newCoupon = asyncHandler(async (req, res, next) => {
    try {
      

        const{coupon,amount} =  req.body

if(!coupon || !amount){
    return next(new ApiError(201,`fill all the fields`))
}


        await Coupon.create({code:coupon,amount})
  
      return res.status(200).json(new ApiResponse(200,  `Coupon ${coupon} Created sucessfully`));
    } catch (error) {
      console.error('Error creating Coupon :', error.message);
      return next(new ApiError(401, error.message, 'Cannot create Coupon'));
    }
  });
   
const applyDiscount = asyncHandler(async (req, res, next) => {
    try {
      

        const{coupon} =  req.query


        const discount = await Coupon.findOne({code:coupon})

        if(!discount) return next(new ApiError(401, `invalid Coupon Code`))
  
      return res.status(200).json(new ApiResponse(200,  `Coupon ${coupon} Created sucessfully`));
    } catch (error) {
      console.error('Error creating Coupon :', error.message);
      return next(new ApiError(401, error.message, 'Cannot create Coupon'));
    }
  });
   


  export {
newCoupon,
applyDiscount,
  }