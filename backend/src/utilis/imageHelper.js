//  import {Jimp} from 'jimp'
//  import fs from 'fs'
//  import path from 'path'
//  import {fileURLToPath} from 'url'

// // Recreate __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Now you can use __dirname like normal
// console.log( `this is dirname`,__dirname);

//  const saveBase64Image = async (base64Image,outputPath) => {
//   // Remove base64 header if present
//   const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, "");

//   // Convert base64 to Buffer
//   const imageBuffer = Buffer.from(base64Data, 'base64');

//   // Validate the outputPath and log for debugging
//   if (!outputPath) {
//     throw new Error('Output path is undefined');
//   }
//   console.log('Output path:', outputPath);

//   // Save the image as a file
//   fs.writeFileSync(outputPath, imageBuffer);

//   // Optional: Compress image with Jimp
//   const image = await Jimp.read(outputPath);
//   await image.resize(300, Jimp.AUTO).quality(80).writeAsync(outputPath);
// };


// export {
//   saveBase64Image
// }


import path from 'path'
import { Buffer } from 'buffer'
import fs from 'fs'