import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
	return (
		<Fragment>
			<nav className="navbar row">
				<div className="col-12 col-md-3">
					<div className="navbar-brand">
						<Link to="/">
							<img
								src="./image/Logo-Icono/LogoCigarreriandCerveceria2.png"
								alt="logo"
								width={120}
								className="ml-5"
							/>
						</Link>
					</div>
				</div>

				<div className="col-12 col-md-6 mt-2 mt-md-0">
					<div className="input-group">
						<input
							type="text"
							id="search_field"
							className="form-control"
							placeholder="Que desea buscar..."
						/>
						<div className="input-group-append">
							<button id="search_btn" className="btn">
								<i className="fa fa-search-plus"></i>
							</button>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-3 mt-4 mt-md-0 text-center text-white ">
					<Link to="/cart" className="ml-2">
						<img
							src="./image/Logo-Icono/carro1.png"
							alt="logo"
							width={35}
							className="ml-1"
						/>
						<span id="cart_count" className="ml-1">
							2
						</span>
					</Link>

					<button className="btn btn-danger px-4 text-white login-header-btn float-right">
						Iniciar de sesión
					</button>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
