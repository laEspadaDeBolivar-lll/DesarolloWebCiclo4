import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
	envioInfo: {
		direccion: {
			type: String,
			required: true,
		},
		ciudad: {
			type: String,
			required: true,
		},
		telefono: {
			type: String,
			required: true,
		},
		departamento: {
			type: String,
			required: true,
		},
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	items: [
		{
			nombre: {
				type: String,
				required: true,
			},
			cantidad: {
				type: Number,
				required: true,
			},
			imagen: {
				type: String,
				required: true,
			},
			precio: {
				type: Number,
				required: true,
			},
			product: {
				type: mongoose.Schema.ObjectId,
				required: true,
				ref: 'Products',
			},
		},
	],
	pagoInfo: {
		id: {
			type: String,
		},
		estado: {
			type: String,
		},
	},
	fechaPago: {
		type: Date,
	},
	precioItems: {
		type: Number,
		required: true,
		default: 0.0,
	},
	precioImpuesto: {
		type: Number,
		required: true,
		defautl: 0.0,
	},
	precioEnvio: {
		type: Number,
		required: true,
		default: 0.0,
	},
	precioTotal: {
		type: Number,
		required: true,
		default: 0.0,
	},
	estado: {
		type: String,
		required: true,
		default: 'Procesando',
	},
	fechaEnvio: {
		type: Date,
	},
	fechaCreacion: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Order', orderSchema);
