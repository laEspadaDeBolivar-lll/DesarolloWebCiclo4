import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import MetaData from '../layout/MetaData';

function Cart() {
	return (
		<Fragment>
			<MetaData title="Carrito de Compras"></MetaData>
			<div className="row">
				<div className="col-12 col-lg-8">
					<div className="cart-item">
						<div className="row">
							<div className="col-4 col-lg-3">
								<img
									src="/image/Cervezas/BBC_Sixpack.jpg"
									alt="Laptop"
									height="90"
									width="115"
								/>
							</div>
							<div className="col-5 col-lg-3">
								<Link to="#">BBC Sixpack x 12</Link>
							</div>

							<div className="col-4 col-lg-2 mt-4 mt-lg-0">
								<p>$8950</p>
							</div>

							<div className="col-4 col-lg-3 mt-4 mt-lg-0">
								<div className="stockCounter d-inline">
									<span className="btn btn-danger minus">-</span>

									<input
										type="number"
										className="form-control count d-inline"
										value="1"
										readOnly
									/>

									<span className="btn btn-primary plus">+</span>
								</div>
							</div>

							<div className="col-4 col-lg-1 mt-4 mt-lg-0">
								<i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
							</div>
						</div>
					</div>
					<div className="cart-item">
						<div className="row">
							<div className="col-4 col-lg-3">
								<img
									src="/image/Cigarrillos/Chesfieldblue.jpg"
									alt="Laptop"
									height="90"
									width="115"
								/>
							</div>
							<div className="col-5 col-lg-3">
								<Link to="#">Cigarrillos Blue</Link>
							</div>

							<div className="col-4 col-lg-2 mt-4 mt-lg-0">
								<p>$1800</p>
							</div>

							<div className="col-4 col-lg-3 mt-4 mt-lg-0">
								<div className="stockCounter d-inline">
									<span className="btn btn-danger minus">-</span>

									<input
										type="number"
										className="form-control count d-inline"
										value="1"
										readOnly
									/>

									<span className="btn btn-primary plus">+</span>
								</div>
							</div>

							<div className="col-4 col-lg-1 mt-4 mt-lg-0">
								<i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 col-lg-3 my-4">
					<div id="order_summary">
						<h4>Resumen del pedido</h4>
						<hr />
						<p>
							Subtotal: <span className="order-summary-values">$10750</span>
						</p>
						<p>
							Envío: <span className="order-summary-values">$8000</span>
						</p>
						<hr />
						<p>
							Total: <span className="order-summary-values">$18.750</span>
						</p>
						<hr />
						<button id="checkout_btn" className="btn btn-primary btn-block">
							Realizar Pedido
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Cart;
