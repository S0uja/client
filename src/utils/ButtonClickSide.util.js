const determineSide = event => {
	const button = event.target.getBoundingClientRect()
	console.log(button)
	const x = event.clientX - button.left
	console.log(x)
	const isLeftSide = x < button.width / 2

	if (isLeftSide) {
		return 'left'
	} else {
		return 'right'
	}
}
export default determineSide
