import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './TitleMenu.module.css'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'
import Button from '../../components/UI/Button/Button'




function TitleMenu() {
	const titleArray = useSelector(state => state.fills.titleArray)
	const dispatch = useDispatch();
	const setTitleHandler = (title) => {
		return dispatch(actions.setTitle(title))
	}

	return (
			<nav>
				<ul className={s.titleMenu}>
					{titleArray.map((title, i) => (
						<li
							key={i}
							className={s.title}
							onClick={() => setTitleHandler(title.link)}
							>
							<a 
		            activeClassName={s.active}
		            >
								{title.link}
							</a>
							
						</li>
					))}
				</ul>
			</nav>
		)
	}

export default TitleMenu