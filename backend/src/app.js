import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import NodeCache from 'node-cache'
import morgan from 'morgan'
import stripe from 'stripe'
import path from 'path'


const app = express()


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))


app.post('/upload-base64', (req, res) => {
    const base64Data = req.body.photos.replace(/^data:image\/jpeg;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');
  
    // Define a unique filename and path to save the image
    const fileName = `image_${Date.now()}.jpg`;
    const filePath = path.join(__dirname, 'public/temp', fileName);
  
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).send('Error saving image');
      }
      res.status(200).send('Image uploaded successfully');
    });
  });
  

const stripeKey = process.env.STRIPE_KEY || ""


export const newStripe = new stripe(stripeKey)

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
import dashBoardRouter  from './routes/stats.router.js'


app.use("/api/v1/users",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/payment",paymentRouter)
app.use("/api/v1/dashboard",dashBoardRouter)


app.use("/public/temp",express.static("public/temp"))

export  {app}