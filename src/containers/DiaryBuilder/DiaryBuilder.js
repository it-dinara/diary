import {useState, useEffect} from 'react'
import TitleMenu from '../TitleMenu/TitleMenu'
import Diary from '../Diary/Diary'
import s from './DiaryBuilder.module.css'
import {useDispatch, useSelector} from 'react-redux'
import * as actions from '../../store/actions/index'
import axios from '../../axios-diary.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {useHistory} from "react-router-dom";
import Modal from "../../components/UI/Modal/Modal";


function DiaryBuilder() {
    const {title, titleArray, diaryObj} = useSelector(state => state.diary);
    const {token, userId} = useSelector(state => state.auth)
    const history = useHistory();
    //Переменные при редактировании поста
    const postId = useSelector(state => state.read.postId)
    const postMillsec = useSelector(state => state.read.postData.millsec)
    const postDate = useSelector(state => state.read.postData.fullDate)
    const dispatch = useDispatch();
    const [startRemoving, setStartRemoving] = useState(false)
    const redirectPath = useSelector(state => state.auth.redirectPath)

    useEffect(() => {
        dispatch(actions.setRedirectPath(null))
    }, [])

    const saveDiaryHandler = (event) => {
        event.preventDefault()
        //При редактировании, удаляется старый пост и сохраняется новый, со старой датой
        if (postId) {
            dispatch(actions.removePost(token, postId))
        }

        //Проверка на пустой пост, такой пост не сохраняется
        let note = {};
        for (let key in diaryObj) {
            if (diaryObj[key]) {
                note[key] = diaryObj[key]
                console.log('note', note)
            }
        }
        //Дата
        let date = new Date();
        console.log('date', date)
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();

        const formatDate = (num) => {
            let res;
            if (num.toString().length < 2) {
                res = '0' + num
            } else {
                res = num
            }
            return res
        }

        let fullDate = day + '.' + formatDate(month) + '.' + year + ' ' + formatDate(hour) + ':' + formatDate(minutes);
        let millsec = Date.parse(date);
        console.log('postDate', postDate)
        console.log('postMillsec', postMillsec)
        const diaryData = {
            note: note,
            userId: userId,
            fullDate: postDate ? postDate : fullDate,
            millsec: postMillsec ? postMillsec : millsec,
        }

        if (Object.keys(note).length > 0) {
            dispatch(actions.saveDiary(diaryData, token))
                //history.replace('/posts')
        }
    }

    const removeDiaryHandler = (event) => {
        event.preventDefault()

        if (postId) {
            dispatch(actions.removePost(token, postId))
        }
        history.push('/posts')
    }

    let redirect = redirectPath && history.replace(redirectPath);

    let modalAlert = (
        <Modal show={startRemoving} modalClosed={() => {setStartRemoving(false)}}>
            {console.log('removing', startRemoving)}
            <p style={{textAlign: 'center'}}>Are you sure you want to delete the post?</p>

            <div className={s.modal}>
                <button className={[s.buttonModal, s.cancel].join(' ')}
                        onClick={(event) => {
                            event.preventDefault();
                            setStartRemoving(false)}}
                >
                    cancel
                </button>
                <button className={[s.buttonModal, s.removePost].join(' ')}
                        onClick={(event) => {
                            removeDiaryHandler(event);
                            setStartRemoving(false)
                        }}
                >
                    delete
                </button>
            </div>

        </Modal>
    );

    //в результате setTitle показывается соответствующий Textarea
    let diary = null
    for (let item of titleArray) {
        if (title === item.name) {
            diary = <Diary
                key={item.name}
            />
        }
    }

    let removeButton = null;
    if(postId) {
        removeButton = (
            <button
                className={[s.button, s.removeBtn].join(' ')}
                onClick={(event) => {
                    event.preventDefault();
                    setStartRemoving(true)  }}>
                Delete
            </button>
        )
    }
    return (

        <form action="">
            <div className={s.container}>
                <div className={s.buttons}>
                    <button
                        className={[s.button, s.saveBtn].join(' ')}
                        onClick={(event) => saveDiaryHandler(event)}>
                        Save
                    </button>
                    {removeButton}

                </div>
                <TitleMenu/>
                {diary}
                {modalAlert}
                {redirect}
            </div>
        </form>
    )
}

export default withErrorHandler(DiaryBuilder, axios)