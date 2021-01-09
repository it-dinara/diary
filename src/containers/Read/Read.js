import {useSelector} from 'react-redux';
import s from './Read.module.css';


const Read = () => {

    const postNote = useSelector(state => state.read.postNote)
    const postDate = useSelector(state => state.read.postDate)
    const postMillsec = useSelector(state => state.read.postMillsec)
    const postId = useSelector(state => state.read.postId)
    const editHandler = () => {
    }

    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
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
    for (let postName in template) {
        if (postNote[postName]) {
            notes.push({
                name: postName,
                content: postNote[postName]
            })
        }
    }
    console.log('notes', notes)
    const postItem = notes.map((item, i) => (
        <div className={s.container} key={i}>
            <p className={s.name}>{item.name}</p>
            <p className={s.content}>{item.content}</p>
        </div>
    ))

    return (
        <>
            <div className={s.wrapper}>
                <div className={s.post}>
                    <button className={s.editPost}
                            onClick={() => editHandler(postId, postNote, postDate, postMillsec)}
                    >edit
                    </button>
                    <div className={s.dateWrap}>
                        <p className={[s.date, s.day].join(' ')}>{days[new Date(postMillsec).getDay()]}</p>
                        <p className={s.date}>{postDate}</p>
                    </div>
                    {postItem}
                </div>
            </div>
        </>
    )
};

export default Read;