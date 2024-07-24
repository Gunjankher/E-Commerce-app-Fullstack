import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import NodeCache from 'node-cache'
import morgan from 'morgan'


const app = express()


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

export const myCache = new NodeCache()


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true ,limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"))



import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import orderRouter from './routes/order.router.js'
import paymentRouter from  './routes/payment.router.js'


app.use("/api/v1/users",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/payment",paymentRouter)


app.use("/public/temp",express.static("public/temp"))

export  {app}