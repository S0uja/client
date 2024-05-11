const GetStatusColor = statusId => {
	if (statusId === 1) {
		return 'info'
	} else if (statusId === 2) {
		return 'warning'
	} else if (statusId === 3) {
		return 'success'
	} else {
		return 'error'
	}
}

export default GetStatusColor
