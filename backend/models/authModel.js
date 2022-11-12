import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Por favor ingrese el nombre'],
		maxLength: [120, 'El nombre no puede exceder los 120 caracteres'],
	},
	email: {
		type: String,
		required: [true, 'Por favor ingrese el email'],
		unique: true,
		validate: [validator.isEmail, 'Por favor ingrese un email válido'],
	},
	password: {
		type: String,
		required: [true, 'Por favor ingrese la contraseña'],
		minLength: [8, 'La contraseña debe tener al menos 8 caracteres'],
		select: false, // no se mostrará en la respuesta
	},
	role: {
		type: String,
		default: 'user',
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

// incritar contraseña
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// description de la contraseña y comparación
userSchema.methods.comparePassw = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// retornar JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
}

// generar un token para reset de contraseña
userSchema.methods.getResetPasswordToken =  function () {
  // generar token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hashear y guardar token
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // setear expiración
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
}




export default mongoose.model('User', userSchema);
