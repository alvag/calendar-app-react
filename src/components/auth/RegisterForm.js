import React from 'react';
import { useForm } from '../../hooks/useForm';
import validator from 'validator/es';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../redux/actions/authActions';

export const RegisterForm = () => {

	const dispatch = useDispatch();

	const form = useForm( {
			name: 'Test 1',
			email: 'test1@gmail.com',
			password: '123456',
			confirmPassword: '123456'
		}, {
			name: validator.isEmpty,
			email: validator.isEmail,
			password: [
				validator.isEmpty,
				{
					validator: validator.isLength,
					params: { min: 6 }
				}
			],
			confirmPassword: [
				validator.isEmpty,
				{
					validator: validator.isLength,
					params: { min: 6 }
				}
			]
		}, handleRegister, {
			match: {
				name: 'passwordMatch',
				fields: ['password', 'confirmPassword'],
				message: 'Las contraseñas no coinciden'
			}
		}
	);

	function handleRegister() {
		dispatch( startRegister( form.values ) );
	}

	return (
		<>
			<h3>Registro</h3>
			<form onSubmit={form.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						className={`form-control ${form.errors.name ? 'is-invalid' : ''}`}
						placeholder="Nombre"
						name="name"
						value={form.values.name}
						onChange={form.handleChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
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
						type="password"
						className={`form-control ${form.errors.confirmPassword ? 'is-invalid' : ''}`}
						placeholder="Repita la contraseña"
						name="confirmPassword"
						value={form.values.confirmPassword}
						onChange={form.handleChange}
					/>
				</div>

				{
					form.errors.passwordMatch &&
					<div className="text-danger mb-2">
						{form.errors.passwordMatch}
					</div>
				}


				<div className="form-group">
					<input
						type="submit"
						className="btnSubmit"
						value="Crear cuenta"/>
				</div>
			</form>
		</>
	);
};
