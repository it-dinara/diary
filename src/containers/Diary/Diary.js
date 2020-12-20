import React, {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory} from 'react-router-dom';
import { getDate } from '../../helpers/getDate.js'

function Diary(props) {

	const title = useSelector(state => state.feelings.title)
	const stateFeelings = useSelector(state => state.feelings.diaryObj)
	let diaryVal = '';
	if (stateFeelings[title]) {
		diaryVal = stateFeelings[title]
	}
	const [value, setValue] = useState(diaryVal)

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.saveNoteInState(title, value))
	}, [value])

	const token = useSelector(state => state.auth.token)
	const userId = useSelector(state => state.auth.userId)
	const saved = useSelector(state => state.diary.saved)
	console.log('saved 1', saved)
	const history = useHistory();
console.log('stateFeelings', stateFeelings)
console.log('stateFeelings length', Object.keys(stateFeelings).length)

    const saveDiaryHandler = (event) => {
		event.preventDefault()

		let note = {};
		for (let key in stateFeelings) {
			if(stateFeelings[key]) {
				note[key] = stateFeelings[key]
				console.log('note', note)
			}
		}

		const fullDate = getDate.fullDate;
		const millsec =  getDate.millsec;
		const diaryData = {
			note: note,
			userId: userId,
			fullDate: fullDate,
			millsec: millsec,
		}

		if(Object.keys(note).length > 0) {
			dispatch(actions.saveDiary(diaryData, token))
		}
		console.log('saved 2', saved)
		if(saved) {
			history.replace('/start')
		}
	}

	return (
		<div className={s.wrap}>
			{/*<h2 className={s.name}>{title}</h2>*/}
			{/* {console.log('stateFeelings[title]', stateFeelings[title])} */}
			{/* {console.log('STATE', stateFeelings)} */}
			<TextareaAutosize 
			name='textValue'
			onChange={ (event) => { setValue(event.target.value) } }
			minRows={15}
			onHeightChange={() => {}}
			className={s.textarea}
			value={value}
			/>
			<button 
			className={s.saveBtn}
			onClick={(event) => saveDiaryHandler(event)}>
			SAVE
			</button>
		</div>

		)
}

export default Diary