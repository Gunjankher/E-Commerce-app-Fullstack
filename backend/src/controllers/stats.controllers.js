import { asyncHandler } from "../utilis/asyncHandler.js";
import {myCache} from '../app.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { Product } from "../models/products.model.js";






const getDashBoardStats = asyncHandler(async (req, res, next) => {
    try {
     
let stats;

if(myCache.has("admin-stats")) 
  stats = JSON.parse(myCache.get("admin-stats"))
else{

  const today = new Date()

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