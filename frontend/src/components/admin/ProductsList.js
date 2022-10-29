import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProducts} from '../../actions/productActions';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const ProductsList = () => {
	const {products, loading, error} = useSelector((state) => state.products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<Fragment>
			<MetaData title="Lista de Productos"></MetaData>
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>
				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">Todos los productos</h1>
						{loading ? (
							<i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
						) : (
							<Fragment>
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
															style={{
																height: '150px',
																width: '150px',
															}}
														/>
														<div className="card-body d-flex flex-column">
															<h5 className="card-title">
																<Link
																	to={`/product/${product._id}`}>
																	{product.nombre}
																</Link>
															</h5>
															<div className="ratings mt-auto">
																<div className="rating-outer">
																	<div
																		className="rating-inner"
																		style={{
																			width: `${
																				(product.calificacion /
																					5) *
																				100
																			}%`,
																		}}></div>
																</div>
																<span id="no_of_reviews">
																	({product.numCalificaciones}{' '}
																	Reviews)
																</span>
															</div>
															<p className="card-text">
																${product.precio}
															</p>
															<Link
																to={`/admin/product/${product._id}`}
																id="edit_product"
																className="btn btn-block btn-primary">
																Editar
															</Link>
															<button
																id="delete_product"
																className="btn btn-block btn-danger mt-3">
																Eliminar
															</button>
														</div>
													</div>
												</div>
											))}
									</div>
								</section>
							</Fragment>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductsList;
