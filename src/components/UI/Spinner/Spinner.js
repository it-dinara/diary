import React from 'react';

import s from './Spinner.module.css';

const spinner = () => (
    <div className={s.loader}>
        <div>Loading...</div>
    </div>
);

export default spinner;