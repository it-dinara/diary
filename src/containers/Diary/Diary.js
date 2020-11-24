import React, {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';



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
	const saveDiaryHandler = (event) => {
		event.preventDefault()
		let diaryData = stateFeelings
		dispatch(actions.saveDiary(diaryData, token))
	}
	const redirect = useSelector(state => state.diary.redirect)
	let diary = <Redirect to='/start'/>
	if(!redirect) {
		diary = (
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
	return diary
}

export default Diary