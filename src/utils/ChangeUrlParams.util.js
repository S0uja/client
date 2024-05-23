const ChangeUrlParams = (
	Page = null,
	Search = null,
	Category = null,
	Manufacturer = null
) => {
	console.log('CHANGE URL')

	const params = new URLSearchParams()
	params.append('page', Page)
	params.append('search', Search)
	params.append('category', Category)
	params.append('manufacturer', Manufacturer)

	return params
}

export default ChangeUrlParams
