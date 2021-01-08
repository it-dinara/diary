import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Posts.module.css';

import Post from './Post/Post';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const Posts = (props) => {
	const {token, userId } = useSelector(state => state.auth)
	const loading = useSelector(state => state.diary.loading)
	const dispatch = useDispatch();
	const fetchedPosts = useSelector(state => state.diary.fetchedPostsRes) 
	useEffect(() => {
		dispatch(actions.fetchPosts(token, userId))
		dispatch(actions.noteInit())
	}, [token, userId, dispatch])



	let res = []
	for(let key in fetchedPosts) {
		if(fetchedPosts[key].millsec) {
			res.push(fetchedPosts[key])
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
	return <>
		{posts}
	</>
}



export default withErrorHandler(Posts, axios);