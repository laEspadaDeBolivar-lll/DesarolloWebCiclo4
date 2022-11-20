import cloudinary from 'cloudinary';
import crypto from 'crypto';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import userModel from '../models/authModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import tokenEnviado from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmail.js';

// Crear un usuario
export const registerUser = catchAsyncErrors(async (req, res, next) => {
	const {name, email, password} = req.body;

	const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'avatars',
		width: '150',
		crop: 'scale',
	});

	const user = await userModel.create({
		name,
		email,
		password,
		avatar: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	});
	tokenEnviado(user, 201, res);
});

// Login de usuario
export const loginUser = catchAsyncErrors(async (req, res, next) => {
	const {email, password} = req.body;

	// Verificar si el email y el password son correctos
	if (!email || !password) {
		return next(new ErrorHandler('Por favor, introduce email y password', 400));
	}

	// Buscar usuario en la base de datos
	const user = await userModel.findOne({email}).select('+password');

	if (!user) {
		return next(new ErrorHandler('Usuario no encontrado', 404));
	}

	// Comprobar si la contraseña es correcta
	const passwordOk = await user.comparePassw(password);

	if (!passwordOk) {
		return next(new ErrorHandler('Contraseña incorrecta', 401));
	}

	tokenEnviado(user, 200, res);
});

// logaut de usuario
export const logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Logout',
	});
});

// Obtener el perfil del usuario
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await userModel.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// Olvidar contraseña, recuperar contraseña
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await userModel.findOne({email: req.body.email});

	if (!user) {
		return next(new ErrorHandler('Usuario no encontrado', 404));
	}

	// Generar el token
	const resetToken = user.getResetPasswordToken();

	await user.save({validateBeforeSave: false});

	// Enviar el email
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/password/reset/${resetToken}`;

	const mensaje = `Hola!\n\nTu link para ajustar una nueva contraseña es el 
    siguiente: \n\n${resetUrl}\n\n
    Si no solicitaste este link, por favor comunicate con soporte.\n\n Att:\nVetyShop Store`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'VetyShop Recuperación de la contraseña',
			mensaje,
		});
		res.status(200).json({
			success: true,
			message: `Correo enviado a: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({validateBeforeSave: false});
		return next(new ErrorHandler(error.message, 500));
	}
});

// Resetear la contraseña
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
	// Hashar el token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await userModel.findOne({
		resetPasswordToken,
		resetPasswordExpire: {$gt: Date.now()},
	});

	if (!user) {
		return next(new ErrorHandler('Token no válido o expirado', 400));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('Las contraseñas no coinciden', 400));
	}

	// Establecer la nueva contraseña
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	tokenEnviado(user, 200, res);
});

// Actualizar contraseña del perfil del usuario
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await userModel.findById(req.user.id).select('+password');

	// Comprobar si la contraseña es correcta
	const passwordOk = await user.comparePassw(req.body.oldPassword);

	if (!passwordOk) {
		return next(
			new ErrorHandler(
				'Contraseña incorrecta, verifique que la contraseña antigua este bien',
				401
			)
		);
	}

	user.password = req.body.newPassword;
	await user.save();

	tokenEnviado(user, 200, res);
});

// Actualizar el perfil del usuario (logeado)
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	// Actualizar avatar
	if (req.body.avatar !== '') {
		const user = await userModel.findById(req.user.id);

		const imagenId = user.avatar.public_id;
		const res = await cloudinary.v2.uploader.destroy(imagenId);

		const resultado = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'avatars',
			width: 240,
			crop: 'scale',
		});

		newUserData.avatar = {
			public_id: resultado.public_id,
			url: resultado.secure_url,
		};
	}

	const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		user,
	});
});

// Servicios controladores de usuarios por ADMIN

// ver todos los users
export const allUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await userModel.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Obtener detalles de un usuario
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await userModel.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler('Usuario no encontrado', 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// Actualizar detalles de un usuario
export const updateUser = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Eliminar un usuario
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await userModel.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(
				`Usuario con id ${req.params.id} no se encuentra en nuentra base de datos...`,
				404
			)
		);
	}

	// Eliminar avatar
	// if (user.avatar !== null) {
	//   const imagenId = user.avatar.public_id;
	//   await cloudinary.v2.uploader.destroy(imagenId);
	// }

	await user.remove();

	res.status(200).json({
		success: true,
	});
});
