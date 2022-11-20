import React, {Fragment} from 'react';
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/userActions';
import '../../App.css';
import {Search} from './Search';

const Header = () => {
	const {cartItems} = useSelector((state) => state.cart);
	const alert = useAlert();
	const dispatch = useDispatch();

	const {user, loading} = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
		alert.success('Se ha cerrado la sesión con éxito.');
	};
	return (
		<Fragment>
			<nav className="navbar row">
				<div className="col-12 col-md-3">
					<div className="navbar-brand">
						<Link to="/">
							<img
								src="../image/Logo-Icono/LogoCigarreriandCerveceria2.png"
								alt="logo"
								width={100}
								className="ml-5"
							/>
						</Link>
					</div>
				</div>
				<div className="col-12 col-md-5 mt-2 mt-md-0">
					{/*Aqui va buscar*/}
					<Search />
				</div>

				<div className="col-12 col-md-4 mt-4 mt-md-0 text-center text-white">
					<Link to="/cart" style={{textDecoration: 'none'}}>
						<i
							class="fa fa-shopping-cart fa-2x text-white"
							aria-hidden="false"></i>
						<span id="cart" className="ml-3">
							Cart
						</span>
						<span className="ml-1" id="cart_count">
							{cartItems.length}
						</span>
					</Link>
					{user ? (
						<div className="ml-4 dropdown d-inline">
							<Link
								to="#!"
								className="btn dropdown-toggle text-white mr-4"
								type="button"
								id="dropDownMenu"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								<figure className="avatar avatar-nav">
									<img
										src={user.avatar && user.avatar.url}
										alt={user && user.name}
										className="rounded-circle"></img>
								</figure>
								<span>{user && user.name}</span>
							</Link>

							<div
								className="dropdown-menu"
								aria-labelledby="dropDownMenuButton">
								{user && user.role !== 'user' && (
									<Link className="dropdown-item" to="/admin/panel">
										Adm. Productos
									</Link>
								)}

								<Link className="dropdown-item" to="/orders/me">
									Mis Ordenes
								</Link>
								<Link className="dropdown-item" to="/profile">
									Mi Perfil
								</Link>
								<Link
									className="dropdown-item text-danger"
									to="/"
									onClick={logoutHandler}>
									Cerrar Sesion
								</Link>
							</div>
						</div>
					) : (
						!loading && (
							<Link to="/login" className="btn ml-4" id="login_btn">
								Iniciar sección
							</Link>
						)
					)}
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
