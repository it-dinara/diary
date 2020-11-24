import s from './start.module.css'
import { useHistory } from "react-router-dom";


function Diary() {
	let history = useHistory();
	const redirectHandler = () => {
		history.replace('/')
	}
	return (
		<div className={s.wrapper} onClick={redirectHandler}>
			<div className={s.plus}>
				<div className={s.vertical}></div>
				<div className={s.gorizontal}></div>
			</div>
		</div>
	)
}

export default Diary