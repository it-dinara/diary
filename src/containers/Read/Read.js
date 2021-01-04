import {useSelector} from 'react-redux';





const Read = () => {

	const postId = useSelector(state => state.read.postId)
	console.log('postId', postId)

	return (
		<div>
		    {postId}
		</div>
	)
}
    
export default Read;