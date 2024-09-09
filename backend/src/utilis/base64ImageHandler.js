import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';
import {dirname} from 'path'

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const saveBase64Image = (base64Image) => {
  const matches = base64Image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const mimeType = matches[1];
  const extension = mimeType.split('/')[1];
  const imageData = matches[2];

  const fileName = `${uuid()}.${extension}`;
  const filePath = path.join(__dirname, `../public/temp/${fileName}`);
  
  const buffer = Buffer.from(imageData, 'base64');
  
  fs.writeFileSync(filePath, buffer);

  return filePath;  // Return the file path
};
