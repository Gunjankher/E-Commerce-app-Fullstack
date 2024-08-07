import { asyncHandler } from "../utilis/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utilis/ApiError.js";



const adminOnly = asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return next(new ApiError(400, "Login first"));
      }
  
      const user = await User.findById(id);
  
      if (!user) {
        return next(new ApiError(401, "Your ID is fake"));
      }
  
      if (user.role !== "admin") {
        return next(new ApiError(401, "You are not Admin"));
      }
  console.log(user);
  
      next();
    } catch (error) {
      next(new ApiError(401, error.message, "You are not Admin"));
    }
  });
  
  export { adminOnly };