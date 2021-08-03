import { useState } from 'react';
// https://www.npmjs.com/package/validator

export const useForm = ( initialValues = {}, validations = {}, onSubmit = () => {}, ...args ) => {
	let valid = true;
	let errors = {};

	let [values, setValues] = useState( initialValues );
	let [formErrors, setFormErrors] = useState( {} );

	const handleChange = ( { target } ) => {
		values = {
			...values,
			[ target.name ]: target.value
		};
		setValues( values );
	};

	const reset = ( newState = initialValues ) => {
		setValues( newState );
	};

	const validate = ( validator, key, value, message = '', params = {} ) => {
		const { name } = validator;
		const result = validator( value, params );

		if ( ['isEmail', 'isLength'].includes( name ) ) {
			if ( !result ) {
				valid = false;
				errors = {
					...errors,
					[ key ]: { message }
				};
			}
		} else if ( result ) {
			valid = false;
			errors = {
				...errors,
				[ key ]: { message }
			};
		}
	};

	const handleSubmit = ( e ) => {
		try {
			e.preventDefault();

			if ( validations ) {
				valid = true;
				errors = {};

				for ( const key in values ) {
					const value = values[ key ];
					const fieldValidations = validations[ key ];

					if ( fieldValidations ) {

						if ( typeof fieldValidations === 'function' ) {

							validate( fieldValidations, key, value );

						} else if ( fieldValidations instanceof Array ) {
							fieldValidations.forEach( v => {
								let params = {};
								let validator = v;
								let message = '';

								if ( typeof v === 'object' && v !== null ) {
									validator = v.validator;
									params = v.params;
									message = v.message;
								}

								validate( validator, key, value, message, params );
							} );
						}

					}
				}

				validateArgs();

				if ( !valid ) {
					setFormErrors( errors );
					return;
				}

			}

			setFormErrors( {} );

			if ( onSubmit ) {
				onSubmit();
			}

		} catch ( e ) {
			console.log( e );
		}

	};

	const validateArgs = () => {
		try {
			// valid = true;
			// errors = {};

			if ( args.length ) {
				const { match } = args[ 0 ];

				if ( match ) {
					const { fields = [], message = '', name = 'match' } = match;
					if ( fields.length > 1 ) {
						fields.forEach( ( f, i, self ) => {
							if ( self[ i + 1 ] && values[ f ] !== values[ self[ i + 1 ] ] ) {
								valid = false;
								errors = {
									...errors,
									[ name ]: message
								};
							}
						} );
					}
				}
			}
		} catch ( e ) {
			console.log( e );
		}

	};

	return {
		values,
		handleChange,
		handleSubmit,
		errors: formErrors,
		reset
	};
};
