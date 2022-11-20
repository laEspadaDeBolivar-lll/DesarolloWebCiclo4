import {Router} from 'express';

import {
	allUsers,
	deleteUser,
	forgotPassword,
	getUserProfile,
	loginUser,
	logout,
	registerUser,
	resetPassword,
	updatePassword,
	updateProfile,
	updateUser,
} from '../controllers/authController.js';
import {
	authorizeRoles,
	isAuthenticatedUser,
} from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/user/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuthenticatedUser, logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/updatePassword').put(isAuthenticatedUser, updatePassword);
router.route('/me/updateProfile').put(isAuthenticatedUser, updateProfile);

// admin
router
	.route('/admin/users')
	.get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router
	.route('/admin/user/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getUserProfile)
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
