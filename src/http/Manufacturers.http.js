import { $host } from './index.http'

export const getAllManufacturers = async () => {
	try {
		console.log('TRY GET MANUFACTURERS')

		const { data } = await $host.get('api/manufacturer')

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

export const getOneManufacturer = async id => {
	try {
		console.log('TRY GET ONE MANUFACTURER')
		const { data } = await $host.get(`api/manufacturer/${id}`)

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
