/**
 * Express application for uploading PDF files to Cloudinary and storing their URLs in MongoDB.
 * @module app
 */

import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173"
}))

mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'cloudinary_files',
});

/**
 * Represents a PDF document schema for MongoDB.
 * @const {object} pdfSchema
 * @property {string} cloudinaryUrl - The URL of the PDF file stored in Cloudinary.
 */
const pdfSchema = new mongoose.Schema({
  cloudinaryUrl: String,
});

/**
 * Represents a model for PDF documents in MongoDB.
 * @const {object} Pdf
 */
const Pdf = mongoose.model('Pdf', pdfSchema);

/**
 * Configures Cloudinary with API credentials.
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Configures Multer to store uploaded files.
 */
const storage = multer.diskStorage({
  filename: (req, file, cb) => { cb(null, file.originalname); },
});
const upload = multer({ storage });

/**
 * Route for uploading a PDF file.
 * @name POST/api/upload
 * @function
 * @param {string} path - The route path.
 * @param {function} middleware - Middleware for handling file upload.
 * @param {function} callback - Callback function to handle file upload processing.
 */
app.post('/api/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' });

    const newPdf = new Pdf({ cloudinaryUrl: result.url });

    await newPdf.save();

    return res.status(200).json({ url: result.url });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

/**
 * Starts the Express server.
 * @name listen
 * @function
 * @param {number} PORT - The port on which the server will listen for incoming requests.
 */
app.listen(PORT);
