import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index'


class Logout extends Component {

	componentDidMount() {
		this.props.logout()
	}

	render() {
		return (
			<Redirect to='/auth'/>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: dispatch(actions.logout())
	}
}

export default connect(null, mapDispatchToProps)(Logout);