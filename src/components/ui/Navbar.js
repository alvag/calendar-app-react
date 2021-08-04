import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/authActions';

export const Navbar = () => {

	const dispatch = useDispatch();
	const { user } = useSelector( state => state.auth );

	const handleLogout = () => {
		dispatch( startLogout() );
	};

	return (
		<div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
	            {user.name}
            </span>

			<button
				onClick={handleLogout}
				className="btn btn-outline-danger"
			>
				<i className="fas fa-sign-out-alt mr-2"/>
				<span>Salir</span>
			</button>
		</div>
	);
};
