import { myCache } from "../app"
import { Product } from "../models/products.model"

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

