import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'
// import Button from '../../components/UI/Button/Button'

function Diary() {

	const dispatch = useDispatch();
	const textareaChangedHandler = (event) => {
		console.log('v', event.target.value)
	}

	const title = useSelector(state => state.feelings.title)

	return (
		<div className={s.wrap}>
				<h2>{title}</h2>
					<TextareaAutosize 
					name='textValue'
					onChange={(event) => textareaChangedHandler(event)}
					minRows={15}
					onHeightChange={() => {}}
					className={s.textarea}
					/>
					{/*<Button btnType='Success' >SAVE</Button>*/}
		</div>
	)
}

export default Diary