import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { AuthScreen } from '../components/auth/AuthScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { checkingFinish, startChecking } from '../redux/actions/authActions';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const AppRouter = () => {

	const dispatch = useDispatch();
	const { checking, user } = useSelector( state => state.auth );

	useEffect( () => {
		if ( localStorage.getItem( 'token' ) ) {
			dispatch( startChecking() );
		} else {
			dispatch( checkingFinish() );
		}
	}, [dispatch] );

	if ( checking ) {
		return <h5>Cargando...</h5>;
	}

	return (
		<Router>
			<Switch>
				<PublicRoute
					exact
					path="/login"
					component={AuthScreen}
					isAuthenticated={!!user}
				/>
				<PrivateRoute
					exact
					path="/"
					component={CalendarScreen}
					isAuthenticated={!!user}
				/>
				<Redirect to="/"/>
			</Switch>
		</Router>
	);
};
