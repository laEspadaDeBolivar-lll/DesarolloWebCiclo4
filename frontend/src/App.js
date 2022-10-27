import {React} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProduct';
import OrdersList from './components/admin/OrdersList';
import ProductsList from './components/admin/ProductsList';
import Cart from './components/cart/Cart';
import Home from './components/Home';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import {ProductDetails} from './components/products/ProductDetails';
function App() {
	return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/admin/panel" element={<Dashboard />} />
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="/admin/product" element={<NewProduct />} />
						<Route path="/admin/products" element={<ProductsList />} />
						<Route path="/admin/orders" element={<OrdersList />} />
					</Routes>
				</div>
			</div>
			<Footer />
		</Router>
	);
}

export default App;
