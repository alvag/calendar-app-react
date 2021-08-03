import React from 'react';
import { useForm } from '../../hooks/useForm';
import validator from 'validator/es';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../redux/actions/authActions';

export const LoginForm = () => {

	const dispatch = useDispatch();

	const form = useForm( {
		email: '',
		password: ''
	}, {
		email: validator.isEmail,
		password: validator.isEmpty
	}, handleLogin );

	function handleLogin() {
		dispatch( startLogin( form.values ) );
	}

	return (
		<>
			<h3>Ingreso</h3>
			<form onSubmit={form.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						className={`form-control ${form.errors.email ? 'is-invalid' : ''}`}
						placeholder="Correo"
						name="email"
						value={form.values.email}
						onChange={form.handleChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className={`form-control ${form.errors.password ? 'is-invalid' : ''}`}
						placeholder="Contraseña"
						name="password"
						value={form.values.password}
						onChange={form.handleChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="submit"
						className="btnSubmit"
						value="Login"
					/>
				</div>
			</form>
		</>
	);
};
