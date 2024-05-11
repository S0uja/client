import Grid from '@mui/material/Unstable_Grid2'
import { ThemeProvider } from '@mui/material/styles'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cart from './components/Cart.component'
import CartFab from './components/CartFab.component'
import Catalog from './components/Catalog.component'
import Categories from './components/Categories.component'
import FooterComponent from './components/Footer.component'
import Header from './components/Header.component'
import { getCart } from './http/Cart.http'
import { getOneCategory } from './http/Categories.http'
import {
	getAllManufacturers,
	getOneManufacturer,
} from './http/Manufacturers.http'
import { getAllOrders } from './http/Orders.http'
import { userCheck } from './http/User.http'
import AuthModal from './modals/Auth.modal'
import CartModal from './modals/Cart.modal'
import OrderModal from './modals/Order.modal'
import ProductModal from './modals/Product.modal'
import ProfileModal from './modals/Profile.modal'
import RateProductModal from './modals/RateProduct.modal'
import SnackbarModal from './modals/Snackbar.modal'
import SupportModal from './modals/Support.modal'
import { setCart } from './store/cart.store'
import { setManufacturers } from './store/manufacturers.store'
import {
	setCategory,
	setManufacturer,
	setPage,
	setSearch,
	setSearchInput,
} from './store/products.store'
import { setAddresses, setOrders, setUserInfo } from './store/user.store'
import theme from './themes/colors.theme'
import SyncCart from './utils/SyncCart.util'

export const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const searchParams = new URLSearchParams(window.location.search)
				const params = {}
				if (searchParams.size > 0) {
					params.page = searchParams.get('page')
					params.search = searchParams.get('search')
					params.category = searchParams.get('category')
					params.manufacturer = searchParams.get('manufacturer')

					params.page = params.page === 'null' ? 1 : params.page
					params.search = params.search === 'null' ? null : params.search
					params.category = params.category === 'null' ? null : params.category
					params.manufacturer =
						params.manufacturer === 'null' ? null : params.manufacturer

					if (params.category) {
						params.category = await getOneCategory(params.category)
						params.category = params.category.data.data[0]
					}

					if (params.manufacturer) {
						params.manufacturer = await getOneManufacturer(params.manufacturer)
						params.manufacturer = params.manufacturer.data.data[0]
					}

					dispatch(setPage(parseInt(params.page)))
					dispatch(
						setCategory({
							name: params.category?.name,
							value: params.category?.id,
						})
					)
					dispatch(setSearch(params.search))
					dispatch(
						setManufacturer({
							name: params.category?.name,
							value: params.category?.id,
						})
					)
					dispatch(setSearchInput(params.search))
				}

				if (localStorage.getItem('token')) {
					const userResponse = await userCheck()
					if (userResponse?.data) {
						dispatch(setUserInfo(userResponse.data.data[0]))
					}
				}

				const manufacturersResponse = await getAllManufacturers()
				if (manufacturersResponse) {
					dispatch(setManufacturers(manufacturersResponse.data.data))
				}

				const ordersResponse = await getAllOrders()
				if (ordersResponse) {
					dispatch(setOrders(ordersResponse.data.data))
				}

				if (localStorage.getItem('addresses')) {
					dispatch(setAddresses(JSON.parse(localStorage.getItem('addresses'))))
				}

				if (localStorage.getItem('cart')) {
					const localCart = JSON.parse(localStorage.getItem('cart'))
					const syncCart = await SyncCart(localCart)
					dispatch(setCart(syncCart))
				} else if (localStorage.getItem('token')) {
					const localCart = await getCart()
					const syncCart = await SyncCart(localCart.data.data[0]?.json)
					dispatch(setCart(syncCart))
				}
			} catch (error) {
				console.error('Ошибка в запросах:', error)
			}
		}
		fetchData()
	}, [dispatch])

	return (
		<ThemeProvider theme={theme}>
			<RateProductModal />
			<ProfileModal />
			<OrderModal />
			<SnackbarModal />
			<ProductModal />
			<AuthModal />
			<CartModal />
			<CartFab />
			<SupportModal />

			<Grid
				maxWidth={'xl'}
				container={true}
				disableEqualOverflow
				sx={{
					width: '100vw',
					px: 1,
					pb: 1,
					m: 0,
					position: 'relative',
					boxSizing: 'border-box',
				}}
			>
				<Grid
					es={12}
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					sx={{
						width: '100%',
						display: {
							es: 'block',
							xs: 'block',
							sm: 'block',
							md: 'block',
							lg: 'block',
							xl: 'block',
						},
					}}
				>
					<Header />
				</Grid>

				<Grid
					es={12}
					xs={12}
					sm={12}
					md={12}
					lg={12}
					xl={12}
					sx={{
						width: '100%',
						display: {
							ex: 'block',
							xs: 'block',
							sm: 'block',
							md: 'block',
							lg: 'block',
							xl: 'block',
						},
						position: 'sticky',
						zIndex: 5,
						top: 0,
						backgroundColor: '#eeeeee',
						height: '8px',
					}}
				></Grid>

				<Grid
					es={0}
					xs={0}
					sm={0}
					md={3}
					lg={3}
					xl={2.5}
					sx={{
						pr: 2,
						width: '100%',
						display: {
							es: 'none',
							xs: 'none',
							sm: 'none',
							md: 'block',
							lg: 'block',
							xl: 'block',
						},
					}}
				>
					<Categories />
				</Grid>

				<Grid es={12} xs={12} sm={12} md={9} lg={9} xl={6.5}>
					<Catalog />
				</Grid>

				<Grid
					es={0}
					xs={0}
					sm={0}
					md={0}
					lg={0}
					xl={3}
					sx={{
						pl: 2,
						display: {
							es: 'none',
							xs: 'none',
							sm: 'none',
							md: 'none',
							lg: 'none',
							xl: 'block',
						},
					}}
				>
					<Cart />
				</Grid>

				<Grid
					es={0}
					xs={0}
					sm={0}
					md={3}
					lg={3}
					xl={2.5}
					sx={{
						pr: 2,
						width: '100%',
						display: {
							es: 'none',
							xs: 'none',
							sm: 'none',
							md: 'block',
							lg: 'block',
							xl: 'block',
						},
					}}
				></Grid>

				<Grid
					es={12}
					xs={12}
					sm={12}
					md={9}
					lg={9}
					xl={6.5}
					sx={{
						width: '100%',
						display: {
							es: 'block',
							xs: 'block',
							sm: 'block',
							md: 'block',
							lg: 'block',
							xl: 'block',
						},
					}}
				>
					<FooterComponent />
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}

export default App
