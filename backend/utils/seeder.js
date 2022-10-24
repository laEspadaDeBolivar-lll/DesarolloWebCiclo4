import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import products from '../data/products.js';
import Product from '../models/productsModel.js';

// Setting dotenv file
dotenv.config({path: 'backend/config/config.env'});

connectDB();

const importData = async () => {
    try {
		// Delete all data from product collection
		await Product.deleteMany();

		// Insert products data to product collection
		await Product.insertMany(products);

		console.log('Data imported');
		process.exit();
	} catch (error) {
		console.log('Error with data import', error);
		process.exit(1);
	}
}

const destroyData = async () => {
    try {
        // Delete all data from product collection
        await Product.deleteMany();

        console.log('Data destroyed');
        process.exit();
    } catch (error) {
        console.log('Error with data destroy', error);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}