import { types } from '../types/types';

const initialState = {
	checking: true
};

export const authReducer = ( state = initialState, action ) => {
	switch ( action.type ) {
		case types.authLogin:
			return {
				...state,
				checking: false,
				user: action.payload
			};
		default:
			return state;
	}
};
