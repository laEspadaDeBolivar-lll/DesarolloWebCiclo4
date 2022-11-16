import axios from 'axios';
import {
	CLEAR_ERRORS,
	LOAD_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
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
    dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message});
  }
}

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
    dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message});
  }
}

//Olvide contraseña - enviar email recuperacion de contraseña
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.put(`/api/password/reset/${token}`, passwords, config);
    dispatch({type: NEW_PASSWORD_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({type: NEW_PASSWORD_FAIL, payload: error.response.data.message});
  }
}

export const clearErrors = () => async (dispatch) => {
	dispatch({type: CLEAR_ERRORS});
};