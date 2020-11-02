import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './TitleMenu.module.css'
import Button from '../../components/UI/Button/Button'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'




function TitleMenu() {
	const titleArray = useSelector(state => state.fills.titleArray)

	const dispatch = useDispatch();
	const setTitleHandler = (event, title) => {
		dispatch(actions.setTitle(event.target.textContent))
}
	return (
			<ul className={s.titleMenu}>
				{titleArray.map((title, i) => (
					<li
						key={i}
						className={s.title}
						onClick={(event, title) => setTitleHandler(event, title)}
						>
						<span className={s.titleLink}>{title.name}</span>
					</li>
				))}
			</ul>
		)
	}

export default TitleMenu