import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

if (process.env.NODE_ENV === 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });

// configure clodonary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

connectDB();

app.listen(PORT, () => {
	console.log(
		`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`
	);
});
