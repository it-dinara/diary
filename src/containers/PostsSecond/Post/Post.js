import {useDispatch, useSelector} from 'react-redux';
import s from './Post.module.css';
import * as actions from '../../../store/actions/index';
import {useHistory} from 'react-router-dom'


const Post = (props) => {
    const template = {
        context: '',
        feelings: '',
        body: '',
        thought: '',
        isItFamiliar: '',
        decision: '',
        conclusion: '',
    };
    const notes = [];
    for(let postName in template ) {
        if (props.note[postName]) {
            notes.push({
                name: postName,
                content: props.note[postName]
            })
        }
    }

    const dispatch= useDispatch();
    const history = useHistory();
    const toReadHandler = (postNote, postDate, millsec, postId) => {
        dispatch(actions.setPostDataToRead(postNote, postDate, millsec, postId));
        history.replace('/read')
    }



    const postItem = notes.map((item, i) => (
        <div className={s.container} key={i}>
            <p className={s.name}>{item.name}</p>
            <p className={s.content}>{item.content}</p>
        </div>
    ))

    return (
        <>
            <div className={s.wrapper} onClick={() => toReadHandler(props.note, props.fullDate, props.millsec, props.postId)}>
                <div className={s.post} >
                    <p className={s.date}>{props.fullDate}</p>
                    {postItem}
                </div>
            </div>
        </>
    )
};

export default Post;