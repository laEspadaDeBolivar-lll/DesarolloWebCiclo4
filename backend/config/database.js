import mongoose from 'mongoose';

// conexión a la base de datos 
const connectDB = async () => {
	try {
		const con = await mongoose.connect(process.env.DB_LOCAL_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
	} catch (error) {
		console.log({
			msg: error,
		});
	}
};

export default connectDB;
