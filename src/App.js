import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

import {
	Route,
	Switch,
	withRouter,
	Redirect
} from 'react-router-dom';
import {connect} from 'react-redux'
import Diary from './containers/Diary'
import Auth from './containers/Auth/Auth';
import Start from './containers/Start/Start';
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
						<Route path="/"  component={Diary} />
					</Switch>
		if(this.props.isAuthenticated) {
			router = <Switch>
						<Route path="/start" exact component={Start} />
						<Route path="/logout"  component={Logout}/>
						<Route path="/" component={Diary} />
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
