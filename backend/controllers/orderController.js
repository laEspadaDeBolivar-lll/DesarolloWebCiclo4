import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import orderModel from '../models/orderModel.js';
import productsModel from '../models/productsModel.js';
import ErrorHandler from '../utils/errorHandler.js';

// Crear una nueva orden
export const createOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		items,
		envioInfo,
		precioItems,
		precioImpuesto,
		precioEnvio,
		precioTotal,
		pagoInfo,
	} = req.body;

	const order = await orderModel.create({
		items,
		envioInfo,
		precioItems,
		precioImpuesto,
		precioEnvio,
		precioTotal,
		pagoInfo,
		fechaPago: Date.now(),
		user: req.user._id,
	});

	res.status(201).json({
		success: true,
		order,
	});
});

//Obtener una orden por id
export const getOrderById = catchAsyncErrors(async (req, res, next) => {
	const order = await orderModel
		.findById(req.params.id)
		.populate('user', 'name email');

	if (!order) {
		return next(new ErrorHandler('Orden no encontrada', 404));
	}

	res.status(200).json({
		success: true,
		order,
	});
});

// Obtener ordenes del usuario logeado
export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await orderModel.find({user: req.user._id});
	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.precioTotal;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
});

// ver todas las ordenes en el admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await orderModel.find();

	let totalAmount = 0;

	orders.forEach((order) => {
		totalAmount += order.precioTotal;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
});

// Actualizar orden en el admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await orderModel.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('Orden no encontrada', 404));
	}

	if (order.estado === 'Enviado') {
		return next(new ErrorHandler('Ya se ha entregado esta orden', 400));
	}

	// actualiza el stock
	order.items.forEach(async (item) => {
		await updateStock(item.product, item.cantidad);
	});

	order.estado = req.body.estado;
	order.fechaPago = Date.now();

	order.save({validateBeforeSave: false});

	res.status(200).json({
		success: true,
		order,
	});
});

// actualizar stock
async function updateStock(id, cantidad) {
	const product = await productsModel.findById(id);

	product.stock = product.stock - cantidad;

	await product.save({validateBeforeSave: false});
}

// Eliminar orden
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await orderModel.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('Orden no encontrada', 404));
	}

	await order.remove();

	res.status(200).json({
		success: true,
		message: 'Orden eliminada',
	});
});
