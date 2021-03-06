import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../redux/actions/uiActions';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../redux/actions/eventActions';


const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

Modal.setAppElement( '#root' );

const now = moment().minute( 0 ).seconds( 0 ).add( 1, 'hours' );
const now1 = now.clone().add( 1, 'hours' );

const initEvent = {
	title: '',
	notes: '',
	start: now.toDate(),
	end: now1.toDate()
};

export const CalendarModal = () => {

	const dispatch = useDispatch();

	const { modalOpen } = useSelector( state => state.ui );
	const { activeEvent } = useSelector( state => state.calendar );

	const [dateStart, setDateStart] = useState( now.toDate() );
	const [dateEnd, setDateEnd] = useState( now1.toDate() );

	const [titleValid, setTitleValid] = useState( true );

	const [formValues, setFormValues] = useState( initEvent );

	const { title, notes, start, end } = formValues || {};

	useEffect( () => {
		if ( activeEvent ) {
			setFormValues( activeEvent );
			setDateStart( activeEvent.start );
			setDateEnd( activeEvent.end );
		} else {
			setFormValues( initEvent );
		}
	}, [activeEvent] );

	const handleInputChange = ( { target } ) => {
		setFormValues( {
			...formValues,
			[ target.name ]: target.value
		} );
	};

	const closeModal = () => {
		dispatch( uiCloseModal() );
		setFormValues( initEvent );
		dispatch( eventClearActiveEvent() );
	};

	const handleStartDateChange = ( e ) => {
		setDateStart( e );

		setFormValues( {
			...formValues,
			start: e
		} );
	};

	const handleEndDateChange = ( e ) => {
		setDateEnd( e );

		setFormValues( {
			...formValues,
			end: e
		} );
	};

	const handleSubmit = ( e ) => {
		e.preventDefault();

		const momentStart = moment( start );
		const momentEnd = moment( end );

		if ( momentStart.isSameOrAfter( momentEnd ) ) {
			return Swal.fire( 'Error', 'La fecha de fin debe ser mayor a la fecha de inicio', 'error' );
		}

		if ( title.trim().length < 2 ) {
			return setTitleValid( false );
		} else {
			setTitleValid( true );
		}

		if ( activeEvent ) {
			dispatch( eventStartUpdate( formValues ) );
		} else {
			dispatch( eventStartAddNew( formValues ) );
		}


		closeModal();
	};

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			<h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
			<hr/>
			<form
				onSubmit={handleSubmit}
				className="container"
			>

				<div className="form-group">
					<label>Fecha y hora inicio</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={dateStart}
						className="form-control"
					/>
				</div>

				<div className="form-group">
					<label>Fecha y hora fin</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						minDate={dateStart}
						value={dateEnd}
						className="form-control"
					/>
				</div>

				<hr/>

				<div className="form-group">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${!titleValid ? 'is-invalid' : ''}`}
						placeholder="T??tulo del evento"
						name="title"
						autoComplete="off"
						value={title}
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">Una descripci??n corta</small>
				</div>

				<div className="form-group">
			        <textarea
				        className="form-control"
				        placeholder="Notas"
				        rows="5"
				        name="notes"
				        value={notes}
				        onChange={handleInputChange}
			        />
					<small id="emailHelp" className="form-text text-muted">Informaci??n adicional</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"/>
					<span> Guardar</span>
				</button>

			</form>
		</Modal>
	);
};
