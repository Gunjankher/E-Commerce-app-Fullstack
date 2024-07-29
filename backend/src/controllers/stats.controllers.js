import { asyncHandler } from "../utilis/asyncHandler.js";
import {myCache} from '../app.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { Product } from "../models/products.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { calculatePercentage } from "../utilis/invalidateCache.js";






const getDashBoardStats = asyncHandler(async (req, res, next) => {
    try {
     
let stats;

if(myCache.has("admin-stats")) 
  stats = JSON.parse(myCache.get("admin-stats"))
else{

  const today = new Date()
  const sixMonthAgo = new Date()
sixMonthAgo.setMonth(sixMonthAgo.getMonth()-6)


  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };
  // const startofThisMonth = new Date(today.getFullYear(),today.getMonth(),1)
  // const startofLastMonth = new Date(today.getFullYear(),today.getMonth(),-1)
  // const endofLastMonth = new Date(today.getFullYear(),today.getMonth(),0)


  const thisMonthProductsPromise = Product.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthProductsPromise = Product.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthUsersPromise = User.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthUsersPromise = User.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthOrdersPromise = Order.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });



  const lastSixMOnthOrdersPromise = Order.find({
    createdAt: {
      $gte: sixMonthAgo,
      $lte: today,
    },
  });

 






const [thisMonthProducts,thisMonthUsers,thisMonthOrders,lastMonthProducts,lastMonthOrders,lastMonthUsers,productCount,usersCount,allOrders,lastSixMOnthOrders,categories] = await Promise.all([
thisMonthProductsPromise,
thisMonthUsersPromise,
thisMonthOrdersPromise,
lastMonthProductsPromise,
lastMonthOrdersPromise,
lastMonthUsersPromise,
Product.countDocuments(),
User.countDocuments(),
Order.find({}).select("total"),
lastSixMOnthOrdersPromise,
Product.distinct("category")
])

const thisMonthRevenue = thisMonthOrders.reduce(
  (total, order) => total + (order.total || 0),
  0
);

const lastMonthRevenue = lastMonthOrders.reduce(
  (total, order) => total + (order.total || 0),
  0
);




const ChangePercent = {

revenue :calculatePercentage(thisMonthRevenue,lastMonthRevenue),

user :calculatePercentage(
  thisMonthUsers.length,
  lastMonthUsers.length
),

order : calculatePercentage(
  thisMonthOrders.length,
  lastMonthOrders.length
),

product :calculatePercentage(
  thisMonthProducts.length,
  lastMonthProducts.length
  )


}


const revenue =allOrders.reduce(
  (total, order) => total + (order.total || 0),
  0
);


const count = {
  revenue,
  user : usersCount,
  product : productCount,
  order : allOrders.length
}



const orderMonthCounts = new Array(6).fill(0);
const orderMonthyRevenue = new Array(6).fill(0);

lastSixMOnthOrders.forEach((order)=>{
  const creationDate = order.createdAt;
  const monthDiff = today.getMonth()-creationDate.getMonth()

if(monthDiff <6){
orderMonthCounts[6-monthDiff-1] +=1
orderMonthyRevenue[6-monthDiff-1] +=order.total
}

})

const categoriesCountPromise = categories.map((category)=>Product.countDocuments({category}))

const categoriesCount = await Promise.all(categoriesCountPromise)

const categoryCount = []


categories.forEach((category,i)=>{
  categoryCount.push({
    [category]: categoriesCount[i]
  })
})



stats ={
  categories,
  categoriesCount,
 ChangePercent,
 count,
 chart :{
  order :orderMonthCounts,
  revenue :orderMonthyRevenue,
 }
}




}

      return res.status(200).json(new ApiResponse(200, stats,'DashBoard Data got successfully'));
    } catch (error) {
      console.error('Error getting DashBoard stats:', error.message);
      return next(new ApiError(401, error.message, 'Cannot get DashBoard Stats'));
    }
  });


const getPieCharts = asyncHandler(async (req, res, next) => {
    try {
     
  
      return res.status(200).json(new ApiResponse(200, 'Order deleted successfully'));
    } catch (error) {
      console.error('Error deleting order:', error.message);
      return next(new ApiError(401, error.message, 'Cannot delete order'));
    }
  });


const getBarCharts = asyncHandler(async (req, res, next) => {
    try {
     
  
      return res.status(200).json(new ApiResponse(200, 'Order deleted successfully'));
    } catch (error) {
      console.error('Error deleting order:', error.message);
      return next(new ApiError(401, error.message, 'Cannot delete order'));
    }
  });


const getLineCharts = asyncHandler(async (req, res, next) => {
    try {
     
      return res.status(200).json(new ApiResponse(200, 'Order deleted successfully'));
    } catch (error) {
      console.error('Error deleting order:', error.message);
      return next(new ApiError(401, error.message, 'Cannot delete order'));
    }
  });





  export {
    getDashBoardStats,
    getBarCharts,
    getLineCharts,
    getPieCharts,
  }