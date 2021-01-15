import s from './start.module.css'
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


function Start() {
	let history = useHistory();
	let dispatch = useDispatch();
	const redirect = useSelector(state => state.diary.redirect)
	const redirectHandler = () => {
		dispatch(actions.setRedirectPath(null))
		dispatch(actions.noteInit())
		history.replace('/')
	}
	return (
		<div className={s.wrapper} onClick={redirectHandler}>
			<div className={s.plus}>
				<div className={s.vertical}></div>
				<div className={s.gorizontal}></div>
			</div>
		</div>
	)
}

export default withErrorHandler(Start, axios)