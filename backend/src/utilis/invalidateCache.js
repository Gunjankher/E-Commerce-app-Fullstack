import { myCache } from "../app.js"
import { Order } from "../models/order.model.js"
import { Product } from "../models/products.model.js"
import { ApiError } from "./ApiError.js"


export const invalidateCache = async({
    product,
    order,
    admin
})=>{
    if(product){

        const productKeys = [
            "latest-prodcuts",
            "categories",
            "all-products"
        ]
        const products = await Product.find({}).select("_id")

products.forEach((i)=>{
    productKeys.push(`product-${i._id}`)
})

myCache.del(productKeys)

    }
}


// To reduce Stock after order

export const  reduceStock = async(orderItems)=>{
    
for (let i = 0; index < orderItems.length; i++) {
   const order = orderItems[i]
    const product = await Product.findById(order.productId)
    if(!product)new ApiError(401, `Product Not Found`)
        product.stock -= order.quantity
    await product.save()
}

}