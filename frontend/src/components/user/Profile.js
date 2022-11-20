import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Profile = () => {
	const {user, loading} = useSelector((state) => state.auth);

	return (
		<Fragment>
			{loading ? (
				<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
			) : (
				<Fragment>
					<MetaData title={'Mi perfil'} />

					<h2 className="mt-5 ml-5">Mi Perfil</h2>
					<div className="row justify-content-around mt-5 user-info">
						<div className="col-12 col-md-3">
							<figure className="avatar avatar-profile">
								<img
									className="rounded-circle img-fluid"
									src={user.avatar.url}
									alt={user.name}
								/>
							</figure>
							<Link
								to="/profile/update"
								id="edit_profile"
								className="btn btn-primary btn-block my-5"
							>
								Editar Perfil
							</Link>
						</div>

						<div className="col-12 col-md-5">
							<h4>Nombre Completo</h4>
							<p>{user.name}</p>

							<h4>Email</h4>
							<p>{user.email}</p>

							<h4>Registrado el: </h4>
							<p>{String(user.createdAt).substring(0, 10)}</p>

							{user.role !== 'admin' && (
								<Link to="/orders/me" className="btn btn-danger btn-block mt-5">
									Mis Pedidos
								</Link>
							)}

							<Link
								to="/password/update"
								className="btn btn-primary btn-block mt-3"
							>
								Cambiar contraseña
							</Link>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
