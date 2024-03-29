import React, {useEffect, useState, Suspense} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";
import s from './Posts.module.css';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
const Post = React.lazy(() => import('./Post/Post'))


const Posts = () => {
    const {token, userId} = useSelector(state => state.auth)
    const {loading, fetchedPostsRes} = useSelector(state => state.diary)
    const dispatch = useDispatch();
    const [value, setValue] = useState('')

    useEffect(() => {
        dispatch(actions.saveNoteInState(null))
        dispatch(actions.setPostId(null))
    }, [dispatch])

    useEffect(() => {
        dispatch(actions.fetchPosts(token, userId))

    }, [token, userId, dispatch])

    let res = []
    for (let key in fetchedPostsRes) {
        if (fetchedPostsRes[key].millsec) {
            res.push(fetchedPostsRes[key])
        }
    }
    const [flag, setFlag] = useState(false)
    if (!flag) {
        res.sort((a, b) => b.millsec - a.millsec)
    } else {
        res.sort((a, b) => a.millsec - b.millsec)
    }

    const sortHandler = () => {
        setFlag(!flag)
    }

    let posts = <Spinner/>;
    if (!loading) {
        posts = res.map(post => {
            if (value === '' || Object.keys(post.note).concat(Object.values(post.note)).join(' ').indexOf(value) >= 0) {
                return (
                    <Suspense fallback={<div>Loading...</div>} key={post.id}>
                        <Post
                            note={post.note}
                            fullDate={post.fullDate}
                            postId={post.id}
                            millsec={post.millsec}
                        />
                    </Suspense>
                )
            } return null
        })
    }


    const history = useHistory();
    const makeNewNoteHandler = () => {
        //очистка стейта от удалёного поста
        dispatch(actions.noteInit())
        history.push('/')
    }

    const start = (
        <button
            className={s.newNote}
            onClick={(event) => {
                makeNewNoteHandler(event)
            }}
        >
            New note
        </button>
    )

    return <div className={s.container}>
        <div className={s.panel}>
            {start}
            <div className={s.search}>
                <button onClick={sortHandler}>{flag ? '↓↑' : '↑↓'}</button>
                <input
                    type='text'
                    value={value}
                    onChange={(event) => {
                        console.log('val', event.target.value)
                        setValue(event.target.value)
                    }}
                />
            </div>
        </div>

        <div className={s.list}>
            {posts}
        </div>
    </div>
}


export default withErrorHandler(Posts, axios);