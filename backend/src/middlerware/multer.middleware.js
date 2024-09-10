import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from 'fs'





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

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 5, files: 5 }  // 5 MB max size, 5 files limit
});

// Single file upload (expecting "photo" field in the form data)
export const singleUpload = upload.single("photo"); // Ensure this matches the frontend

// Multiple file upload (expecting "photos" field in the form data)
export const mutliUpload = upload.array("photos", 10);


// // Function to convert base64 to image file
// export const convertBase64ToImage = (base64String, outputPath) => {
//   // Create a buffer from the base64 string
//   const buffer = Buffer.from(base64String, "base64");
  
//   // Write the buffer to a new image file
//   fs.writeFileSync(outputPath, buffer);
//   console.log(`Image saved to ${outputPath}`);
// };