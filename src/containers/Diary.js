import s from './style.module.css'

function Diary() {
	return (
		<div className={s.wrapper}>
			<div className={s.plus}>
				<div className={s.vertical}></div>
				<div className={s.gorizontal}></div>
			</div>
		</div>
	)
}

export default Diary