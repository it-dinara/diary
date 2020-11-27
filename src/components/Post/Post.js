import React from 'react';

import s from './Post.module.css';

const Post = (props) => {
    const notes = [];

    for(let postName in props.note) {
        notes.push({
            name: postName,
            content: props.note[postName]
        })
    }

    const postItem = notes.map((item, i) => (
        <div className={s.container} key={i}>
            <p className={s.name}>{item.name}</p>
            <p className={s.content}>{item.content}</p>
        </div>
    ))

    return (
        <div className={s.post} >
            <p className={s.date}>{props.fullDate}</p>
            {postItem}
        </div>
    )
};

export default Post;