// Crear y enviar un token guardado en una cookie

const tokenEnviado = (user, statusCode, res) => {
	// Crear el token
	const token = user.getJwtToken();

	// Opciones de la cookie
	const Opciones = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie('token', token, Opciones).json({
		success: true,
		token,
		user,
	});
};

export default tokenEnviado;
