import { fetchWithoutCredentials } from '../../helpers/fetch';
import { types } from '../types/types';

export const startLogin = ( params ) => {
	return async ( dispatch ) => {
		try {
			const resp = await fetchWithoutCredentials( 'auth/login', params, 'POST' );
			const body = await resp.json();

			console.log( body );

			if ( body.ok ) {
				const { token, user } = body;
				localStorage.setItem( 'token', token );
				localStorage.setItem( 'token-init-date', JSON.stringify( new Date().getTime() ) );
				dispatch( login( user ) );
			}

		} catch ( e ) {
			console.log( 'catch', e );
		}


	};
};

const login = ( user ) => ( {
	type: types.authLogin,
	payload: user
} );
