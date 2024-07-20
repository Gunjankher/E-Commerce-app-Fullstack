import { Order } from "../models/order.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { reduceStock } from "../utilis/invalidateCache.js";





const newOrder = asyncHandler(async()=>{

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
    
        if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
          return next(new ApiError("Please Enter All Fields", 400));
    
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
   await reduceStock(orderItems)
   await invalidateCache({product:true,order : true , admin:true})

   return res.status(201).json(new ApiResponse(201, order, "Order Created Successfully"));
} catch (error) {
  console.error("Error creating order:", error.message);
}

})






export {
    newOrder
}