import multer from "multer"
import {v4 as uuid} from 'uuid'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {

const id = uuid()
const extname = file.originalname.split(".").pop()

const fileName = `${id}.${extname}`

      cb(null, fileName)
    }
  })
  
  export const upload = multer({ 
    storage,
  })


  export const singleUpload = upload.single("photo");
export const mutliUpload = upload.array("photos", 5);