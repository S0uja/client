import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../http/Products.http'
import { setProducts, setTotalPages } from '../store/products.store'
import { setSnackbarModal } from '../store/modals.store'


export const handleRequest = async (Page=null,Search=null,Category=null,navigate) => {
    console.log('changeUrl');
    const params = new URLSearchParams()
    params.append('page', Page)
    params.append('search', Search)
    params.append('category', Category)
    navigate(`/?${params}`)

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    return await getAllProducts(Page, Category, Search, null)
}