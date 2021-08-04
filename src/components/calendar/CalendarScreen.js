import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/uiActions';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../redux/actions/eventActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale( 'es' );

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

	const dispatch = useDispatch();
	const { user } = useSelector( state => state.auth );

	useEffect( () => {
		dispatch( eventStartLoading() );
	}, [dispatch] );

	const { events, activeEvent } = useSelector( state => state.calendar );

	const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

	const onDoubleClick = () => {
		dispatch( uiOpenModal() );
	};

	const onSelectEvent = ( e ) => {
		dispatch( eventSetActive( e ) );
	};

	const onViewChange = ( e ) => {
		localStorage.setItem( 'lastView', e );
		setLastView( e );
	};

	const onSelectSlot = () => {
		dispatch( eventClearActiveEvent() );
	};

	const eventStyleGetter = ( event, start, end, isSelected ) => {
		const backgroundColor = user.uid === event.user._id ? '#367CF7' : '#465660';
		
		const style = {
			backgroundColor,
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
				onSelectSlot={onSelectSlot}
				selectable={true}
			/>

			{
				activeEvent &&
				<DeleteEventFab/>
			}
			<AddNewFab/>

			<CalendarModal/>
		</div>
	);
};
