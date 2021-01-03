import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import s from './Post.module.css';
import * as actions from '../../../store/actions/index'


const Post = (props) => {
    const notes = [];
    for(let postName in props.note) {
        notes.push({
            name: postName,
            content: props.note[postName]
        })
    }
	const token = useSelector(state => state.auth.token);
    const dispatch= useDispatch();
    const editHandler = () => {
        
    }

	

    const postItem = notes.map((item, i) => (
        <div className={s.container} key={i}>
            <p className={s.name}>{item.name}</p>
            <p className={s.content}>{item.content}</p>
        </div>
    ))

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.post} >
                    <p className={s.date}>{props.fullDate}</p>
                    {postItem}
                </div>
                <div className={s.cover}>
                    <button 
                        className={[s.button, s.removePost].join(' ')}
                        // onClick={() => {setRemoving(true)}}
                        onClick={() => props.startRemovingHandler(props.postId)}
                        >
                        delete
                    </button>
                    <button className={[s.button, s.editPost].join(' ')}
                        onClick={() => editHandler(props.postId)}
                        >
                        edit
                    </button>
                </div>
                {/* {console.log('removing', removing)} */}
            </div>
        </>
    )
};

export default Post;