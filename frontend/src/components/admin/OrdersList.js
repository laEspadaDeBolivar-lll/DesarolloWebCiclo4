import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

function OrdersList() {
	return (
		<Fragment>
			<MetaData title="Lista de Pedidos"></MetaData>
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>
				<div className="col-12 col-md-10">
					<h1 className="my-4">Lista de Pedidos</h1>
					<Fragment>
						<div className="row d-flex justify-content-around">
							<div className="col-12 col-lg-12">
								<div className="card shadow-lg">
									<div className="card-header">
										<h3 className="mb-0">Pedidos</h3>
									</div>
									<div className="card-body">
										<div className="table-responsive">
											<table className="table table-striped">
												<thead className="thead-dark">
													<tr>
														<th scope="col">ID</th>
														<th scope="col">No. de Pedido</th>
														<th scope="col">No. de Items</th>
														<th scope="col">Monto</th>
														<th scope="col">Estado</th>
														<th scope="col"></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<th scope="row">1</th>
														<td>ASD123</td>
														<td>2</td>
														<td>$400</td>
														<td>
															<p className="mb-0 text-danger">
																No Pagado
															</p>
														</td>
														<td>
															<Link
																to="/admin/order/1"
																className="btn btn-primary py-1 px-2">
																<i className="fa fa-eye"></i>
															</Link>
														</td>
													</tr>
													<tr>
														<th scope="row">2</th>
														<td>ASD123</td>
														<td>2</td>
														<td>$400</td>
														<td>
															<p className="mb-0 text-danger">
																No Pagado
															</p>
														</td>
														<td>
															<Link
																to="/admin/order/1"
																className="btn btn-primary py-1 px-2">
																<i className="fa fa-eye"></i>
															</Link>
														</td>
													</tr>
													<tr>
														<th scope="row">3</th>
														<td>ASD123</td>
														<td>2</td>
														<td>$400</td>
														<td>
															<p className="mb-0 text-danger">
																No Pagado
															</p>
														</td>
														<td>
															<Link
																to="/admin/order/1"
																className="btn btn-primary py-1 px-2">
																<i className="fa fa-eye"></i>
															</Link>
														</td>
													</tr>
													<tr>
														<th scope="row">4</th>
														<td>ASD123</td>
														<td>2</td>
														<td>$400</td>
														<td>
															<p className="mb-0 text-danger">
																No Pagado
															</p>
														</td>
														<td>
															<Link
																to="/admin/order/1"
																className="btn btn-primary py-1 px-2">
																<i className="fa fa-eye"></i>
															</Link>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
}

export default OrdersList;