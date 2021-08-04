import { types } from '../types/types';
import { fetchWithCredentials } from '../../helpers/fetch';
import { prepareEvents } from '../../helpers/prepareEvents';
import Swal from 'sweetalert2';

export const eventStartAddNew = ( event ) => {
	return async ( dispatch, getState ) => {
		try {
			const { user } = getState().auth;

			const resp = await fetchWithCredentials( 'events', event, 'POST' );
			const body = await resp.json();

			if ( body.ok ) {
				event.id = body.event.id;
				event.user = {
					_id: user.uid,
					name: user.name
				};
				console.log( event );
				dispatch( eventAddNew( event ) );
			}

		} catch ( e ) {
			console.log( e );
		}

	};
};

const eventAddNew = ( event ) => ( {
	type: types.eventAddNew,
	payload: event
} );

export const eventSetActive = ( event ) => ( {
	type: types.eventSetActive,
	payload: event
} );

export const eventClearActiveEvent = () => ( {
	type: types.eventClearActiveEvent
} );

export const eventClearEvents = () => ( {
	type: types.eventClearEvents
} );

export const eventStartUpdate = ( event ) => {
	return async dispatch => {
		try {
			const resp = await fetchWithCredentials( `events/${event.id}`, event, 'PUT' );
			const body = await resp.json();

			if ( resp.ok ) {
				dispatch( eventUpdated( event ) );
			} else {
				Swal.fire( 'Error', body.message, 'error' );
			}
		} catch ( e ) {
			console.log( e );
		}
	};
};

const eventUpdated = ( event ) => ( {
	type: types.eventUpdated,
	payload: event
} );

export const eventStartDelete = () => {
	return async ( dispatch, getState ) => {
		try {
			const { id } = getState().calendar.activeEvent;
			const resp = await fetchWithCredentials( `events/${id}`, {}, 'DELETE' );
			const body = await resp.json();

			if ( resp.ok ) {
				dispatch( eventDeleted() );
			} else {
				Swal.fire( 'Error', body.message, 'error' );
			}
		} catch ( e ) {
			console.log( e );
		}
	};
};

const eventDeleted = () => ( {
	type: types.eventDeleted
} );

export const eventStartLoading = () => {
	return async dispatch => {
		try {
			const resp = await fetchWithCredentials( 'events' );
			const body = await resp.json();

			if ( body.ok ) {
				const events = prepareEvents( body.events );
				dispatch( eventLoaded( events ) );
			}
		} catch ( e ) {
			console.log( e );
		}
	};
};

const eventLoaded = ( events ) => ( {
	type: types.eventLoaded,
	payload: events
} );
