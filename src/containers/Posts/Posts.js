import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Posts.module.css';

import Post from './Post/Post';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const Posts = (props) => {
	const token = useSelector(state => state.auth.token) 
	const userId = useSelector(state => state.auth.userId) 
	const loading = useSelector(state => state.diary.loading) 
	const dispatch = useDispatch();
	const fetchedPosts = useSelector(state => state.diary.fetchedPostsRes) 
	useEffect(() => {
		dispatch(actions.fetchPosts(token, userId))
		dispatch(actions.noteInit())
	}, [token, userId, dispatch])
	console.log('fetchedPosts', fetchedPosts, typeof fetchedPosts)

	const [startRemoving, setStartRemoving] = useState('')
    let modalAlert = (
            <Modal show={startRemoving} modalClosed={() => {setStartRemoving(false)}}>
				{console.log('removing', startRemoving)}
                <p style={{textAlign: 'center'}}>Are you sure you want to delete the post?</p>

                <div className={s.modal}>
                    <button className={[s.buttonModal, s.cancel].join(' ')}
                        onClick={() => {setStartRemoving(false)}}
                        >
                        cancel
                    </button>
                    <button className={[s.buttonModal, s.removePost].join(' ')}
                        onClick={() => {
                        		dispatch(actions.removePost(token, startRemoving));
								setStartRemoving(false)
                        	}}
                        >
                        delete
                    </button>
                </div>

            </Modal>
        );

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
			startRemovingHandler={setStartRemoving}
			/>
		)) 
	}
	return <>
		{posts}
		{modalAlert}
	</>
}



export default withErrorHandler(Posts, axios);