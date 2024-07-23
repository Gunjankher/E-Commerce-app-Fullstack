import { asyncHandler } from "../utilis/asyncHandler.js";



const newCoupon = asyncHandler(async (req, res, next) => {
    try {
      
  
      return res.status(200).json(new ApiResponse(200, 'Coupon created successfully'));
    } catch (error) {
      console.error('Error creating Coupon :', error.message);
      return next(new ApiError(401, error.message, 'Cannot create Coupon'));
    }
  });
  


  export {
newCoupon
  }