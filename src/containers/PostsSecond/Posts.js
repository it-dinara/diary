import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import s from './Posts.module.css';

import Post from './Post/Post';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const Posts = () => {
	const {token, userId } = useSelector(state => state.auth)
	const {loading, fetchedPostsRes} = useSelector(state => state.diary)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.saveNoteInState(null))
	}, [dispatch])

	useEffect(() => {
		dispatch(actions.setRedirectPath(null))
		dispatch(actions.fetchPosts(token, userId))
		// dispatch(actions.setTitle(null))

	}, [token, userId, dispatch])

	let res = []
	for(let key in fetchedPostsRes) {
		if(fetchedPostsRes[key].millsec) {
			res.push(fetchedPostsRes[key])
		}
	}
	res.sort((a, b) => b.millsec - a.millsec) 
	let posts = <Spinner/>;
	if (!loading) {
		posts = res.map(post => (
			<Post
			key={post.id}
			note={post.note}
			fullDate={post.fullDate}
			postId={post.id}
			millsec={post.millsec}
			/>
		)) 
	}
	const history = useHistory();
	const makeNewNoteHandler = () => {
		//очистка стейта от удалёного поста
		dispatch(actions.noteInit())
		history.replace('/')
	}

	const start = (
		<button
			className={s.newNote}
			onClick={(event) => {makeNewNoteHandler(event)}}
		>
			New note
		</button>
	)

	return <div className={s.container}>
		{start}
		{posts}
	</div>
}



export default withErrorHandler(Posts, axios);