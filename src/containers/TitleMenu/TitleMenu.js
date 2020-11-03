import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './TitleMenu.module.css'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'



function TitleMenu() {
	const titleArray = useSelector(state => state.fills.titleArray)
	const dispatch = useDispatch();
	const setTitleHandler = (title) => {
		console.log('title', title)
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
							<button>
								<a 
			            activeClassName={s.active}
			            >
									{title.link}
								</a>
							</button>
							
						</li>
					))}
				</ul>
			</nav>
		)
	}

export default TitleMenu