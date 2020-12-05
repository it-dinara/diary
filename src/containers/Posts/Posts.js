import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../../components/Post/Post';
import axios from '../../axios-diary';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

const Posts = () => {
	const token = useSelector(state => state.auth.token) 
	const userId = useSelector(state => state.auth.userId) 
	const loading = useSelector(state => state.diary.loading) 
	const dispatch = useDispatch();
	const fetchedPosts = useSelector(state => state.diary.fetchedPostsRes) 
	useEffect(() => {
		dispatch(actions.fetchPosts(token, userId))
		dispatch(actions.noteInit())
	}, [])
	// console.log('fetchedPosts', fetchedPosts, typeof fetchedPosts)
	let res = []
	for(let key in fetchedPosts) {
		if(fetchedPosts[key].millsec) {
			res.push(fetchedPosts[key])
		}
	}
	// res.sort((a, b) => a.millsec - b.millsec) 
	let posts = <Spinner/>;
	if (!loading) {
		posts = fetchedPosts.map(post => (
			<Post
			key={post.id}
			note={post.note}
			fullDate={post.fullDate}
			postId={post.id}
			/>
		)) 
	}
	return posts
}



export default Posts;