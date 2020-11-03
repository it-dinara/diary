import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import TitleMenu from '../TitleMenu/TitleMenu'
import Diary from '../../components/Diary/Diary'
import s from './DiaryBuilder.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'





function DiaryBuilder() {
	const value = useSelector(state => state.diary.value);
	const title = useSelector(state => state.fills.title);

	const dispatch = useDispatch();
	const submitHandler = () => {
		console.log('title submit', title)
		dispatch(actions.saveNote(title, value))
	}
	
	return (
		<div>
				
			<div>
				<form action="" onSubmit={() => submitHandler()}>
					<div className={s.container}>
						<TitleMenu/>
						<Diary/>
					</div>
					
				</form>
			</div>
		</div>
	)
}

export default DiaryBuilder