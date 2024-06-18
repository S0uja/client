import axios from 'axios'
import FileSaver from 'file-saver'
import { $authHost } from './index.http'

// ПОЛЬЗОВАТЕЛИ

export const getUsers = async () => {
	try {
		// console.log('TRY GET USERS')

		const { data } = await $authHost.get('api/user/admin/', { timeout: 6000 })

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

export const createUser = async (number, password, fio, role, birthdate) => {
	try {
		// console.log('TRY CREATE USER')

		const formdata = new FormData()
		formdata.append('number', number)
		formdata.append('password', password)
		formdata.append('fio', fio)
		formdata.append('role', role)
		formdata.append('birthdate', birthdate)

		const { data } = await $authHost.post(`api/user/admin`, formdata, {
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

export const deleteUser = async id => {
	try {
		// console.log('TRY DELETE USER')

		const { data } = await $authHost.delete(`api/user/admin/${id}`, {
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

export const getUser = async id => {
	try {
		// console.log('TRY GET USER')

		const { data } = await $authHost.get(`api/user/admin/${id}`, {
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

export const updateUser = async (id, number, fio, role, birthdate) => {
	try {
		// console.log('TRY UPDATE USER')

		const formdata = new FormData()
		formdata.append('number', number)
		formdata.append('fio', fio)
		formdata.append('role', role)
		formdata.append('birthdate', birthdate)

		const { data } = await $authHost.put(`api/user/admin/${id}`, formdata, {
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

// ТОВАРЫ

export const getProducts = async () => {
	try {
		// console.log('TRY GET PRODUCTS')

		const { data } = await $authHost.get('api/product/', { timeout: 6000 })

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

export const deleteProduct = async id => {
	try {
		// console.log('TRY DELETE PRODUCTS')

		const { data } = await $authHost.delete(`api/product/${id}`, {
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

export const createProduct = async (
	name,
	price,
	amount,
	description,
	expirationdate,
	storageconditions,
	structure,
	weight_volume,
	categoryId,
	manufacturerId,
	images
) => {
	try {
		// console.log('TRY CREATE PRODUCT')

		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('price', price)
		formdata.append('amount', amount)
		formdata.append('description', description)
		formdata.append('expirationdate', expirationdate)
		formdata.append('storageconditions', storageconditions)
		formdata.append('structure', structure)
		formdata.append('weight_volume', weight_volume)
		formdata.append('categoryId', categoryId)
		formdata.append('manufacturerId', manufacturerId)
		images.forEach(image => {
			formdata.append(`images[]`, image)
		})
		const { data } = await $authHost.post(`api/product/`, formdata, {
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

export const getProduct = async id => {
	try {
		// console.log('TRY GET PRODUCT')

		const { data } = await $authHost.get(`api/product/${id}`, { timeout: 6000 })

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

export const updateProduct = async (
	id,
	name,
	price,
	amount,
	description,
	expirationdate,
	storageconditions,
	structure,
	weight_volume,
	categoryId,
	manufacturerId,
	images
) => {
	try {
		// console.log('TRY UPDATE PRODUCT')
		// console.log(images)
		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('price', price)
		formdata.append('amount', amount)
		formdata.append('description', description)
		formdata.append('expirationdate', expirationdate)
		formdata.append('storageconditions', storageconditions)
		formdata.append('structure', structure)
		formdata.append('weight_volume', weight_volume)
		formdata.append('categoryId', categoryId)
		formdata.append('manufacturerId', manufacturerId)
		images.forEach(image => {
			formdata.append(`images[]`, image)
		})
		const { data } = await $authHost.put(`api/product/${id}`, formdata, {
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

// ПРОИЗВОДИТЕЛИ

export const getManufacturers = async () => {
	try {
		// console.log('TRY GET MANUFACTURER')

		const { data } = await $authHost.get(`api/manufacturer/`, { timeout: 6000 })

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

export const updateManufacturer = async (
	id,
	name,
	description,
	contact,
	filename
) => {
	try {
		// console.log('TRY UPDATE MANUFACTURER')

		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('description', description)
		formdata.append('contact', contact)
		formdata.append('filename', filename)

		const { data } = await $authHost.put(`api/manufacturer/${id}`, formdata, {
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

export const deleteManufacturer = async id => {
	try {
		// console.log('TRY DELETE PRODUCT')

		const { data } = await $authHost.delete(`api/manufacturer/${id}`, {
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

export const createManufacturer = async (
	name,
	description,
	contact,
	filename
) => {
	try {
		// console.log('TRY CREATE MANUFACTURER')

		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('description', description)
		formdata.append('contact', contact)
		formdata.append('filename', filename)

		const { data } = await $authHost.post(`api/manufacturer/`, formdata, {
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

export const getManufacturer = async id => {
	try {
		// console.log('TRY GET ONE MANUFACTURER')

		const { data } = await $authHost.get(`api/manufacturer/${id}`, {
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

// КАТЕГОРИИ

export const getCategories = async () => {
	try {
		// console.log('TRY GET CATEGORIES')

		const { data } = await $authHost.get(`api/category/`, { timeout: 6000 })

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

export const updateCategory = async (id, name, parentId, filename) => {
	try {
		// console.log('TRY UPDATE CATEGORY')

		const formdata = new FormData()
		formdata.append('name', name)
		if (parentId) formdata.append('parentId', parentId)
		formdata.append('filename', filename)

		const { data } = await $authHost.put(`api/category/${id}`, formdata, {
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

export const deleteCategory = async id => {
	try {
		// console.log('TRY DELETE CATEGORY')

		const { data } = await $authHost.delete(`api/category/${id}`, {
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

export const createCategory = async (name, parentId, filename) => {
	try {
		// console.log('TRY CREATE CATEGORY')

		const formdata = new FormData()
		formdata.append('name', name)
		if (parentId) formdata.append('parentId', parentId)
		formdata.append('filename', filename)

		const { data } = await $authHost.post(`api/category/`, formdata, {
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

export const getCategory = async id => {
	try {
		// console.log('TRY GET ONE CATEGORY')

		const { data } = await $authHost.get(`api/category/${id}`, {
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

// КОЛЛЕКЦИИ

export const getCollections = async () => {
	try {
		// console.log('TRY GET COLLECTIONS')

		const { data } = await $authHost.get(`api/collection/`, { timeout: 6000 })

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

export const updateCollection = async (id, name, visible, products) => {
	try {
		// console.log('TRY UPDATE COLLECTION')

		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('visible', visible)
		products.forEach(product => {
			formdata.append('products[]', product)
		})

		const { data } = await $authHost.put(`api/collection/${id}`, formdata, {
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

export const deleteCollection = async id => {
	try {
		// console.log('TRY DELETE COLLECTION')

		const { data } = await $authHost.delete(`api/collection/${id}`, {
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

export const createCollection = async (name, visible, products) => {
	try {
		// console.log('TRY CREATE COLLECTION')

		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('visible', visible)
		products.forEach(product => {
			formdata.append('products[]', product)
		})

		const { data } = await $authHost.post(`api/collection/`, formdata, {
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

export const getCollection = async id => {
	try {
		// console.log('TRY GET ONE COLLECTION')

		const { data } = await $authHost.get(`api/collection/${id}`, {
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

// ЗАКАЗЫ

export const getOrders = async () => {
	try {
		// console.log('TRY GET ORDERS')

		const { data } = await $authHost.get(`api/order/admin`, { timeout: 6000 })

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

export const updateOrder = async (
	id,
	address,
	products,
	price,
	userId,
	orderStatusId
) => {
	try {
		// console.log('TRY UPDATE ORDER')

		const formdata = new FormData()
		formdata.append('address', address)
		formdata.append('price', price)
		formdata.append('userId', userId)
		formdata.append('orderStatusId', orderStatusId)
		products.forEach(product => {
			formdata.append(
				'products[]',
				JSON.stringify({ id: product.id, count: product.count })
			)
		})

		const { data } = await $authHost.put(`api/order/admin/${id}`, formdata, {
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

export const deleteOrder = async id => {
	try {
		// console.log('TRY DELETE ORDER')

		const { data } = await $authHost.delete(`api/order/admin/${id}`, {
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

export const createOrder = async (
	address,
	products,
	price,
	userId,
	orderStatusId
) => {
	try {
		// console.log('TRY CREATE ORDER')

		const formdata = new FormData()
		formdata.append('address', address)
		formdata.append('price', price)
		formdata.append('userId', userId)
		formdata.append('orderStatusId', orderStatusId)
		products.forEach(product => {
			formdata.append(
				'products[]',
				JSON.stringify({ id: product.id, count: product.count })
			)
		})

		const { data } = await $authHost.post(`api/order/admin/`, formdata, {
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

export const getOrder = async id => {
	try {
		// console.log('TRY GET ONE ORDER')

		const { data } = await $authHost.get(`api/order/admin/${id}`, {
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

// СТАТУСЫ ЗАКАЗОВ

export const getOrderStatuses = async () => {
	try {
		// console.log('TRY GET ORDER STATUSES')

		const { data } = await $authHost.get(`api/orderStatus/`, { timeout: 6000 })

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

export const updateOrderStatus = async (id, name) => {
	try {
		// console.log('TRY UPDATE ORDER STATUS')
		// console.log(name)
		const formdata = new FormData()
		formdata.append('name', name)

		const { data } = await $authHost.put(`api/orderStatus/${id}`, formdata, {
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

export const deleteOrderStatus = async id => {
	try {
		// console.log('TRY DELETE ORDER STATUS')

		const { data } = await $authHost.delete(`api/orderStatus/${id}`, {
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

export const createOrderStatus = async name => {
	try {
		// console.log('TRY CREATE ORDER STATUS')

		const formdata = new FormData()
		formdata.append('name', name)

		const { data } = await $authHost.post(`api/orderStatus/`, formdata, {
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

export const getOrderStatus = async id => {
	try {
		// console.log('TRY GET ONE ORDER STATUS')

		const { data } = await $authHost.get(`api/orderStatus/${id}`, {
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

// ДЭШБОРД

export const getMetrica = async () => {
	try {
		// console.log('TRY GET YAMETRICA')

		const { data } = await axios({
			url: 'https://api-metrika.yandex.net/stat/v1/data?metrics=ym:s:visits,ym:s:users,ym:s:pageviews,ym:s:avgVisitDurationSeconds&id=96799784',
			method: 'get',
			headers: {
				Authorization: 'OAuth ' + import.meta.env.VITE_YANDEXMETRICA_AUTHTOKEN,
			},
			responseType: 'json',
		})

		return { status: data.status, data: data }
	} catch (err) {
		if (err.code === 'ECONNABORTED') {
			return {
				status: 'error',
				data: { message: ['Превышено время ожидания, попробуйте чуть позже'] },
			}
		}
	}
}

export const getMounthOrdersCount = async () => {
	try {
		// console.log('TRY GET ORDERS COUNT')

		const { data } = await $authHost.get(`api/statistic/orders`, {
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

export const getMounthEarn = async () => {
	try {
		// console.log('TRY GET EARN COUNT')

		const { data } = await $authHost.get(`api/statistic/earn`, {
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

export const getLogs = async () => {
	try {
		// console.log('TRY GET LOGS')

		const { data } = await $authHost.get(`api/statistic/logs`, {
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

//  ОТЧЕТНОСТЬ

export const getProfit = async (startDate, endDate) => {
	try {
		// console.log(`TRY GET PROFIT REPORT ${startDate} ${endDate}`)

		const { data } = await $authHost.get(`api/report/profit`, {
			params: {
				startDate: startDate,
				endDate: endDate,
			},
			timeout: 6000,
		})

		const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
		FileSaver.saveAs(blob, 'orders.xls')
	} catch (err) {
		if (err.code === 'ECONNABORTED') {
			return {
				status: 'error',
				data: { message: ['Превышено время ожидания, попробуйте чуть позже'] },
			}
		}
	}
}

// БРЕНДЫ

export const getBrands = async () => {
	try {
		// console.log('TRY GET BRANDS')

		const { data } = await $authHost.get(`api/brand/`, { timeout: 6000 })

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

export const updateBrand = async (id, name, manufacturerId, filename) => {
	try {
		// console.log('TRY UPDATE BRAND')

		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('manufacturerId', manufacturerId)
		formdata.append('filename', filename)

		const { data } = await $authHost.put(`api/brand/${id}`, formdata, {
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

export const deleteBrand = async id => {
	try {
		// console.log('TRY DELETE BRAND')

		const { data } = await $authHost.delete(`api/brand/${id}`, {
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

export const createBrand = async (name, manufacturerId, filename) => {
	try {
		// console.log('TRY CREATE BRAND')

		const formdata = new FormData()
		formdata.append('name', name)
		formdata.append('manufacturerId', manufacturerId)
		formdata.append('filename', filename)

		const { data } = await $authHost.post(`api/brand/`, formdata, {
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

export const getBrand = async id => {
	try {
		// console.log('TRY GET ONE BRAND')

		const { data } = await $authHost.get(`api/brand/${id}`, {
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

// SQL

export const makeSql = async sql => {
	try {
		// console.log('TRY MAKE SQL REQUEST')

		const formdata = new FormData()
		formdata.append('sql', sql)

		const { data } = await $authHost.post(`api/sql/`, formdata, {
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
