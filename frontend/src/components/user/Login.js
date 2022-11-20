import React, {Fragment, useEffect, useState} from 'react';
import { useAlert } from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {clearErrors, login} from '../../actions/userActions';
import MetaData from '../layout/MetaData';

const Login = () => {
  const alert = useAlert();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const {isAuthenticated, error} = useSelector((state) => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
		if (error) {
			dispatch(clearErrors());
		}
	}, [dispatch, isAuthenticated, error]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login(email, password));
    alert.success('Se ha iniciado sesión con éxito.');
	};

	return (
		<Fragment>
			<MetaData title="Inicio de sesión"></MetaData>
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg" onSubmit={submitHandler}>
						<h1 className="mb-3">Iniciar de sesión</h1>
						<div className="form-group">
							<label htmlFor="email_field">Correo electrónico</label>
							<input
								type="email"
								id="email_field"
								className="form-control"
								placeholder="Ingrese su correo electrónico"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password_field">Contraseña</label>
							<input
								type="password"
								id="password_field"
								className="form-control"
								placeholder="Ingrese su contraseña"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<Link to="/password/forgot" className="float-right mb-4">
							¿Olvidó su contraseña?
						</Link>

						<button
							id="login_button"
							type="submit"
							className="btn btn-block py-3"
						>
							INICIAR DE SESIÓN
						</button>

						<Link to="/register" className="float-right mt-3">
							¿No tiene una cuenta?
						</Link>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;
