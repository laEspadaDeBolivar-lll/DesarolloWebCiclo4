import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {saveShippingInfo} from '../../actions/cartActions';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckOutSteps';

export const Shipping = () => {
	let Pais = require('./colombia.json');
	const navigate = useNavigate();
	const {shippingInfo} = useSelector((state) => state.cart);

	const [direccion, setDireccion] = useState(shippingInfo.direccion);
	const [ciudad, setCiudad] = useState(shippingInfo.ciudad);
	const [telefono, setTelefono] = useState(shippingInfo.telefono);
	const [departamento, setDepartamento] = useState(shippingInfo.departamento);
	const [ciudades, setCiudades] = useState([]);

	useEffect(() => {
		Pais.forEach((depar) => {
			if (depar.departamento === departamento) {
				setCiudades(depar.ciudades);
			}
		});
	});
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingInfo({direccion, ciudad, telefono, departamento}));
		navigate('/order/confirm');
	};

	return (
		<Fragment>
			<MetaData title={'Información de envio'} />
			<CheckoutSteps shipping />
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg" onSubmit={submitHandler}>
						<h1 className="mb-4">Información de envio</h1>
						<div className="form-group">
							<label htmlFor="direccion_field">Dirección</label>
							<input
								type="text"
								id="direccion_field"
								className="form-control"
								value={direccion}
								onChange={(e) => setDireccion(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="ciudad_field">Ciudad</label>
							<select
								id="ciudad_field"
								className="form-control"
								value={ciudad}
								onChange={(e) => setCiudad(e.target.value)}>
								{ciudades.map((ciudad) => (
									<option key={ciudad} value={ciudad}>
										{ciudad}
									</option>
								))}
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="departamento_field">Departamento</label>
							<select
								id="departamento_field"
								className="form-control"
								value={departamento}
								onChange={(e) => setDepartamento(e.target.value)}>
								{Pais.map((depar) => (
									<option key={depar.departamento} value={depar.departamento}>
										{depar.departamento}
									</option>
								))}
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="telefono_field">Teléfono</label>
							<input
								type="text"
								id="telefono_field"
								className="form-control"
								value={telefono}
								onChange={(e) => setTelefono(e.target.value)}
							/>
						</div>

						<button
							id="shipping_btn"
							type="submit"
							className="btn btn-block py-3">
							CONTINUAR
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Shipping;
