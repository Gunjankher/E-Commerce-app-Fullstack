import { myCache } from "../app.js";
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
          console.log(user);
   await reduceStock(orderItems)
   await invalidateCache({product:true,order : true , admin:true,userId:user})

   return res.status(201).json(new ApiResponse(201, order, "Order Created Successfully"));
} catch (error) {
  console.error("Error creating order:", error.message);
  return next(new ApiError(401, error.message, "Cannot Create Product"));
}

})




const myOrders = asyncHandler(async(req,res,next)=>{

  try {
    
    const {id :user} = req.query
    const key = `my-orders-${user}`
       
  let orders;

  if(myCache.has(key)) orders = JSON.parse(myCache.get(key))

    else{
      orders = await Order.find({user})
      myCache.set(key,JSON.stringify(orders))
    }
  
     return res.status(201).json(new ApiResponse(201, orders, "gets my order Sucessfully "));
  } catch (error) {
    console.error("Error getting myorder:", error.message);
    return next(new ApiError(401, error.message, "Cannot get Order"));
  }
  
  })

const allOrders = asyncHandler(async(req,res,next)=>{

  try {
    const {id} = req.params
    const key = `all-orders`
       
  let orders = []

  if(myCache.has(key)) orders = JSON.parse(myCache.get(key))

    else{
      orders = await Order.find().populate('user','name')
      myCache.set(key,JSON.stringify(orders))
    }
  
   
     return res.status(201).json(new ApiResponse(201, orders, "gets all order Sucessfully "));
  } catch (error) {
    console.error("Error getting all order:", error.message);
    return next(new ApiError(401, error.message, "Cannot get  all Order"));
  }
  
  }) 

const getSingleOrder = asyncHandler(async(req,res,next)=>{

  
  try {
    
    const {id} = req.params
    const key = `orders-${id}`
       
  let orders = []

  if(myCache.has(key)) orders = JSON.parse(myCache.get(key))

    else{
      orders = await Order.findById(id).populate('user','name')
      if(!orders)return new ApiError(400,`order not Found`)
      myCache.set(key,JSON.stringify(orders))
    }
  
   
     return res.status(201).json(new ApiResponse(201, orders, "gets single-order Sucessfully "));
  } catch (error) {
    console.error("Error getting single order:", error.message);
    return next(new ApiError(401, error.message, "Cannot get  Single Order"));
  }
  
  }) 



  const processOrder = asyncHandler(async(req,res,next)=>{

    try {
      const {id} = req.params

const order = await Order.findById(id)

if(!order) return new ApiError(404, `order not Found`)

switch (order.status) {
  case "Processing":
    order.status = "Shipped"    
    break;
  case "Shipped":
    order.status = "Delivered"    
    break;
  default:
    order.status = "Delivered"
    break;
}

await order.save()

        
       await invalidateCache({product:false,order : true , admin:true,userId: order.user})
    
       return res.status(201).json(new ApiResponse(201, order, "Order processed Successfully"));
    } catch (error) {
      console.error("Error processing order:", error.message);
      return next(new ApiError(401, error.message, "Cannot process Order"));
    }
    
    })
    

    const deleteOrder = asyncHandler(async(req,res,next)=>{

      try {
        const {id} = req.params
  
  const order = await Order.findById(id)
  
  if(!order) return new ApiError(404, `order not Found`)
  
await Order.deleteOne()
  
          
         await invalidateCache({product:false,order : true , admin:true,userId : order.user})
      
         return res.status(201).json(new ApiResponse(201, "Order Deleted Successfully"));
      } catch (error) {
        console.error("Error Deleting:", error.message);
        return next(new ApiError(401, error.message, "Cannot Delete order"));
      }
      
      })
      
  

export {
    newOrder,
    myOrders,
    allOrders,
    getSingleOrder,
    processOrder,
    deleteOrder,
}