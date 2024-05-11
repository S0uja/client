import { $authHost } from './index.http'

export const getCart = async () => {
	try {
		console.log('TRY GET CART')

		const { data } = await $authHost.get('api/cart/user', { timeout: 6000 })

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

export const changeCart = async json => {
	try {
		console.log('TRY CHANGE CART')
		const formdata = new FormData()
		formdata.append('json', json)

		const { data } = await $authHost.post(`api/cart/user`, formdata, {
			timeout: 6000,
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
