import React, {useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import s from './TitleMenu.module.css'
import Button from '../../components/UI/Button/Button'




	const titleArray = [
		'Ситуация',
		'Чувства',
		'Тело',
		'Мысли',
		'Знакомо ли',
		'Решение',
		'Вывод',

	]
function TitleMenu() {
		{console.log('titleArray', titleArray)}
	return (
		<div className={s.container}>
			<ul className={s.titleMenu}>
				{titleArray.map((title, i) => (
					<li 
						key={i}
						className={s.title}

					>
						<span className={s.titleLink}>{title}</span>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TitleMenu