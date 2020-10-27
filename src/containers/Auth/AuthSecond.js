import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'


const Auth = () => {

	const [controls, setControls] = useState({
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
	})

	const [isSignup, setIsSignup] = useState(false)
	const loading = useSelector(state => state.auth.loading)
	const error = useSelector(state => state.auth.error)
	const isAuthenticated = useSelector(state => state.auth.token !== null)
	const authRedirectPath = useSelector(state => state.auth.authRedirectPath)

	const dispatch = useDispatch()

	const checkValidity = (value, rules) => {
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

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...controls,
			[controlName]: {
				...controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, controls[controlName].validation),
				touched: true,
			},
		};

		setControls(updatedControls)
	}

	const submitHandler = (event) => {
		event.preventDefault();
		dispatch(actions.auth(
			controls.email.value, 
			controls.password.value,
			isSignup
		))
	}

	const switchAuthModeHandler = () => {
		console.log(isSignup)
		setIsSignup(isSignup => !isSignup)
	}

	const formElementsArray = [];
	for (let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key]
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
			changed={(event) => inputChangedHandler(event, formElement.id)}
			/>
			))
	
	if (loading) {
		form = <Spinner/>
	}

	let redirect = null;
	if(isAuthenticated) {
		redirect = <Redirect to={authRedirectPath}/>
	}

	let errorMessage = null;
	if (error) {
		errorMessage = (
			<p>
				{error.message}
			</p>
		)
	}

	return (
		<div className={classes.Auth}>
			{redirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType='Success' >SUBMIT</Button>
			</form>
			<Button btnType='Danger' clicked={switchAuthModeHandler}>
				SWITCH TO {
					isSignup ? ' SIGNIN' : ' SIGNUP'
				}
			</Button>
		</div>
	)
}

export default Auth;