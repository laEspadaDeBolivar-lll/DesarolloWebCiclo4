import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {cartReducer} from './reducer/cartReducer';
import {
	allOrdersReducer,
	myOrdersReducer,
	newOrderReducer,
	orderDetailsReducer,
	orderReducer,
} from './reducer/orderReducer';
import {
	newProductReducer,
	newReviewReducer,
	prodReducer,
	productDetailsReducer,
	productsReducer,
} from './reducer/productReducer';
import {
	allUsersReducer,
	authReducer,
	forgotPasswordReducer,
	userDetailsReducer,
	userReducer,
} from './reducer/userReducer';

// createStore es para crear el store
// combineReducers es para combinar los reducers en uno solo y poder usarlo en el store
// composeWithDevTools es para usar la extension de redux en el navegador
// applyMiddleware es para usar middlewares que se usan en redux

const reducer = combineReducers({
	// Aqui van los reducers que se van a usar en el store
	products: productsReducer,
	productDetails: productDetailsReducer,
	auth: authReducer,
	user: userReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer,
	newProduct: newProductReducer,
	product: prodReducer,
	newOrder: newOrderReducer,
	myOrders: myOrdersReducer,
	orderDetails: orderDetailsReducer,
	allOrders: allOrdersReducer,
	order: orderReducer,
	allUsers: allUsersReducer,
	userDetails: userDetailsReducer,
	newReview: newReviewReducer,
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
		shippingInfo: localStorage.getItem('shippingInfo')
			? JSON.parse(localStorage.getItem('shippingInfo'))
			: {},
	},
}; // Aqui se puede poner el estado inicial del store

const middleware = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
