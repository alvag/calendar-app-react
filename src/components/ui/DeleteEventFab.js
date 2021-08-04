import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../redux/actions/eventActions';

export const DeleteEventFab = () => {

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch( eventStartDelete() );
	};

	return (
		<button
			onClick={handleClick}
			className="btn btn-danger fab-danger"
		>
			<i className="fas fa-trash mr-2"/>
			<span>Borrar evento</span>
		</button>
	);
};
