import React, {useState, useEffect} from 'react'
import s from './TitleMenu.module.css'
import Title from './Title/Title'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'



const TitleMenu = React.memo(props => {
	const titleArray = useSelector(state => state.feelings.titleArray)
	const [active, setActive] = useState(false)
	const dispatch = useDispatch();

	const setTitleHandler = (event, title, id) => {
		event.preventDefault()
		setActive(active => { return {[id]: !active[id]} })
		// console.log('id', id)
		return dispatch(actions.setTitle(title))
	}
	// console.log('active', active)

	


	return (
			<ul className={s.titleMenu}>
				{titleArray.map((title, i) => (
					<Title
					key={title.id}
					name={title.name}
					clicked={(event) => setTitleHandler(event, title.name, title.id)}
					active={active[title.id]}
					/>
				))}
			</ul>
		)
	}
)	

export default TitleMenu