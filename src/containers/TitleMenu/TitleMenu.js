import React, {useState, useEffect} from 'react'
import s from './TitleMenu.module.css'
import Title from './Title/Title'
import {useSelector, useDispatch} from 'react-redux'
import * as actions from '../../store/actions/index'



const TitleMenu = React.memo(props => {
	const titleArray = useSelector(state => state.diary.titleArray);
	const postNote = useSelector(state => state.read.postData.note)
	const postId = useSelector(state => state.read.postId)
	const template = useSelector(state => state.diary.template);
	const [active, setActive] = useState(false)
	const dispatch = useDispatch();

	const setTitleHandler = (event, title, id) => {
		event.preventDefault()
		setActive(active => { return {[title]: !active[title]} })
		return dispatch(actions.setTitle(title))
	}

	useEffect(() => {
		if(!postId) {
			dispatch(actions.setTitle(titleArray[0].name))
			setActive({[titleArray[0].name]: true})
		} else {
			for(let title of template) {
				if(Object.keys(postNote).includes(title)) {
					// console.log('template title', title)
					dispatch(actions.setTitle(title))
					setActive({[title]: true})
					break
				}
			}

		}
	}, [postId,titleArray,template,postNote,dispatch])

	return (
			<ul className={s.titleMenu}>
				{titleArray.map((title, i) => (
					<Title
					key={title.id}
					name={title.name}
					clicked={(event) => setTitleHandler(event, title.name, title.id)}
					active={active[title.name]}
					/>
				))}
			</ul>
		)
	}
)	

export default TitleMenu