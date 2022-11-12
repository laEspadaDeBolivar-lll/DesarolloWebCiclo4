import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Search} from './Search';

const Header = () => {
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
				<Search />

				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center text-white ">
					<Link to="/cart" className="ml-2">
						<img
							src="../image/Logo-Icono/carro1.png"
							alt="logo"
							width={35}
							className="ml-1"
						/>
						<span className="ml-1" id="cart_items ">
							2
						</span>
					</Link>
					<Link
						to={'/login'}
						className="btn btn-danger px-4 text-white login-header-btn float-right">
						Iniciar de sesión
					</Link>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
