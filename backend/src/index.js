import connectDb from "./db/index.js";
import dotenv from 'dotenv'
import {app} from './app.js'

dotenv.config({
    path : './env'
})


connectDb().then(()=>{

    app.on("error",(error)=>{
        console.log("ERR",error);
        throw error
    })

app.listen(process.env.PORT || 9000 ,()=>{
console.log(`server is running in at the port ${process.env.PORT}`);
})

})
.catch((error)=>{
console.log(`MONGODB CONNCTION FAILED`, error);
})