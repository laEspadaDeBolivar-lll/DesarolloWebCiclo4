import userModel from '../models/authModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import JWT from 'jsonwebtoken';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';

// Verificar si el usuario está autenticado o no
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return next(new ErrorHandler('Por favor, inicia sesión', 401));
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decoded.id);
  next();
})

// Roles de usuario
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`El rol ${req.user.role} no tiene acceso a este recurso`, 403));
    }
    next();
  }
}