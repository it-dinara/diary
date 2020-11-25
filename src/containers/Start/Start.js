import s from './start.module.css'
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'


function Diary() {
	let history = useHistory();
	let dispatch = useDispatch();
	const redirect = useSelector(state => state.diary.redirect)
	const redirectHandler = () => {
		dispatch(actions.noteInit())
		history.replace('/')
		console.log('redirect', redirect)
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

export default Diary