import React, {Fragment, useEffect} from 'react';
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProducts} from '../actions/productActions';
import MetaData from './layout/MetaData';

const Home = () => {
	const {products, loading, error} = useSelector((state) => state.products);
	const alert = useAlert();

	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			return alert.error(error);
		}
		dispatch(getProducts());
		alert.success('Ok');
	}, [dispatch]);
	return (
		<Fragment>
			{loading ? (
				<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
			) : (
				<Fragment>
					<MetaData title="Disfruta"></MetaData>
					<h1 className="large text-primary">Ultimos productos</h1>
					<section id="products" className="container mt-5">
						<div className="row">
							{products &&
								products.map((product) => (
									<div
										className="col-12 col-sm-6 col-md-4 col-lg-3 my-3"
										key={product._id}>
										<div className="card p-3 rounded">
											<img
												className="card-img-top mx-auto"
												src={product.imagen[0].url}
												alt={product.nombre}
											/>
											<div className="card-body d-flex flex-column">
												<h5 className="card-title">
													<Link to={`/product/${product._id}`}>
														{product.nombre}
													</Link>
												</h5>
												<div className="ratings mt-auto">
													<div className="rating-outer">
														<div
															className="rating-inner"
															style={{
																width: `${(product.calificacion / 5) * 100}%`,
															}}></div>
													</div>
													<span id="no_of_reviews">
														({product.numCalificaciones} Reviews)
													</span>
												</div>
												<div className="card-footer d-flex justify-content-between">
													<p className="card-text">${product.precio}</p>
													{/* Boton de agregar al carrito */}
													<form action="http://localhost:3000/">
														<button
															id="cart"
															type="button"
															className="btn btn-warning px-3 ml-4">
															<i className="fa fa-shopping-cart"></i>
														</button>
													</form>
												</div>
												<Link
													to={`/product/${product._id}`}
													id="view_btn"
													className="btn btn-block">
													Ver producto
												</Link>
											</div>
										</div>
									</div>
								))}
						</div>
					</section>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Home;
