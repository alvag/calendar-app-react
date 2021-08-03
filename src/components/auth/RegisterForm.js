import React from 'react';
import { useForm } from '../../hooks/useForm';
import validator from 'validator/es';

export const RegisterForm = () => {

	const form = useForm( {
			name: 'Max',
			email: 'aaa@aaa.com',
			password: '123456',
			confirmPassword: '1234561'
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
		console.log( 'handleRegister', form.values );
	}

	return (
		<>
			<h3>Registro</h3>
			<form onSubmit={form.handleSubmit}>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Nombre"
						name="name"
						value={form.values.name}
						onChange={form.handleChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						placeholder="Correo"
						name="email"
						value={form.values.email}
						onChange={form.handleChange}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="Contraseña"
						name="password"
						value={form.values.password}
						onChange={form.handleChange}
					/>
				</div>

				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="Repita la contraseña"
						name="confirmPassword"
						value={form.values.confirmPassword}
						onChange={form.handleChange}
					/>
				</div>

				<div className="text-danger mb-2">
					Error
				</div>

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
