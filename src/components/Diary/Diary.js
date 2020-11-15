import React, {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'

function Diary(props) {

	const title = useSelector(state => state.feelings.title)
	const stateFeelings = useSelector(state => state.feelings)
	let titleVal = ''
	if (stateFeelings[title]) {
		titleVal = stateFeelings[title]
	}
	const [value, setValue] = useState(titleVal)
	const dispatch = useDispatch();
	useEffect(() => {
	   dispatch(actions.saveNote(title, value))
	}, [value])


	return ( 
		<div className={s.wrap}>
			<h2>{title}</h2>
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
		</div>
	)
}

export default Diary