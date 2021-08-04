import { fetchWithCredentials, fetchWithoutCredentials } from '../../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = ( params ) => {
	return async ( dispatch ) => {
		try {
			const resp = await fetchWithoutCredentials( 'auth/login', params, 'POST' );
			const body = await resp.json();

			if ( body.ok ) {
				const { token, user } = body;
				localStorage.setItem( 'token', token );
				localStorage.setItem( 'token-init-date', JSON.stringify( new Date().getTime() ) );
				dispatch( login( user ) );
			} else {
				Swal.fire( 'Error', body.message, 'error' );
			}

		} catch ( e ) {
			console.log( e );
		}

	};
};

export const startRegister = ( params ) => {
	return async dispatch => {
		try {
			const resp = await fetchWithoutCredentials( 'auth/register', params, 'POST' );
			const body = await resp.json();

			if ( body.ok ) {
				const { token, user } = body;
				localStorage.setItem( 'token', token );
				localStorage.setItem( 'token-init-date', JSON.stringify( new Date().getTime() ) );
				dispatch( login( user ) );
			} else {
				Swal.fire( 'Error', body.message, 'error' );
			}
		} catch ( e ) {
			console.log( e );
		}
	};
};

export const startChecking = () => {
	return async dispatch => {
		try {
			const resp = await fetchWithCredentials( 'auth/refresh-token' );
			const body = await resp.json();

			if ( body.ok ) {
				const { token, user } = body;
				localStorage.setItem( 'token', token );
				localStorage.setItem( 'token-init-date', JSON.stringify( new Date().getTime() ) );

				dispatch( login( user ) );
			} else {
				localStorage.removeItem( 'token' );
				localStorage.removeItem( 'token-init-date' );
				dispatch( checkingFinish() );
			}
		} catch ( e ) {
			console.log( e );
		}
	};
};

export const checkingFinish = () => ( {
	type: types.authCheckingFinish
} );

const login = ( user ) => ( {
	type: types.authLogin,
	payload: user
} );

export const startLogout = () => {
	return dispatch => {
		localStorage.clear();
		dispatch( logout() );
	};
};

const logout = () => ( {
	type: types.authLogout
} );
