import React from 'react'
import TitleMenu from '../TitleMenu/TitleMenu'
import Diary from '../../components/Diary/Diary'
import s from './DiaryBuilder.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'





function DiaryBuilder() {
	const title = useSelector(state => state.feelings.title);
	const diaryArray = useSelector(state => state.feelings.titleArray)
	const value = useSelector(state => state.feelings.value)
	const stateFeelings = useSelector(state => state.feelings)
	const dispatch = useDispatch();
	let diary = null
	// let	value = localStorage.getItem(title)
	for (let item of diaryArray) {
		if (title === item.name) {
	// console.log(title, value)
			diary = <Diary 
				key={item.name} 
				value={stateFeelings[item.name]}
				// changed={(event) => {dispatch(actions.setValue(event.target.value))}}
				/>
		} 
	}
	return (

			<form action="" 
				>
				<div className={s.container}>
					<TitleMenu/>
					{diary}
				</div>
			</form>
	)
}

export default DiaryBuilder