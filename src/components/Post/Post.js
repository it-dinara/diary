import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import s from './Post.module.css';
import * as actions from '../../store/actions/index'


const Post = (props) => {
    const notes = [];
    for(let postName in props.note) {
        notes.push({
            name: postName,
            content: props.note[postName]
        })
    }
    console.log("props.postId", props.postId)
	const token = useSelector(state => state.auth.token) 
	const userId = useSelector(state => state.auth.userId)
    const dispatch= useDispatch()
    const removePostHandler = () => {
    	dispatch(actions.removePost(token, userId, props.postId))
    }

    const postItem = notes.map((item, i) => (
        <div className={s.container} key={i}>
            <p className={s.name}>{item.name}</p>
            <p className={s.content}>{item.content}</p>
        </div>
    ))

    return (
        <div className={s.wrapper}>
            <div className={s.post} >
                <p className={s.date}>{props.fullDate}</p>
                {postItem}
            </div>
            <div className={s.cover}>
                <button className={[s.button, s.removePost].join(' ')}
                	onClick={() => removePostHandler()}
                	// onClick={() => dispatch(actions.removePost(token, userId))}
                	>
                	delete
                </button>
                <button className={[s.button, s.editPost].join(' ')}>
                	edit
                </button>
            </div>
        </div>
    )
};

export default Post;