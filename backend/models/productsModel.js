import mongoose from 'mongoose';

const productsSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: [true, 'Por favor, introduzca el nombre del producto'], // requerido y mensaje de error
		trim: true, // Elimina espacios en blanco
		maxLength: [120, 'El nombre del producto no puede superar los 120 caracteres'], // maximo de caracteres
	},
	descripcion: {
		type: String,
		required: [true, 'Por favor, introduzca la descripción del producto'], // requerido y mensaje de error
	},
	imagen: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	vendedor: {
		type: String,
		required: [true, 'Por favor registre el vendedor de producto'],
	},
	precio: {
		type: Number,
		required: [true, 'Por favor, introduzca el precio del producto'], // requerido y mensaje de error
		maxLength: [8, 'El precio del producto no puede superar los 8 caracteres'], // maximo de caracteres
		default: 0.0,
	},
	categoria: {
		type: String,
		required: [true, 'Por favor, introduzca la categoría del producto'],
		enum: {
			// bebidas alcohólicas
			values: [
				'Cervezas',
				'Cigarrillos',
				'Energizantes',
				'Gaseosas',
                'Pasabocas',
                'Licores',
                'Otros'
			],
		},
	},
	stock: {
		type: Number,
		required: [true, 'Por favor, introduzca la cantidad en stock del producto'], // requerido y mensaje de error
		maxLength: [
			5,
			'La cantidad en stock del producto no puede superar los 5 caracteres',
		], // maximo de caracteres
		default: 0,
	},
	numCalificaciones: {
		type: Number,
		default: 0,
	},
    calificacion: {
        type: Number,
        default: 0,
    },
	opiniones: [
		{
			nombreCliente: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			comentario: {
				type: String,
				required: true,
			},
		},
	],
	fechaCreacion: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model('Products', productsSchema);
