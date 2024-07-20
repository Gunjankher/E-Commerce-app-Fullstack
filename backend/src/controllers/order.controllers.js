import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utilis/asyncHandler.js";




const newOrder = asyncHandler(async()=>{


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
        return next(new ErrorHandler("Please Enter All Fields", 400));
  
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


})


export {
    newOrder
}