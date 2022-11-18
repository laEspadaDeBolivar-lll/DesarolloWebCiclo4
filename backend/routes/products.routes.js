import {Router} from 'express';
import {
	createProductReview,
	deleteProduct,
	deleteReview,
	getAdminProducts,
	getProductById,
	getProductReviews,
	getProducts,
	newProduct,
	updateProduct,
} from '../controllers/productsController.js';
import {
	authorizeRoles,
	isAuthenticatedUser,
} from '../middlewares/authMiddleware.js';

const router = Router();
router.get('/products', getProducts); // Obtener todos los productos
router.get('/product/:id', getProductById); // Obtener un producto por id
// reviews
router.put('/review', isAuthenticatedUser, createProductReview);
router.get('/reviews', isAuthenticatedUser, getProductReviews);
router.delete('/review', isAuthenticatedUser, deleteReview);

// admin
router.get(
	'/admin/products',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	getAdminProducts
); // Obtener todos los productos admin
router.post(
	'/product/new',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	newProduct
); // Creando producto
router.put(
	'/product/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	updateProduct
); // Actualizando producto
router.delete(
	'/product/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	deleteProduct
); // Eliminar producto

export default router;
