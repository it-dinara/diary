import React, {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect, useHistory} from 'react-router-dom';



function Diary(props) {

	const title = useSelector(state => state.feelings.title)
	const stateFeelings = useSelector(state => state.feelings.diaryObj)
	let titleVal = ''
	if (stateFeelings[title]) {
		titleVal = stateFeelings[title]
	}
	const [value, setValue] = useState(titleVal)
	const dispatch = useDispatch();
	useEffect(() => {
	   dispatch(actions.saveNoteInState(title, value))
	}, [value])

	const token = useSelector(state => state.auth.token)
	const history = useHistory();
	const userId = useSelector(state => state.auth.userId)

	const saveDiaryHandler = (event) => {
		event.preventDefault()

		const data = new Date();
	    const year = data.getFullYear();
	    const month = data.getMonth();
	    const day = data.getDate();
	    const hour = data.getHours();
	    const minutes = data.getMinutes();
	    
	    const formatDate = (num) => {
	        const newNum = num + 1;
	        let res = '';
	        if(newNum.toString().length < 2) {
	            res = '0' + newNum
	        } else {
	            res = newNum
	        }
	        return res
	    }
	    const fullDate = day + '.' + formatDate(month) + '.' + year + ' ' + hour + ':' + formatDate(minutes);
	    const millsec =  Date.parse(data);
		const diaryData = {
			note: stateFeelings,
			userId: userId,
			fullDate: fullDate,
			millsec: millsec,
		}
		dispatch(actions.saveDiary(diaryData, token, data))

		history.replace('/start')
	}
	const redirect = useSelector(state => state.diary.redirect)

	return (
		<div className={s.wrap}>
			<h2 className={s.name}>{title}</h2>
			{console.log('stateFeelings[title]', stateFeelings[title])}
			{console.log('STATE', stateFeelings)}
			
			<TextareaAutosize 
			name='textValue'
			onChange={ (event) => { setValue(event.target.value) } }
			minRows={15}
			onHeightChange={() => {}}
			className={s.textarea}
			value={value}
			/>
			<button className={s.saveBtn}
			onClick={(event) => saveDiaryHandler(event)}
			>SAVE</button>
		</div>

		)
}

export default Diary