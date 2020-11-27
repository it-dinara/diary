// import { ThemeProvider } from 'emotion-theming'
// import theme from '@rebass/preset'
import './App.css'

import {
	Route,
	Switch,
	withRouter,
	Redirect
} from 'react-router-dom';
import {connect} from 'react-redux'
// import TitleMenu from './containers/TitleMenu/TitleMenu'
import DiaryBuilder from './containers/DiaryBuilder/DiaryBuilder'
import Start from './containers/Start/Start';
import Posts from './containers/Posts/Posts';
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
						<Route path="/auth" exact component={Auth} />
						<Redirect to='/auth'/>
					</Switch>
		if(this.props.isAuthenticated) {
			router = <Switch>
						<Route path="/start" component={Start} />
						<Route path="/logout"  component={Logout}/>
						<Route path="/posts"  component={Posts}/>
						<Route path="/" exact component={DiaryBuilder} />
						<Redirect to='/start'/>
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
