import React from 'react'
import TitleMenu from '../TitleMenu/TitleMenu'
import Diary from '../../components/Diary/Diary'
import s from './DiaryBuilder.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'





function DiaryBuilder() {
	// const value = useSelector(state => state.diary.value);
	const title = useSelector(state => state.feelings.title);

	const dispatch = useDispatch();
	// const submitHandler = (event) => {
	// 	event.preventDefault()
	// 	console.log('title submit', title)
	// 	dispatch(actions.saveNote(title, value))
	// }
	console.log('title', title)
	// console.log('value', value)
	const diaryArray = useSelector(state => state.feelings.titleArray)
	let diary = null
	for (let item of diaryArray) {
		if (title === item.name) {
			diary = <Diary/>
		}
	}
	return (

			<form action="" 
			// onSubmit={(event) => submitHandler(event)}
				>
				<div className={s.container}>
					<TitleMenu/>
					{diary}
				</div>
			</form>
	)
}

export default DiaryBuilder