import React, {Fragment, useEffect, useState} from 'react';
import {useAlert} from 'react-alert';
import {Carousel} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {addItemToCart} from '../../actions/cartActions';
import {
	clearErrors,
	getProductDetails,
	newReview,
} from '../../actions/productActions';
import {NEW_REVIEW_RESET} from '../../constants/productConstants';
import MetaData from '../layout/MetaData';
import ListReviews from '../order/ListReviews';

export const ProductDetails = () => {
	const {user} = useSelector((state) => state.auth);
	const alert = useAlert();
	const params = useParams();
	const {product, error} = useSelector((state) => state.productDetails);
	const {error: reviewError, success} = useSelector((state) => state.newReview);
	const {id} = useParams();
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [comentario, setComentario] = useState('');

	useEffect(() => {
		dispatch(getProductDetails(id));
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (reviewError) {
			alert.error(reviewError);
			dispatch(clearErrors());
		}
		if (success) {
			alert.success('Review enviada correctamente');
			dispatch({type: NEW_REVIEW_RESET});
		}
	}, [dispatch, alert, error, id, reviewError, success]);

	const increaseQty = () => {
		const contador = document.querySelector('.count');

		if (contador.valueAsNumber >= product.inventario) return;

		const qty = contador.valueAsNumber + 1;
		setQuantity(qty);
	};

	const decreaseQty = () => {
		const contador = document.querySelector('.count');

		if (contador.valueAsNumber <= 1) return;

		const qty = contador.valueAsNumber - 1;
		setQuantity(qty);
	};

	const addToCart = () => {
		dispatch(addItemToCart(id, quantity));
		alert.success('Producto agregado al carro');
	};

	function setUserRatings() {
		const stars = document.querySelectorAll('.star');

		stars.forEach((star, index) => {
			star.starValue = index + 1;

			['click', 'mouseover', 'mouseout'].forEach(function (e) {
				star.addEventListener(e, showRatings);
			});
		});

		function showRatings(e) {
			stars.forEach((star, index) => {
				if (e.type === 'click') {
					if (index < this.starValue) {
						star.classList.add('orange');

						setRating(this.starValue);
					} else {
						star.classList.remove('orange');
					}
				}

				if (e.type === 'mouseover') {
					if (index < this.starValue) {
						star.classList.add('yellow');
					} else {
						star.classList.remove('yellow');
					}
				}

				if (e.type === 'mouseout') {
					star.classList.remove('yellow');
				}
			});
		}
	}
	const reviewHandler = () => {
		const formData = new FormData();

		formData.set('rating', rating);
		formData.set('comentario', comentario);
		formData.set('idProducto', params.id);

		dispatch(newReview(formData));
	};

	return (
		<Fragment>
			<MetaData title={product.nombre}></MetaData>
			<div className="row d-flex justify-content-around">
				<div className="col-12 col-lg-5 img-fluid" id="product_image">
					<Carousel pause="hover">
						{product.imagen &&
							product.imagen.map((image) => (
								<Carousel.Item key={image.public_id}>
									<img
										className="d-block w-100"
										src={image.url}
										alt={product.title}
									/>
								</Carousel.Item>
							))}
					</Carousel>
				</div>
				<div className="col-12 col-lg-5 mt-5">
					<h3>{product.nombre}</h3>
					<p id="product_id">ID del producto {product._id}</p>
					<hr />
					<div className="rating-outer">
						<div
							className="rating-inner"
							style={{
								width: `${(product.calificacion / 5) * 100}%`,
							}}></div>
					</div>
					<span id="no_de_reviews">({product.numCalificaciones} Reviews)</span>
					<hr />
					<p id="product_price">${product.precio}</p>
					<div className="stockCounter d-inline">
						<span className="btn btn-danger minus" onClick={decreaseQty}>
							-
						</span>
						<input
							type="number"
							className="form-control count d-inline"
							value={quantity}
							readOnly
						/>
						<span className="btn btn-primary plus" onClick={increaseQty}>
							+
						</span>
					</div>
					<button
						type="button"
						id="cart_btn"
						className="btn btn-primary d-inline ml-4"
						disabled={product.stock === 0}
						onClick={addToCart}>
						Añadir al carrito
					</button>
					<hr />
					<p>
						{' '}
						Estado:{' '}
						<span
							id="stock_status"
							className={product.stock > 0 ? 'greenColor' : 'redColor'}>
							{product.stock > 0 ? 'En stock' : 'Agotado'}
						</span>
					</p>
					<hr />
					<h4 className="mt-2">Descripción:</h4>
					<p>{product.descripcion}</p>
					<hr />
					<p id="product_seller mb-3">
						Vendido por: <strong>{product.vendedor}</strong>
					</p>

					{user ? (
						<button
							id="review_btn"
							type="button"
							className="btn btn-primary mt-4"
							data-toggle="modal"
							data-target="#ratingModal"
							onClick={setUserRatings}>
							Dejar una reseña
						</button>
					) : (
						<div className="alert alert-danger mt-5" type="alert">
							Inicia Sesión para dejar tu review
						</div>
					)}
					{/* Agregar comentarios */}
					<div className="row mt-2 mb-5">
						<div className="rating w-50">
							<div
								className="modal fade"
								id="ratingModal"
								tabIndex="-1"
								role="dialog"
								aria-labelledby="ratingModalLabel"
								aria-hidden="true">
								<div className="modal-dialog" role="document">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="ratingModalLabel">
												Deja tu reseña
											</h5>
											<button
												type="button"
												className="close"
												data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>

											<div className="modal-body">
												<ul className="stars">
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
													<li className="star">
														<i className="fa fa-star"></i>
													</li>
												</ul>

												<textarea
													name="review"
													id="review"
													className="form-control mt3"
													value={comentario}
													onChange={(e) =>
														setComentario(e.target.value)
													}></textarea>

												<button
													className="btn my-3 float-right review-btn px-4 text-white"
													data-dismiss="modal"
													aria-label="Close"
													onClick={reviewHandler}>
													Enviar
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{product.opiniones && product.opiniones.length > 0 && (
				<ListReviews opiniones={product.opiniones} />
			)}
		</Fragment>
	);
};
