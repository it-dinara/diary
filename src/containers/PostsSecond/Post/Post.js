import {useDispatch, useSelector} from 'react-redux';
import s from './Post.module.css';
import * as actions from '../../../store/actions/index';
import {useHistory} from 'react-router-dom'


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
    const history = useHistory();
    const id = useSelector(state => state.read.id)
    const toReadHandler = (postId) => {
        dispatch(actions.setPostId(postId));
        if(postId) {
            history.replace('/read')
        }
    }

	

    const postItem = notes.map((item, i) => (
        <div className={s.container} key={i}>
            <p className={s.name}>{item.name}</p>
            <p className={s.content}>{item.content}</p>
        </div>
    ))

    return (
        <>
            <div className={s.wrapper} onClick={() => toReadHandler(props.postId)}>
                <div className={s.post} >
                    <p className={s.date}>{props.fullDate}</p>
                    {postItem}
                </div>
            </div>
        </>
    )
};

export default Post;