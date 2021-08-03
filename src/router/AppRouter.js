import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthScreen } from '../components/auth/AuthScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';


export const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={AuthScreen}/>
				<Route exact path="/" component={CalendarScreen}/>
				<Redirect to="/"/>
			</Switch>
		</Router>
	);
};
