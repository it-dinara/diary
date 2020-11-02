import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import TitleMenu from '../TitleMenu/TitleMenu'
import Diary from '../Diary/Diary'
import s from './DiaryBuilder.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'




function DiaryBuilder() {
	const title = useSelector(state => state.fills.title)
	// const [value, setValue] = useState('')

	
	return (
		<div className={s.container}>
			<TitleMenu/>
			<Diary/>
		</div>
	)
}

export default DiaryBuilder