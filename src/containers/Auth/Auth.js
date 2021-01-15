import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Mail Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false
			},
		},
		isSignup: false,
		error: false
	}

	// componentDidMount() {
	// 	if (!this.props.buildingBurger && this.props.redirectPath === '/checkout') {
	// 		this.props.onSetRedirectPath()
	// 	}
	// }

	checkValidity(value, rules) {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid
		}

		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true,
			},
		};

		this.setState({
			controls: updatedControls
		})
	}

	submitHandler = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value, 
			this.state.controls.password.value,
			this.state.isSignup
			);
	}

	switchAuthModeHandler = () => {
		console.log(this.state.isSignup)
		this.setState( prevState => {
			return {
				isSignup: !prevState.isSignup
			};
		})
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			})
		}
		
		let form = formElementsArray.map((formElement, i) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				/>
				))
		
		if (this.props.loading) {
			form = <Spinner/>
		}

		let redirect = null;
		if(this.props.isAuthenticated) {
			redirect = <Redirect to={this.props.redirectPath}/>
		}

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p>
					{this.props.error.message}
				</p>
			)
		}
		// if (this.props.error != null) {
		// 	<Modal>{this.props.error}</Modal>
		// } else {
		// 	null
		// }

		return (
			<div className={classes.Auth}>
				{redirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType='Success' >SUBMIT</Button>
				</form>
				<Button btnType='Danger' clicked={this.switchAuthModeHandler}>
					SWITCH TO {
						this.state.isSignup ? ' SIGNIN' : ' SIGNUP'
					}
				</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		// buildingBurger: state.burgerReducer.building,
		redirectPath: state.auth.redirectPath
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
		// onSetRedirectPath: () => dispatch(actions.SetRedirectPath("/"))
	}
}

export default connect( mapStateToProps, mapDispatchToProps)(Auth);