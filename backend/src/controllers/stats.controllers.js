import { asyncHandler } from "../utilis/asyncHandler.js";







const getDashBoardStats = asyncHandler(async (req, res, next) => {
    try {
     
let stats;

if()


      return res.status(200).json(new ApiResponse(200, 'Order deleted successfully'));
    } catch (error) {
      console.error('Error deleting order:', error.message);
      return next(new ApiError(401, error.message, 'Cannot delete order'));
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