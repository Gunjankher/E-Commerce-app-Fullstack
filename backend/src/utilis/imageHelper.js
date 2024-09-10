 import {Jimp} from 'jimp'
 import fs from 'fs'
 import path from 'path'



  const saveBase64Image = async (base64Image, outputPath) => {
  const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, "");
  const imageBuffer = Buffer.from(base64Data, 'base64');
  
  // Save the image
  fs.writeFileSync(outputPath, imageBuffer);
  
  // Optional: Compress image with Jimp
  const image = await Jimp.read(outputPath);
  await image.resize(300, Jimp.AUTO).quality(80).write(outputPath);
};


export {
  saveBase64Image
}