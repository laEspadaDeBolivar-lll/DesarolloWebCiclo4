import {Router} from 'express';
import {
	createOrder,
	deleteOrder,
	getAllOrders,
	getMyOrders,
	getOrderById,
	updateOrder,
} from '../controllers/orderController.js';
import {
	authorizeRoles,
	isAuthenticatedUser,
} from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/order').post(isAuthenticatedUser, createOrder);
router.route('/order/:id').get(isAuthenticatedUser, getOrderById);
router.route('/orders/me').get(isAuthenticatedUser, getMyOrders);

//admin
router
	.route('/admin/orders')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router
	.route('/admin/order/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router
	.route('/admin/order/:id')
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

export default router;
