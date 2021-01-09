import React from 'react'
import TitleMenu from '../TitleMenu/TitleMenu'
import Diary from '../Diary/Diary'
import s from './DiaryBuilder.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {useHistory} from "react-router-dom";



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
	const stateFeelings = useSelector(state => state.feelings.diaryObj)
	const token = useSelector(state => state.auth.token)
	const userId = useSelector(state => state.auth.userId)
	const saved = useSelector(state => state.diary.saved)
	console.log('saved 1', saved)
	const history = useHistory();
	console.log('stateFeelings', stateFeelings)
	console.log('stateFeelings length', Object.keys(stateFeelings).length)
	const fullDate = useSelector(state => state.feelings.fullDate);
	const millsec =  useSelector(state => state.feelings.millsec);
	const dispatch = useDispatch();
	const saveDiaryHandler = (event) => {
		event.preventDefault()

		let note = {};
		for (let key in stateFeelings) {
			if(stateFeelings[key]) {
				note[key] = stateFeelings[key]
				console.log('note', note)
			}
		}


		const diaryData = {
			note: note,
			userId: userId,
			fullDate: fullDate,
			millsec: millsec,
		}

		if(Object.keys(note).length > 0) {
			dispatch(actions.saveDiary(diaryData, token))
		}
		console.log('saved 2', saved)
		if(saved) {
			history.replace('/start')
		}
	}
	return (

			<form action="" >
				<div className={s.container}>
					<button
						className={s.saveBtn}
						onClick={(event) => saveDiaryHandler(event)}>
						Save
					</button>
					<TitleMenu/>
					{diary}
				</div>
			</form>
	)
}

export default  withErrorHandler(DiaryBuilder, axios)