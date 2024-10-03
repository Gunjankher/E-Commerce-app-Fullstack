import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import NodeCache from 'node-cache'
import morgan from 'morgan'
import stripe from 'stripe'
import path, { dirname } from 'path'
import fs from 'fs'
import {fileURLToPath} from 'url'
import helmet from 'helmet'


const app = express()


app.use(cors({
  origin: process.env.CORS_ORIGIN, // Ensure this matches the frontend origin
  credentials: true,
}));


app.use(express.json())
app.use(express.urlencoded({extended: true ,limit : "16kb"}))


// Your existing middleware setup
if (process.env.NODE_ENV === 'production') {
  app.use(
      helmet.contentSecurityPolicy({
          directives: {
              defaultSrc: ["'self'"],
              scriptSrc: [
                  "'self'", 
                  "'unsafe-inline'", 
                  "'unsafe-eval'", 
                  'blob:', 
                  'https://js.stripe.com'
              ],
              // Add more directives as needed
          },
      })
  );
}





const __dirname = dirname(fileURLToPath(import.meta.url));

const stripeKey = process.env.STRIPE_KEY || ""


export const newStripe = new stripe(stripeKey)

export const myCache = new NodeCache()




app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"))



import userRouter from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import orderRouter from './routes/order.router.js'
import paymentRouter from  './routes/payment.router.js'
import dashBoardRouter  from './routes/stats.router.js'


app.use("/api/v1/users",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/dashboard",dashBoardRouter)


app.use("/public/temp",express.static("public/temp"))
// app.use("/public/temp", express.static(path.join(__dirname, '/public/temp')));
// app.use('/public/temp', express.static(path.join(__dirname, '/public/temp')));



export  {app}