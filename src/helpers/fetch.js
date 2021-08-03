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

export {
	fetchWithoutCredentials
};