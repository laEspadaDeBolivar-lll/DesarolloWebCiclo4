import React from 'react';
import { Link } from 'react-router-dom';

export const Products = ({product}) => {
	return (
		<div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3" key={product._id}>
			<div className="card p-3 rounded">
				<img
					className="card-img-top mx-auto"
					src={product.imagen[0].url}
					alt={product.nombre}
				/>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">
						<Link to={`/product/${product._id}`}>{product.nombre}</Link>
					</h5>
					<div className="ratings mt-auto">
						<div className="rating-outer">
							<div
								className="rating-inner"
								style={{
									width: `${(product.calificacion  / 5) * 100}%`,
								}}
							></div>
						</div>
						<span id="no_of_reviews">({product.numCalificaciones} Reviews)</span>
					</div>
					<div className="card-footer d-flex justify-content-between">
						<p className="card-text">${product.precio}</p>
						{/* Boton de agregar al carrito */}
						<form action="http://localhost:3000/">
							<button
								id="cart"
								type="button"
								className="btn btn-warning px-3 ml-4"
							>
								<i className="fa fa-shopping-cart"></i>
							</button>
						</form>
					</div>
					<Link
						to={`/product/${product._id}`}
						id="view_btn"
						className="btn btn-block"
					>
						Ver producto
					</Link>
				</div>
			</div>
		</div>
	);
};
