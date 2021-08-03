import React from 'react';
import './login.css';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const AuthScreen = () => {

	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<LoginForm/>
				</div>

				<div className="col-md-6 login-form-2">
					<RegisterForm/>
				</div>
			</div>
		</div>
	);
};
