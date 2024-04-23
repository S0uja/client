import { getOneProduct } from '../http/Products.http'

const SyncCart = async (localCart) => {
    const syncCart = []
    if(!localCart) return []

    for(const item of localCart){
      let syncProduct = await getOneProduct(item.productId)
      syncProduct = syncProduct.data.data[0]
      syncCart.push({productId:item.productId,count:item.count,price:syncProduct.price*item.count,product:syncProduct})
    }

    return syncCart
}

export default SyncCart