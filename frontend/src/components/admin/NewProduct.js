import React, {Fragment} from 'react';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

function NewProduct() {
	return (
		<Fragment>
			<MetaData title="Nuevo producto"></MetaData>
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>

				<div className="col-12 col-md-10">
					<h1 className="my-4">Nuevo producto</h1>
					<form
						enctype="multipart/form-data"
						className="shadow-lg p-5"
						onSubmit={() => {}}>
						<div className="form-group">
							<label htmlFor="name_field">Nombre del producto</label>
							<input
								type="text"
								id="name_field"
								className="form-control"
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="price_field">Precio del producto</label>
							<input
								type="text"
								id="price_field"
								className="form-control"
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="description_field">
								Descripción del producto
							</label>
							<textarea
								className="form-control"
								id="description_field"
								rows="4"
								required></textarea>
						</div>

						<div className="form-group">
							<label htmlFor="category_field">Categoría del producto</label>
							<select className="form-control" id="category_field" required>
								<option value="Cervezas">Cervezas</option>
								<option value="Cigarrillos">Cigarrillos</option>
								<option value="Energizantes">Energizantes</option>
								<option value="Gaseosas">Gaseosas</option>
								<option value="Pasabocas">Pasabocas</option>
								<option value="Licores">Licores</option>
								<option value="Otros">Otros</option>
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="stock_field">Stock del producto</label>
							<input
								type="number"
								id="stock_field"
								className="form-control"
								required
								value={5}
								min={5}
								max={1000}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="seller_field">Vendedor del producto</label>
							<select className="form-control" id="seller_field" required>
								<option value="5fbf3b0b0b4b8c0b2c8b4b5d">John Doe</option>
							</select>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
}

export default NewProduct;
