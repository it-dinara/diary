import React, {useEffect, useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './Diary.module.css'
import * as actions from '../../store/actions/index'
import {useDispatch, useSelector} from 'react-redux'


function Diary(props) {

    const title = useSelector(state => state.diary.title)
    const stateFeelings = useSelector(state => state.diary.diaryObj)
    //отрисовка текста в Textarea
    //Например: context: 'Привет'
    let textareaVal = stateFeelings[title] ? stateFeelings[title] : '';
    const [value, setValue] = useState(textareaVal)

    const dispatch = useDispatch();

    useEffect(() => {
        //создание поста
        dispatch(actions.saveNoteInState(title, value))
        console.log('saveNoteInState value', value)
    }, [title, value, dispatch])


    return (
        <div className={s.wrap}>
            <TextareaAutosize
                name='textValue'
                minRows={15}
                onHeightChange={() => {
                }}
                className={s.textarea}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                }}
            />
        </div>

    )
}

export default Diary