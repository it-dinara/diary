import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'
import Button from '../../components/UI/Button/Button'

function Diary() {

	const dispatch = useDispatch();


	const textareaChangedHandler = (event) => {
		dispatch(actions.setValue(event.target.value))
	}

	return (
		<div className={s.wrap}>
			
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