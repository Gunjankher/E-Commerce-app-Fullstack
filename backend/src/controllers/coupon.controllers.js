import { asyncHandler } from "../utilis/asyncHandler.js";
import {Coupon} from '../models/coupon.model.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { newStripe } from "../app.js";




const createPaymentIntent = asyncHandler(async (req, res, next) => {
  try {
    const { amount } = req.body;

     if (!amount || isNaN(amount)) {
    return next(new ApiError(400, "Please enter a valid amount"));
  }

    const paymentIntent = await newStripe.paymentIntents.create({
      amount: Number(amount) * 100,
      // currency: "inr",
      // amount: amount, // Amount in cents, for example 1000 for $10
      currency: "inr"
    });

    return res.status(201).json(new ApiResponse(201, { clientSecret: paymentIntent.client_secret }, "Payment Intent created successfully"));
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    return next(new ApiError(500, error.message, "Cannot create payment intent"));
  }
});



// const createPaymentIntent = asyncHandler(async (req, res, next) => {
//   try {
//     const { amount } = req.body;

//     // Validate amount
//     if (!amount || isNaN(amount)) {
//       return next(new ApiError(400, "Please enter a valid amount"));
//     }

//     // Create a new PaymentIntent
//     const paymentIntent = await newStripe.paymentIntents.create({
//       amount: Number(amount) * 100, // Convert to cents
//       currency: "inr",
//     });

//     // Check the status of the PaymentIntent
//     if (paymentIntent.status === 'requires_confirmation') {
//       // If it's in the requires_confirmation state, confirm it
//       const confirmedPaymentIntent = await newStripe.paymentIntents.confirm(paymentIntent.id);
//       return res.status(201).json(new ApiResponse(201, { clientSecret: confirmedPaymentIntent.client_secret }, "Payment Intent confirmed successfully"));
//     } else if (paymentIntent.status === 'succeeded') {
//       // If it has already succeeded, return the client secret without confirming again
//       return res.status(200).json(new ApiResponse(200, { clientSecret: paymentIntent.client_secret }, "Payment Intent has already succeeded"));
//     } else {
//       // Handle other possible states if necessary
//       return next(new ApiError(400, "Payment Intent is not in a valid state for confirmation"));
//     }

//   } catch (error) {
//     console.error("Error creating payment intent:", error.message);
//     return next(new ApiError(500, error.message, "Cannot create payment intent"));
//   }
// });




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
  
      return res.status(200).json(new ApiResponse(200,{discount:discount.amount}, `Discount Amount is Given`));
    } catch (error) {
      console.error('Error giving Discount :', error.message);
      return next(new ApiError(401, error.message, 'Cannot process discount Coupon'));
    }
  });
   

   const allCoupons = asyncHandler(async (req, res, next) => {

    try {
      
      const coupons = await Coupon.find({});

    return res.status(200).json(new ApiResponse(200, coupons, `all Coupons Founded`));
  } catch (error) {
    console.error('Error Finding All Coupons :', error.message);
    return next(new ApiError(401, error.message, 'Cannot find all Coupon'));
  }
   
  });

   const deleteCoupon = asyncHandler(async (req, res, next) => {

    try {
      
const {id} = req.params


       await Coupon.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, `all Coupons deleted`));
  } catch (error) {
    console.error('Error deleteing Coupon :', error.message);
    return next(new ApiError(401, error.message, 'Cannot delete Coupon'));
  }
   
  });
  




  const getCoupon = asyncHandler(async (req, res, next) => {

    try {
      const {id} = req.params
      const coupons = await Coupon.findById(id)

    return res.status(200).json(new ApiResponse(200, coupons, ` Coupon Founded`));
  } catch (error) {
    console.error('Error Finding  Coupon :', error.message);
    return next(new ApiError(401, error.message, 'Cannot find  Coupon'));
  }
   
  });



  const updateCoupon = asyncHandler(async (req, res, next) => {

    try {
      const {id} = req.params
      const {code, amount} = req.body
      const coupons = await Coupon.findById(id)

      if(!coupons) next(new ApiError(401, `can not find ID`))

if(code) coupons.code = code
if(amount) coupons.amount = amount

await coupons.save()

    return res.status(200).json(new ApiResponse(200, coupons, ` Coupon Founded`));
  } catch (error) {
    console.error('Error Finding  Coupon :', error.message);
    return next(new ApiError(401, error.message, 'Cannot find  Coupon'));
  }
   
  });


  export {
newCoupon,
applyDiscount,
allCoupons,
deleteCoupon,
getCoupon,
updateCoupon,
createPaymentIntent,
  }