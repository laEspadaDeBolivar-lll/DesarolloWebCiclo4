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
	imagenes: [
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
});
