import React, {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'


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


	return (
		<div className={s.wrap}>
			<TextareaAutosize
			name='textValue'
			minRows={15}
			onHeightChange={() => {}}
			className={s.textarea}
			value={value}
			onChange={ (event) => { setValue(event.target.value) } }
			/>
		</div>

		)
}

export default Diary