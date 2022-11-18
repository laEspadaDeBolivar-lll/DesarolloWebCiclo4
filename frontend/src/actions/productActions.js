import axios from 'axios';
import {
	ADMIN_PRODUCTS_FAIL,
	ADMIN_PRODUCTS_REQUEST,
	ADMIN_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_FAIL,
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	CLEAR_ERRORS,
	NEW_PRODUCT_FAIL,
	NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from '../constants/productConstants';

// los actions son funciones que se ejecutan en el componente para cambiar el estado del store dependiendo de la accion que se le pase como parametro se entrega algo

// obtener todos los productos
export const getProducts =
	(currentPage = 1, precio) =>
	async (dispatch) => {
		try {
			dispatch({type: ALL_PRODUCTS_REQUEST}); // es el product o estado inicial del store que se va a cambiar
			const {data} = await axios.get(`/api/products?page=${currentPage}`);
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

// ADMIN OBETENER TODOS LOS PRODUCTOS
export const getAdminProducts = () => async (dispatch) => {
	try {
		dispatch({type: ADMIN_PRODUCTS_REQUEST});

		const {data} = await axios.get(`/api/admin/products`);

		dispatch({
			type: ADMIN_PRODUCTS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ADMIN_PRODUCTS_FAIL,
			payload: error.response.data.message,
		});
	}
};

// ADMIN CREAR PRODUCTO
export const newProduct = (productData) => async (dispatch) => {
	try {
		dispatch({type: NEW_PRODUCT_REQUEST});

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		const {data} = await axios.post('/api/product/new', productData, config);

		dispatch({
			type: NEW_PRODUCT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: NEW_PRODUCT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// ADMIN ELIMINAR PRODUCTO
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({type: DELETE_PRODUCT_REQUEST});

    const {data} = await axios.delete(`/api/product/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

// ADMIN ACTUALIZAR PRODUCTO
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({type: UPDATE_PRODUCT_REQUEST});

    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const {data} = await axios.put(`/api/product/${id}`, productData, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
}

export const clearErrors = () => async (dispatch) => {
	dispatch({type: CLEAR_ERRORS});
};
