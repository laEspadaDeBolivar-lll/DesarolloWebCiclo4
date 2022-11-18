import {MDBDataTable} from 'mdbreact';
import React, {Fragment, useEffect} from 'react';
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
	clearErrors,
	deleteProduct,
	getAdminProducts,
} from '../../actions/productActions';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const ProductsList = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const {products, loading, error} = useSelector((state) => state.products);

	const deleteProductHandler = (id) => {
		const response = window.confirm(
			'¿Está seguro de que desea eliminar este producto?'
		);
		if (response) {
			dispatch(deleteProduct(id));
			alert.success('Producto eliminado correctamente');
			window.location.reload(false);
		}
	};

	useEffect(() => {
		dispatch(getAdminProducts());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch]);

	const setProducts = () => {
		const data = {
			columns: [
				{
					label: 'Nombre',
					field: 'nombre',
					sort: 'asc',
				},
				{
					label: 'Precio',
					field: 'precio',
					sort: 'asc',
				},
				{
					label: 'Inventario',
					field: 'inventario',
					sort: 'asc',
				},
				{
					label: 'Vendedor',
					field: 'vendedor',
					sort: 'asc',
				},
				{
					label: 'Acciones',
					field: 'acciones',
				},
			],
			rows: [],
		};
		products.forEach((product) => {
			data.rows.push({
				nombre: product.nombre,
				precio: `$${product.precio}`,
				inventario: product.stock,
				vendedor: product.vendedor,
				acciones: (
					<Fragment>
						<Link
							to={`/product/${product._id}`}
							className="btn btn-primary py-1 px-2">
							<i className="fa fa-eye"></i>
						</Link>

						<Link
							to={`/admin/updateProduct/${product._id}`}
							className="btn btn-warning py-1 px-2">
							<i class="fa fa-pencil"></i>
						</Link>

						<button
							className="btn btn-danger py-1 px-2 ml-2"
							onClick={() => deleteProductHandler(product._id)}>
							<i className="fa fa-trash"></i>
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

	return (
		<Fragment>
			<MetaData title={'Todos los productos'} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<Fragment>
						<h1 className="my-5">Todos los productos</h1>

						{loading ? (
							<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
						) : (
							<MDBDataTable
								data={setProducts()}
								className="px-3"
								bordered
								striped
								hover
							/>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductsList;
