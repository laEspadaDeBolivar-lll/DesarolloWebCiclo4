import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

dotenv.config({path: 'backend/config/config.env'});

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

connectDB();

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
});
