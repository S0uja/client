import { getOneProduct } from '../http/Products.http'

const SyncCart = async localCart => {
	const syncCart = []

	if (!localCart?.length) return []

	if (typeof localCart === 'string') localCart = JSON.parse(localCart)

	for (const item of localCart) {
		let syncProduct = await getOneProduct(item.productId)

		if (!syncProduct || !syncProduct.data || !syncProduct.data.data.length)
			continue

		syncProduct = syncProduct.data.data[0]
		syncCart.push({
			productId: item.productId,
			count: item.count,
			price: syncProduct.price * item.count,
			product: syncProduct,
		})
	}

	return syncCart
}

export default SyncCart
