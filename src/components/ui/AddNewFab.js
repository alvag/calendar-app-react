import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/uiActions';

export const AddNewFab = () => {

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch( uiOpenModal() );
	};

	return (
		<button
			onClick={handleClick}
			className="btn btn-primary fab"
		>
			<i className="fas fa-plus"/>
		</button>
	);
};
