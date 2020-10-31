import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import TitleMenu from '../TitleMenu/TitleMenu'





function Diary() {
	const [value, setValue] = useState('')
	const handleChange = (event) => {
		console.log(event.target.value)
		setValue(event.target.value)
	}
	return (
		<div>
		<TitleMenu/>
		<div className={s.container}>
			<label htmlFor=""></label>
			<TextareaAutosize 
				name='textValue'
				onChange={handleChange}
				minRows={10}
				onHeightChange={() => {}}
				className={s.textarea}
				/>

		</div>
		</div>
	)
}

export default Diary