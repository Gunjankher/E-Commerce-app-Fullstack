import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

// Function to decode base64 and save as a file
export const saveBase64Image = (base64Image) => {
  // Extract base64 header and content
  const matches = base64Image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const mimeType = matches[1]; // Extract MIME type (e.g., image/png)
  const extension = mimeType.split('/')[1]; // Extract file extension (e.g., png, jpg)
  const imageData = matches[2]; // Extract base64 data

  // Generate a unique file name using UUID
  const fileName = `${uuid()}.${extension}`;

  // Define the path where the image will be saved
  const filePath = path.join(__dirname, `../public/temp/${fileName}`);

  // Convert base64 data to binary buffer
  const buffer = Buffer.from(imageData, 'base64');

  // Save the file to the disk
  fs.writeFileSync(filePath, buffer);

  // Return the path of the saved image
  return filePath;
};
