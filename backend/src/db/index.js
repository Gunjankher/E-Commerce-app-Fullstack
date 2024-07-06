import mongoose from 'mongoose'
import {DB_NAME} from '../constansts.js'



const connectDb  = async()=>{

try {
    
 const conncetionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
 console.log(`MONGODB CONNECTED SUCESSFULLY : ${conncetionInstance.connection.host}`);

} catch (error) {
    console.log(`MONGODB CONNCECTION ERROR ${error}`);
    process.exit(1)

}

}

export default connectDb