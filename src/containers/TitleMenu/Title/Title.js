import React from 'react'
import s from './Title.module.css'



function Title(props) {
	return (
				<li
				className={props.active ? [s.title, s.active].join(' ') : s.title}
				onClick={props.clicked}
				>
					<button>
						{props.name}
					</button>
				</li>

		)
	}

export default Title