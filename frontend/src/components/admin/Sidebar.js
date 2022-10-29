import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className="sidebar-wrapper">
			<nav id="sidebar">
				<ul className="list-unstyled components">
					<li>
						<Link to="/admin/panel">
							<i className="fa fa-tachometer"></i> Panel del control
						</Link>
					</li>

					<li>
						<a
							href="#productSubmenu"
							data-toggle="collapse"
							aria-expanded="false"
							className="dropdown-toggle">
							<i className="fa fa-product-hunt"></i> Productos
						</a>
						<ul className="collapse list-unstyled" id="productSubmenu">
							<li>
								<Link to="/admin/products">
									<i className="fa fa-clipboard"></i> Todo
								</Link>
							</li>

							<li>
								<Link to="/admin/product">
									<i className="fa fa-plus"></i> Crear
								</Link>
							</li>
						</ul>
					</li>

					<li>
						<Link to="/admin/orders">
							<i className="fa fa-shopping-basket"></i> Ordenes
						</Link>
					</li>

					<li>
						<Link to="/admin/users">
							<i className="fa fa-users"></i> Usuarios
						</Link>
					</li>

					<li>
						<Link to="/admin/reviews">
							<i className="fa fa-star"></i> Opiniones
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
