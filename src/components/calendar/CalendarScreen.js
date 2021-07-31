import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale( 'es' );

const localizer = momentLocalizer( moment );

const events = [
	{
		title: 'Evento 1',
		start: moment().toDate(),
		end: moment().add( 2, 'hours' ).toDate(),
		bgColor: '#FAFAFA',
		notes: 'Notas del evento',
		user: {
			_id: 123,
			name: 'Max'
		}
	}
];

export const CalendarScreen = () => {

	const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

	const onDoubleClick = ( e ) => {
		console.log( e );
	};

	const onSelectEvent = ( e ) => {
		console.log( e );
	};

	const onViewChange = ( e ) => {
		localStorage.setItem( 'lastView', e );
		setLastView( e );
	};

	const eventStyleGetter = ( event, start, end, isSelected ) => {
		const style = {
			backgroundColor: '#367CF7',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: '#FFFFFF'
		};

		return {
			style
		};
	};

	return (
		<div className="calendar-screen">
			<Navbar/>

			<Calendar
				view={lastView}
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages}
				eventPropGetter={eventStyleGetter}
				components={{ event: CalendarEvent }}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange}
			/>

			<CalendarModal/>
		</div>
	);
};
