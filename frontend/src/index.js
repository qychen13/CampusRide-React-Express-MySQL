import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import {BrowserRouter, Route, Switch, withRouter, Redirect} from 'react-router-dom';

import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SideBar from './components/SideBar.js';
import NaviBar from './components/NaviBar.js';

import MainCard from './components/main/MainCard.js'
import ProfileCard from './components/student/ProfileCard.js'
import {AutoTimeTable, CartTimeTable} from './components/timetable/TimeTable.js'
import AppointmentCard from './components/appointments/AppointmentCard.js'
import Callback from './components/Callback.js'
import registerServiceWorker from './registerServiceWorker.js';

import Auth from './Auth/Auth';

const auth=new Auth();

ReactDOM.render(
	<div>
	<BrowserRouter>
		<div>
			<NotificationContainer/>
			<Route  path='/' render={withRouter((props)=><SideBar auth={auth} {...props}/>)}/>
			<div class="main-panel">
				<NaviBar auth={auth}/>
				<div class="content">
					<Switch>
						<Route path='/profile'  render={(props)=>auth.isAuthenticated()?<ProfileCard auth={auth} {...props}/>:<Redirect to='/'/>}/>
						<Route path='/auto' render={(props)=><AutoTimeTable auth={auth} {...props}/>}/>
						<Route path='/cart' render={(props)=><CartTimeTable auth={auth} {...props}/>}/>
						<Route path='/appointments'  render={(props)=>auth.isAuthenticated()?<AppointmentCard auth={auth} {...props}/>:<Redirect to='/'/>}/>
						<Route path='/callback' render={(props)=><Callback auth={auth} {...props}/>}/>
						<Route path='/' render={(props)=><MainCard auth={auth} {...props}/>}/>
					</Switch>
				</div>
			</div>
		</div>
	</BrowserRouter>
	</div>,
	document.getElementById('root')
	);

registerServiceWorker();
