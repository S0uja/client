import { $host } from './index.http'

export const getAllProducts = async (
	page,
	category,
	search,
	manufacturer,
	sort
) => {
	try {
		console.log('TRY GET PRODUCTS')
		const { data } = await $host.get('api/product/page', {
			params: {
				page: page,
				category: category,
				sort: sort,
				search: search,
				manufacturer: manufacturer,
			},
		})

		return { status: data.status, data: data.body }
	} catch (err) {
		if (err.code === 'ECONNABORTED') {
			return {
				status: 'error',
				data: { message: ['Превышено время ожидания, попробуйте чуть позже'] },
			}
		}
	}
}

export const getOneProduct = async id => {
	try {
		console.log('try GET ONE PRODUCT')
		const { data } = await $host.get(`api/product/${id}`)

		return { status: data.status, data: data.body }
	} catch (err) {
		if (err.code === 'ECONNABORTED') {
			return {
				status: 'error',
				data: { message: ['Превышено время ожидания, попробуйте чуть позже'] },
			}
		}
	}
}

export const getMainPage = async () => {
	try {
		console.log('try GET MAIN PAGE')
		const { data } = await $host.get(`api/product/mp`)

		return { status: data.status, data: data.body }
	} catch (err) {
		if (err.code === 'ECONNABORTED') {
			return {
				status: 'error',
				data: { message: ['Превышено время ожидания, попробуйте чуть позже'] },
			}
		}
	}
}
