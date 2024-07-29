import { asyncHandler } from "../utilis/asyncHandler.js";
import {myCache} from '../app.js'
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { Product } from "../models/products.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { calculatePercentage, getInventories } from "../utilis/invalidateCache.js";







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

 


  const latestTransactionsPromise = Order.find({})
  .select(["orderItems", "discount", "total", "status"])
  .limit(4);


const [thisMonthProducts,thisMonthUsers,thisMonthOrders,lastMonthProducts,lastMonthOrders,lastMonthUsers,productCount,usersCount,allOrders,lastSixMOnthOrders,categories,femaleUsersCount,latestTransaction] = await Promise.all([
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
Product.distinct("category"),
User.countDocuments({gender :"female"}),
latestTransactionsPromise
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
    [category]: Math.round((categoriesCount[i]/productCount*100))

  })
})


const userRatio  = {
  male : usersCount - femaleUsersCount,
  female : femaleUsersCount
}

const modifiedLatestTransaction = latestTransaction.map((i) => ({
  _id: i._id,
  discount: i.discount,
  amount: i.total,
  quantity: i.orderItems.length,
  status: i.status,
}));


stats ={
  categoryCount,
 ChangePercent,
 count,
 chart :{
  order :orderMonthCounts,
  revenue :orderMonthyRevenue,
  transactions : modifiedLatestTransaction,
  userRatio,
 }
}



myCache.set("admin-stats",JSON.stringify(stats))



}

      return res.status(200).json(new ApiResponse(200, stats,'DashBoard Data got successfully'));
    } catch (error) {
      console.error('Error getting DashBoard stats:', error.message);
      return next(new ApiError(401, error.message, 'Cannot get DashBoard Stats'));
    }
  });


const getPieCharts = asyncHandler(async (req, res, next) => {
    try {
     let charts;
  if(myCache.has('admin-pie-charts'))
    charts = JSON.parse(myCache.get('admin-pie-charts'))
      else {
        const allOrderPromise = Order.find({}).select([
          "total",
          "discount",
          "subtotal",
          "tax",
          "shippingCharges",
        ]);
    
        const [
          processingOrder,
          shippedOrder,
          deliveredOrder,
          categories,
          productsCount,
          outOfStock,
          allOrders,
          allUsers,
          adminUsers,
          customerUsers,
        ] = await Promise.all([
          Order.countDocuments({ status: "Processing" }),
          Order.countDocuments({ status: "Shipped" }),
          Order.countDocuments({ status: "Delivered" }),
          Product.distinct("category"),
          Product.countDocuments(),
          Product.countDocuments({ stock: 0 }),
          allOrderPromise,
          User.find({}).select(["dob"]),
          User.countDocuments({ role: "admin" }),
          User.countDocuments({ role: "user" }),
        ]);
    
        const orderFullfillment = {
          processing: processingOrder,
          shipped: shippedOrder,
          delivered: deliveredOrder,
        };
    
        const productCategories = await getInventories({
          categories,
          productsCount,
        });
    
        const stockAvailablity = {
          inStock: productsCount - outOfStock,
          outOfStock,
        };
    
        const grossIncome = allOrders.reduce(
          (prev, order) => prev + (order.total || 0),
          0
        );
    
        const discount = allOrders.reduce(
          (prev, order) => prev + (order.discount || 0),
          0
        );
    
        const productionCost = allOrders.reduce(
          (prev, order) => prev + (order.shippingCharges || 0),
          0
        );
    
        const burnt = allOrders.reduce((prev, order) => prev + (order.tax || 0), 0);
    
        const marketingCost = Math.round(grossIncome * (30 / 100));
    
        const netMargin =
          grossIncome - discount - productionCost - burnt - marketingCost;
    
        const revenueDistribution = {
          netMargin,
          discount,
          productionCost,
          burnt,
          marketingCost,
        };
    
        const usersAgeGroup = {
          teen: allUsers.filter((i) => i.age < 20).length,
          adult: allUsers.filter((i) => i.age >= 20 && i.age < 40).length,
          old: allUsers.filter((i) => i.age >= 40).length,
        };
    
        const adminCustomer = {
          admin: adminUsers,
          customer: customerUsers,
        };
    
        charts = {
          orderFullfillment,
          productCategories,
          stockAvailablity,
          revenueDistribution,
          usersAgeGroup,
          adminCustomer,
        };
    
        
myCache.set("admin-pie-charts",JSON.stringify(charts))
      }



      return res.status(200).json(new ApiResponse(200, charts, 'Order deleted successfully'));
    } catch (error) {
      console.error('Error deleting order:', error.message);
      return next(new ApiError(401, error.message, 'Cannot delete order'));
    }
  });


const getBarCharts = asyncHandler(async (req, res, next) => {
    try {
      let charts;
  
    
      if(myCache.has("admin-bar-charts"))
        charts = JSON.parse(myCache.get("admin-bar-charts"))


      else {
        const today = new Date();
    
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
        const sixMonthProductPromise = Product.find({
          createdAt: {
            $gte: sixMonthsAgo,
            $lte: today,
          },
        }).select("createdAt");
    
        const sixMonthUsersPromise = User.find({
          createdAt: {
            $gte: sixMonthsAgo,
            $lte: today,
          },
        }).select("createdAt");
    
        const twelveMonthOrdersPromise = Order.find({
          createdAt: {
            $gte: twelveMonthsAgo,
            $lte: today,
          },
        }).select("createdAt");
    
        const [products, users, orders] = await Promise.all([
          sixMonthProductPromise,
          sixMonthUsersPromise,
          twelveMonthOrdersPromise,
        ]);
    
        const productCounts = getChartData({ length: 6, today, docArr: products });
        const usersCounts = getChartData({ length: 6, today, docArr: users });
        const ordersCounts = getChartData({ length: 12, today, docArr: orders });
    
        charts = {
          users: usersCounts,
          products: productCounts,
          orders: ordersCounts,
        };

        myCache.set("admin-bar-charts",JSON.stringify(charts))

      }
  
      return res.status(200).json(new ApiResponse(200,charts, 'Order deleted successfully'));
    } catch (error) {
      console.error('Error deleting order:', error.message);
      return next(new ApiError(401, error.message, 'Cannot delete order'));
    }
  });


const getLineCharts = asyncHandler(async (req, res, next) => {
    try {
     
      let charts;
      if(myCache.has("admin-line-charts"))
        charts = JSON.parse(myCache.get("admin-line-charts"))
    
  
      else {
        const today = new Date();
    
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
        const baseQuery = {
          createdAt: {
            $gte: twelveMonthsAgo,
            $lte: today,
          },
        };
    
        const [products, users, orders] = await Promise.all([
          Product.find(baseQuery).select("createdAt"),
          User.find(baseQuery).select("createdAt"),
          Order.find(baseQuery).select(["createdAt", "discount", "total"]),
        ]);
    
        const productCounts = getChartData({ length: 12, today, docArr: products });
        const usersCounts = getChartData({ length: 12, today, docArr: users });
        const discount = getChartData({
          length: 12,
          today,
          docArr: orders,
          property: "discount",
        });
        const revenue = getChartData({
          length: 12,
          today,
          docArr: orders,
          property: "total",
        });
    
        charts = {
          users: usersCounts,
          products: productCounts,
          discount,
          revenue,
        };
    
        myCache.set("admin-line-charts",JSON.stringify(charts))
      }

      return res.status(200).json(new ApiResponse(200, charts, 'Order deleted successfully'));
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