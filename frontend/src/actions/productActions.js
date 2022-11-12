import axios from 'axios';
import {
	ALL_PRODUCTS_FAIL,
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	CLEAR_ERRORS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants';

// los actions son funciones que se ejecutan en el componente para cambiar el estado del store dependiendo de la accion que se le pase como parametro se entrega algo

// obtener todos los productos
export const getProducts =
	(currentPage = 1, keyword = 'blue', precio) =>
	async (dispatch) => {
		try {
			dispatch({type: ALL_PRODUCTS_REQUEST}); // es el product o estado inicial del store que se va a cambiar
			const {data} = await axios.get(
				`/api/products?keyword=${keyword}&page=${currentPage}`
			);
			dispatch({type: ALL_PRODUCTS_SUCCESS, payload: data});
		} catch (error) {
			dispatch({type: ALL_PRODUCTS_FAIL, payload: error.message});
		}
	};

// obtener un producto por id
export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({type: PRODUCT_DETAILS_REQUEST});

		const {data} = await axios.get(`/api/product/${id}`);

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data.product,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const clearErrors = () => async (dispatch) => {
	dispatch({type: CLEAR_ERRORS});
};
