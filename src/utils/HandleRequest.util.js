import { getAllProducts } from '../http/Products.http'

export const handleRequest = async (
	Page = null,
	Search = null,
	Category = null,
	Manufacturer = null,
	navigate
) => {
	console.log('changeUrl')
	const params = new URLSearchParams()
	params.append('page', Page)
	params.append('search', Search)
	params.append('category', Category)
	params.append('manufacturer', Manufacturer)
	navigate(`/?${params}`)

	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})

	return await getAllProducts(Page, Category, Search, Manufacturer, null)
}
