import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom';
import * as actions from '../../../store/actions/index'

const Logout = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(actions.logout())
	}, [dispatch])

	return (
		<Redirect to='/auth'/>
	)
}


export default Logout;