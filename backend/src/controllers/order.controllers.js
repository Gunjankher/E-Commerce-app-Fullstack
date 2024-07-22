import { Order } from "../models/order.model.js";
import { Product } from "../models/products.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { invalidateCache, reduceStock } from "../utilis/invalidateCache.js";






const newOrder = asyncHandler(async(req,res,next)=>{

try {
  
      const {
          shippingInfo,
          orderItems,
          user,
          subtotal,
          tax,
          shippingCharges,
          discount,
          total,
        } = req.body;
    
    
        const order = await Order.create({
          shippingInfo,
          orderItems,
          user,
          subtotal,
          tax,
          shippingCharges,
          discount,
          total,
        });


        if(!order) return new ApiError(400,`cannot create Order`)

   await reduceStock(orderItems)
   await invalidateCache({product:true,order : true , admin:true})

   return res.status(201).json(new ApiResponse(201, order, "Order Created Successfully"));
} catch (error) {
  console.error("Error creating order:", error.message);
  return next(new ApiError(401, error.message, "Cannot Create Product"));
}

})







export {
    newOrder
}