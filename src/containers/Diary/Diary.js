import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import TitleMenu from '../TitleMenu/TitleMenu'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'




function Diary() {
	const title = useSelector(state => state.fills.title)
	// const [value, setValue] = useState('')

	
	return (
		<div className={s.wrap}>
			<label htmlFor=""></label>
			<TextareaAutosize 
				name='textValue'
				onChange={() => {}}
				minRows={10}
				onHeightChange={() => {}}
				className={s.textarea}
				/>

		</div>
	)
}

export default Diary