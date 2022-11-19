import axios from 'axios';
import {
	ALL_USERS_FAIL,
	ALL_USERS_REQUEST,
	ALL_USERS_SUCCESS,
	CLEAR_ERRORS,
	DELETE_USER_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_SUCCESS,
	LOAD_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	NEW_PASSWORD_FAIL,
	NEW_PASSWORD_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({type: LOGIN_REQUEST});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const {data} = await axios.post('/api/login', {email, password}, config);
		dispatch({type: LOGIN_SUCCESS, payload: data.user});
	} catch (error) {
		dispatch({type: LOGIN_FAIL, payload: error.response.data.message});
	}
};

export const register = (userData) => async (dispatch) => {
	try {
		dispatch({type: REGISTER_USER_REQUEST});
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const {data} = await axios.post('/api/user/register', userData, config);
		dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
	} catch (error) {
		dispatch({type: REGISTER_USER_FAIL, payload: error.response.data.message});
	}
};
// CARGAR EL USUARIO AUTENTICADO
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({type: LOAD_USER_REQUEST});
		const {data} = await axios.get('/api/me');
		dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
	} catch (error) {
		dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});
	}
};

//ACTUALIZAR EL PERFIL DEL USUARIO
export const updateProfile = (userData) => async (dispatch) => {
	try {
		dispatch({type: UPDATE_PROFILE_REQUEST});
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const {data} = await axios.put('/api/me/updateProfile', userData, config);
		dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
	} catch (error) {
		dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response.data.message});
	}
};

// Logout User
export const logout = () => async (dispatch) => {
	try {
		await axios.get('/api/logout');
		dispatch({type: LOGOUT_SUCCESS});
	} catch (error) {
		dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
	}
};

//Actualizar contraseña
export const updatePassword = (passwords) => async (dispatch) => {
	try {
		dispatch({type: UPDATE_PASSWORD_REQUEST});
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const {data} = await axios.put('/api/me/updatePassword', passwords, config);
		dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Olvide contraseña - enviar email recuperacion de contraseña
export const forgotPassword = (email) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const {data} = await axios.post('/api/password/forgot', email, config);
		dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message});
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Olvide contraseña - enviar email recuperacion de contraseña
export const resetPassword = (token, passwords) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const {data} = await axios.put(
			`/api/password/reset/${token}`,
			passwords,
			config
		);
		dispatch({type: NEW_PASSWORD_SUCCESS, payload: data.success});
	} catch (error) {
		dispatch({type: NEW_PASSWORD_FAIL, payload: error.response.data.message});
	}
};

// ver todos los usuarios - solo admin
export const allUsers = () => async (dispatch) => {
	try {
		dispatch({type: ALL_USERS_REQUEST});
		const {data} = await axios.get('/api/admin/users');
		dispatch({type: ALL_USERS_SUCCESS, payload: data.users});
	} catch (error) {
		dispatch({type: ALL_USERS_FAIL, payload: error.response.data.message});
	}
};

// Eliminar usuario - solo admin
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({type: DELETE_USER_REQUEST});
		const {data} = await axios.delete(`/api/admin/user/${id}`);
		dispatch({type: DELETE_USER_SUCCESS, payload: data.success});
	} catch (error) {
		dispatch({type: DELETE_USER_FAIL, payload: error.response.data.message});
	}
};

// Obtener detalles del usuario - solo admin
export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({type: USER_DETAILS_REQUEST});
		const {data} = await axios.get(`/api/admin/user/${id}`);
		dispatch({type: USER_DETAILS_SUCCESS, payload: data.user});
	} catch (error) {
		dispatch({type: USER_DETAILS_FAIL, payload: error.response.data.message});
	}
};

// Actualizar usuario - solo admin
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({type: UPDATE_USER_REQUEST});
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const {data} = await axios.put(
      `/api/admin/user/${id}`,
      userData,
      config
    );
    dispatch({type: UPDATE_USER_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({type: UPDATE_USER_FAIL, payload: error.response.data.message});
  }
}

export const clearErrors = () => async (dispatch) => {
	dispatch({type: CLEAR_ERRORS});
};
