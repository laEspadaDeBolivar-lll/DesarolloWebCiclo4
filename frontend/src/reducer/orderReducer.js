import {
	CLEAR_ERRORS,
	CREATE_ORDER_FAIL,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
} from '../constants/orderConstants';

export const newOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_ORDER_REQUEST:
			return {
				...state,
				loading: true,
			};
		case CREATE_ORDER_SUCCESS:
			return {
				loading: false,
				success: action.payload.success,
				order: action.payload.order,
			};
		case CREATE_ORDER_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
