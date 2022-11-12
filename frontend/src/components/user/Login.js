import React, {Fragment} from 'react';
import MetaData from '../layout/MetaData';

const Login = () => {
	return (
		<Fragment>
			<MetaData title="Inicio de sesión"></MetaData>
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg">
						<h1 className="mb-3">Iniciar de sesión</h1>
						<div className="form-group">
							<label htmlFor="email_field">Correo electrónico</label>
							<input
								type="email"
								id="email_field"
								className="form-control"
								placeholder="Ingrese su correo electrónico"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password_field">Contraseña</label>
							<input
								type="password"
								id="password_field"
								className="form-control"
								placeholder="Ingrese su contraseña"
							/>
						</div>

						<a href="#" className="float-right mb-4">
							¿Olvidó su contraseña?
						</a>

						<button
							id="login_button"
							type="submit"
							className="btn btn-block py-3"
						>
							INICIAR DE SESIÓN
						</button>

						<a href="#" className="float-right mt-3">
							¿No tiene una cuenta?
						</a>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;
