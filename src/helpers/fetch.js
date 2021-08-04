const baseUrl = process.env.REACT_APP_API_URL;

const fetchWithoutCredentials = ( endpoint, data, method = 'GET' ) => {
	const url = `${baseUrl}/${endpoint}`;

	if ( method.toUpperCase() === 'GET' ) {
		return fetch( url );
	} else {
		return fetch( url, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( data )
		} );
	}
};

const fetchWithCredentials = ( endpoint, data, method = 'GET' ) => {
	const url = `${baseUrl}/${endpoint}`;
	const token = localStorage.getItem( 'token' ) || '';

	if ( method.toUpperCase() === 'GET' ) {
		return fetch( url, {
			method,
			headers: {
				'x-token': token
			}
		} );
	} else {
		return fetch( url, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'x-token': token
			},
			body: JSON.stringify( data )
		} );
	}
};

export {
	fetchWithoutCredentials,
	fetchWithCredentials
};
