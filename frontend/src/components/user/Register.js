import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {clearErrors, register} from '../../actions/userActions';
import MetaData from '../layout/MetaData';

const Register = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const {name, email, password} = user;
	const [avatar, setAvatar] = useState('');
	const [avatarPreview, setAvatarPreview] = useState(
		'https://cdn-icons-png.flaticon.com/512/1246/1246351.png?w=740&t=st=1668300276~exp=1668300876~hmac=a8c739191ece573f5b951630997eae05c048f15ea5c47367ab56a290cdfc01a6'
	);

	// const alert = useAlert();
	const dispatch = useDispatch();
	const {isAuthenticated, error} = useSelector((state) => state.auth);
	const navigate = useNavigate();

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
		const formData = new FormData();
		formData.set('name', name);
		formData.set('email', email);
		formData.set('password', password);
		formData.set('avatar', avatar);

		dispatch(register(formData));
	};

	const onChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();
			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({...user, [e.target.name]: e.target.value});
		}
	};

	return (
		<Fragment>
			<MetaData title="Registro de usuario"></MetaData>
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form
						className="shadow-lg"
						onSubmit={submitHandler}
						encType="multipart/form-data"
					>
						<h1 className="mb-3">Registrar</h1>

						<div className="form-group">
							<label htmlFor="name_field">Nombre</label>
							<input
								type="name"
								id="name_field"
								className="form-control"
								name="name"
								value={name}
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email_field">Email</label>
							<input
								type="email"
								id="email_field"
								className="form-control"
								name="email"
								value={email}
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password_field">Password</label>
							<input
								type="password"
								id="password_field"
								className="form-control"
								name="password"
								value={password}
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="avatar_upload">Avatar</label>
							<div className="d-flex align-items-center">
								<div>
									<figure className="avatar mr-3 item-rtl">
										<img
											src={avatarPreview}
											className="rounded-circle"
											alt="Vistar Previa del Avatar"
										></img>
									</figure>
								</div>
								<div className="custom-file">
									<input
										type="file"
										name="avatar"
										className="custom-file-input"
										id="customFile"
										accept="images/*"
										onChange={onChange}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										Escoger Avatar
									</label>
								</div>
							</div>
						</div>

						<button
							id="register_button"
							type="submit"
							className="btn btn-block py-3"
						>
							REGISTRAR
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
