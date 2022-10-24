import { Router } from 'express';
import { deleteProduct, getProductById, getProducts, newProduct, updateProduct } from '../controllers/productsController.js';

const router = Router();
router.get('/products', getProducts); // Obtener todos los productos
router.get('/product/:id', getProductById); // Obtener un producto por id
router.post('/product/new', newProduct); // Creando producto
router.put('/product/:id', updateProduct); // Actualizando producto
router.delete('/product/:id', deleteProduct); // Eliminar producto


export default router;
