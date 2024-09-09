import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Directory for storing files
  },
  filename: function (req, file, cb) {
    const id = uuid(); // Generate a unique ID for the file
    const extname = file.originalname.split(".").pop(); // Get the file extension
    cb(null, `${id}.${extname}`); // Save file as unique ID with its extension
  },
});

export const upload = multer({
  storage,
});

// Single file upload (expecting "photo" field in the form data)
export const singleUpload = upload.single("photo"); // Ensure this matches the frontend

// Multiple file upload (expecting "photos" field in the form data)
export const mutliUpload = upload.array("photos", 5);
