import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {loadUser} from './actions/userActions';
import './App.css';
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProduct';
import OrdersList from './components/admin/OrdersList';
import ProductsList from './components/admin/ProductsList';
import {UpdateProduct} from './components/admin/UpdateProduct';
import Cart from './components/cart/Cart';
import {ConfirmOrder} from './components/cart/ConfirmOrder';
import {Payment} from './components/cart/Payment';
import Shipping from './components/cart/Shipping';
import {Success} from './components/cart/Success';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import {ListOrder} from './components/order/ListOrders';
import {OrderDetails} from './components/order/OrderDetails';
import {ProductDetails} from './components/products/ProductDetails';
import {ForgotPassword} from './components/user/ForgotPassword';
import Login from './components/user/Login';
import {NewPassword} from './components/user/NewPassword';
import Profile from './components/user/Profile';
import Register from './components/user/Register';
import {UpdatePassword} from './components/user/UpdatePassword';
import {UpdateProfile} from './components/user/UpdateProfile';
import ProtectedRoute from './routes/ProtectedRoute';
import store from './store.js';
function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Routes>
						{/* Ejmeplo o guia de ruta para el componente Home */}
						<Route path="/" element={<Home />} />
						<Route path="/Home" element={<Home />} />
						{/* Guia de como poner la ruta de admin */}
						{/* <Route path="/admin/...etc" element={<admin />} /> */}
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/search/:keyword" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/profile/update" element={<UpdateProfile />} />
						<Route path="/password/update" element={<UpdatePassword />} />
						<Route path="/password/forgot" element={<ForgotPassword />} />
						<Route path="/password/reset/:token" element={<NewPassword />} />
						{/* Ruta protegida para el admin */}
						<Route path="/admin/orders" element={<OrdersList />} />
						<Route
							path="/admin/panel"
							element={
								<ProtectedRoute isAdmin={true}>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/products"
							element={
								<ProtectedRoute isAdmin={true}>
									<ProductsList />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/product"
							element={
								<ProtectedRoute isAdmin={true}>
									<NewProduct />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/orders"
							element={
								<ProtectedRoute isAdmin={true}>
									<OrdersList />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin/updateProduct/:id"
							element={
								<ProtectedRoute isAdmin={true}>
									<UpdateProduct />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/shipping"
							element={
								<ProtectedRoute>
									<Shipping />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/order/confirm"
							element={
								<ProtectedRoute>
									<ConfirmOrder />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/payment"
							element={
								<ProtectedRoute>
									<Payment />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/success"
							element={
								<ProtectedRoute>
									<Success />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/orders/me"
							element={
								<ProtectedRoute>
									<ListOrder />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/order/:id"
							element={
								<ProtectedRoute>
									<OrderDetails />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
