import React from 'react'
import TitleMenu from '../TitleMenu/TitleMenu'
import Diary from '../Diary/Diary'
import s from './DiaryBuilder.module.css'
import {useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



function DiaryBuilder() {
	const title = useSelector(state => state.feelings.title);
	const diaryArray = useSelector(state => state.feelings.titleArray)
	const value = useSelector(state => state.feelings.value)
	// const stateFeelings = useSelector(state => state.feelings)
	let diary = null
	for (let item of diaryArray) {
		if (title === item.name) {
			diary = <Diary 
				key={item.name} 
				// value={stateFeelings[item.name]}
				/>
		} 
	}
	return (

			<form action="" >
				<div className={s.container}>
					<TitleMenu/>
					{diary}
				</div>
			</form>
	)
}

export default  withErrorHandler(DiaryBuilder, axios)