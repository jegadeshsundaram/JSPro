import multer from 'multer';
//import { Request } from 'express';

// // Configure storage destination and filename
// const storage = multer.diskStorage({
//   destination: function (req: Request, file: Express.Multer.File, cb) {
//     // Ensure the 'uploads' directory exists
//     cb(null, './uploads/'); 
//   },
//   filename: function (req: Request, file: Express.Multer.File, cb) {
//     // Use the original filename or generate a unique one
//     cb(null, file.originalname);
//   }
// });

// Configure Multer
const upload = multer({ storage: multer.memoryStorage()});

export default upload;