import { myCache } from "../app.js"
import { Order } from "../models/order.model.js"
import { Product } from "../models/products.model.js"
import { ApiError } from "./ApiError.js"


export const invalidateCache = async({
    product,
    order,
    admin,
    userId,
    orderId,
    productId
})=>{
    if(product){

        const productKeys = [
            "latest-prodcuts",
            "categories",
            "all-products"
        ]
//         const products = await Product.find({}).select("_id")

// products.forEach((i)=>{
//     productKeys.push(`product-${i._id}`)
// })



if(typeof productId === "string")productKeys.push(`product-${productId}`)
if(typeof productId === "object") productId.forEach((i)=> productKeys.push(`product-${i}`))

myCache.del(productKeys)

    }


    if(order){
      const orderKeys = [
        "all-orders",
        `my-orders-${userId}`,
        `order-${orderId}`
    ]
    // const orders = await Order.find({}).select("_id")

    // orders.forEach((i)=>{
    //     orderKeys.push(`orders-${i._id}`,`my-orders-${userId}`
    //    )
    // })
    


    myCache.del(orderKeys)

    }

if(admin){
  myCache.del([ "admin-stats",
    "admin-pie-charts",
    "admin-bar-charts",
    "admin-line-charts",])
}

}


// To reduce Stock after order



export const reduceStock = async (orderItems) => {
  for (const order of orderItems) {
      try {
          const product = await Product.findById(order.productId);
          if (!product) {
              const errorMessage = `Product with ID ${order.productId} not found`;
              console.error(errorMessage);
              throw new Error(errorMessage);
          }

          product.stock -= order.quantity;
          await product.save();
      } catch (error) {
          console.error(`Error processing order item with product ID ${order.productId}: ${error.message}`);
          throw error;  // Re-throw the error after logging it
      }
  }
};


export const calculatePercentage = (thisMonth,lastMonth) => {
    if (lastMonth === 0) return thisMonth * 100;
    const percent = (thisMonth / lastMonth) * 100;
    return Number(percent.toFixed(0));
  };



  export const getInventories = async ({ categories, productsCount }) => {
    const categoriesCountPromise = categories.map((category) =>
      Product.countDocuments({ category })
    );
  
    const categoriesCount = await Promise.all(categoriesCountPromise);
  
    const categoryCount = [];
  
    categories.forEach((category, i) => {
      categoryCount.push({
        [category]: Math.round((categoriesCount[i] / productsCount) * 100),
      });
    });
  
    return categoryCount;
  };

  
  export const getChartData = ({ length, docArr, today, property }) => {
    const data = new Array(length).fill(0);
  
    docArr.forEach((i) => {
      const creationDate = new Date(i.createdAt);
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
  
      if (monthDiff < length) {
        if (property) {
          data[length - monthDiff - 1] += i[property] || 0;
        } else {
          data[length - monthDiff - 1] += 1;
        }
      }
    });
  
    return data;
  };
  