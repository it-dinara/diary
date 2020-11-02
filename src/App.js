import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
import './App.css'

import {
	Route,
	Switch,
	withRouter,
	Redirect
} from 'react-router-dom';
import {connect} from 'react-redux'
import DiaryBuilder from './containers/DiaryBuilder/DiaryBuilder'
import Start from './containers/Start/Start';
import Auth from './containers/Auth/AuthSecond';
import Logout from './containers/Auth/Logout/LogoutSecond';
import * as actions from './store/actions/index'
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';


class App extends Component {
	componentDidMount() {
		this.props.authCheckState();

		const expirationDate = localStorage.getItem('expirationDate');
		console.log('expirationDate', expirationDate)
	}

	render () {

		let router = <Switch> 
						<Route path="/start" exact component={Start} />
						<Route path="/auth"  component={Auth} />
						<Route path="/"  component={DiaryBuilder} />
					</Switch>
		if(this.props.isAuthenticated) {
			router = <Switch>
						<Route path="/start" exact component={Start} />
						<Route path="/logout"  component={Logout}/>
						<Route path="/" component={DiaryBuilder} />
					</Switch>
		}

		return (
			<div>
			    <Layout>{router}</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		authCheckState: () => dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
