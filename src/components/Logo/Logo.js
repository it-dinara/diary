import React from 'react';

import burgerLogo from '../../assets/images/diary.svg';
import s from './Logo.module.css';

const logo = (props) => (
    <div className={s.Logo} style={{height: props.height}}>
        <img src={burgerLogo}  style={{height: '53px'}} alt="Diary" />
    </div>
);

export default logo;