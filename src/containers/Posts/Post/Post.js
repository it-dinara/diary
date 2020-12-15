import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import s from './Post.module.css';
import * as actions from '../../../store/actions/index'
import Modal from '../../../components/UI/Modal/Modal'


const Post = (props) => {
    const notes = [];
    for(let postName in props.note) {
        notes.push({
            name: postName,
            content: props.note[postName]
        })
    }
	const token = useSelector(state => state.auth.token);

	const [removing, setRemoving] = useState(false)

    const dispatch= useDispatch();

    let modalAlert = (
            <Modal show={removing} modalClosed={() => {setRemoving(false)}}>

                <p style={{textAlign: 'center'}}>Are you sure you want to delete the post?</p>

                <div className={s.modal}>
                    <button className={[s.buttonModal, s.cancel].join(' ')}
                        onClick={() => {setRemoving(false)}}
                        >
                        cancel
                    </button>
                    <button className={[s.buttonModal, s.removePost].join(' ')}
                        onClick={() => dispatch(actions.removePost(token, props.postId))}
                        >
                        delete
                    </button>
                </div>

            </Modal>
        );

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
                    <button className={[s.button, s.removePost].join(' ')}
                        onClick={() => {setRemoving(true)}}
                        >
                        delete
                    </button>
                    <button className={[s.button, s.editPost].join(' ')}>
                        edit
                    </button>
                </div>
                {console.log('removing', removing)}
            </div>
            {modalAlert}
        </>
    )
};

export default Post;